import { useSyncExternalStore } from "react";
import { firebaseConfig } from "../config/firebaseConfig";
import { forSite } from "../data/siteContent";

// Each section is its own collection holding one document, {key}/content = { value, builtIn }, edited from /admin.
// The site fetches a section the first time something renders it (or App prefetches it for the page being opened).
export const SECTION_DOC = "content";

const DOCUMENTS = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;

// Firestore REST tags every value with its type: { stringValue: "…" }, { mapValue: { fields } }, { arrayValue: { values } }, …
function decode(value) {
  if ("mapValue" in value) return decodeFields(value.mapValue.fields);
  if ("arrayValue" in value) return (value.arrayValue.values ?? []).map(decode);
  if ("integerValue" in value) return Number(value.integerValue);
  if ("nullValue" in value) return null;
  return Object.values(value)[0]; // stringValue, booleanValue, doubleValue, timestampValue
}
const decodeFields = (fields = {}) => Object.fromEntries(Object.entries(fields).map(([name, value]) => [name, decode(value)]));

// A plain GET with no custom headers is a CORS "simple" request: one round trip. The Firestore SDKs add headers that make the
// browser send a preflight first, doubling the wait, and add 100+ kB to the bundle. Resolves to undefined if there's no document.
async function fetchSection(key) {
  const res = await fetch(`${DOCUMENTS}/${key}/${SECTION_DOC}?key=${firebaseConfig.apiKey}`);
  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return decodeFields((await res.json()).fields);
}

const CACHE_PREFIX = "content-cache:";
try {
  localStorage.removeItem("site-content-cache"); // single-document cache from before per-section collections
} catch {
  /* storage unavailable */
}

// Last fetched document of each section, wrapped as { stored } so "fetched, no document" differs from "never fetched".
// Repeat visits render it immediately (no skeleton) and refresh it in the background.
function readCache(key) {
  try {
    return JSON.parse(localStorage.getItem(CACHE_PREFIX + key)) ?? undefined;
  } catch {
    return undefined;
  }
}

function writeCache(key, stored) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ stored }));
  } catch {
    // Storage full or unavailable: drop the entry rather than keep an outdated one
    try {
      localStorage.removeItem(CACHE_PREFIX + key);
    } catch {
      /* storage unavailable */
    }
  }
}

// Not fetched yet and nothing cached: useContent suspends, so the section's skeleton shows
const PENDING = Symbol("pending");
const content = {};
const loads = {};
const listeners = {};
const subscribers = {};

function snapshot(key) {
  if (!(key in content)) {
    const cached = readCache(key);
    content[key] = cached ? forSite(key, cached.stored) : PENDING;
  }
  return content[key];
}

// One request per section, shared by every reader. If it fails, whatever is showing stays (the built-in content if nothing was).
function load(key) {
  return (loads[key] ??= fetchSection(key)
    .then((stored) => {
      writeCache(key, stored);
      return forSite(key, stored);
    })
    .catch((err) => {
      console.error(`Content fetch failed (${key}):`, err);
      const current = snapshot(key);
      return current === PENDING ? forSite(key) : current;
    })
    .then((value) => {
      content[key] = value;
      listeners[key]?.forEach((notify) => notify());
    }));
}

function subscriberFor(key) {
  return (subscribers[key] ??= (notify) => {
    (listeners[key] ??= new Set()).add(notify);
    load(key);
    return () => listeners[key].delete(notify);
  });
}

// Suspends until the section is available, so render it inside a <Suspense> with a matching skeleton.
export default function useContent(key) {
  const value = useSyncExternalStore(subscriberFor(key), () => snapshot(key));
  if (value === PENDING) throw load(key);
  return value;
}

// Starts fetching these sections (all at once) and resolves to their values, in order, once every one is available.
export function loadContent(keys) {
  return Promise.all(keys.map((key) => load(key).then(() => content[key])));
}
