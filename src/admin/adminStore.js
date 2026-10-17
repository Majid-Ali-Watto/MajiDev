import { collection, doc, getDoc, getDocs, setDoc, writeBatch } from "firebase/firestore/lite";
import { db } from "../config/firebaseApp";
import { SECTION_DOC } from "../hooks/useContent";
import { STATS_SOURCES, forSite, siteContent, statsFor } from "../data/siteContent";

// Sections /admin edits. `stats` is derived from them (statsFor) and written alongside them, never edited.
const STATS = "stats";
const SECTIONS = Object.keys(siteContent).filter((key) => key !== STATS);
const sectionDoc = (key) => doc(db, key, SECTION_DOC);

// The stats document for these section documents ({ [key]: { value, builtIn } }), from what the site shows of them
const statsData = (docs) => ({ value: statsFor(Object.fromEntries(STATS_SOURCES.map((key) => [key, forSite(key, docs[key])]))) });
// Field order of a document read back from Firestore can differ, so compare the figures themselves
const statsKey = (stats) => stats && JSON.stringify([stats.projects, stats.packages, stats.experience.map((job) => [job.startDate, job.endDate])]);

// Stored document for a section: lists carry their "Show default data" switch
const sectionData = (key, value, useBuiltIn) => (Array.isArray(siteContent[key]) ? { value, builtIn: !!useBuiltIn } : { value });

// Built-in content as stored: single-record sections leave out empty fields, so those keep "Use default"
function builtInData(key) {
  const value = siteContent[key];
  return Array.isArray(value) ? sectionData(key, value, false) : { value: Object.fromEntries(Object.entries(value).filter(([, v]) => v !== "")) };
}

// Makes sure every section has its own document, in one atomic batch (either all of it is written or none of it):
// - Before per-section collections, sections were fields of content/site (or content/{key} docs) and the profile was uploads/*,
//   alongside fields the site never used (resumeLink, timestamp). Those sections are copied over and the old documents deleted.
// - Any section still without a document gets its built-in content, so everything the site shows lives in Firestore.
// - The stats document is (re)written if it is missing or does not match the sections, e.g. on the first load after it was added.
async function fillSections(sections, storedStats) {
  const [content, uploads] = await Promise.all([getDocs(collection(db, "content")), getDocs(collection(db, "uploads"))]);

  const legacy = {};
  for (const snap of content.docs) {
    if (snap.id !== "site") {
      if (SECTIONS.includes(snap.id)) legacy[snap.id] = snap.data();
      continue;
    }
    const site = snap.data();
    for (const key of SECTIONS) if (site[key] !== undefined) legacy[key] ??= sectionData(key, site[key], site.builtIn?.[key]);
  }
  // The profile kept empty strings for fields left at their default; the new document omits them
  const profile = uploads.docs[0]?.data() ?? {};
  const about = Object.fromEntries(Object.keys(siteContent.about).filter((name) => profile[name]).map((name) => [name, profile[name]]));
  if (Object.keys(about).length) legacy.about = { value: about };

  const batch = writeBatch(db);
  let writes = 0;
  for (const key of SECTIONS) {
    if (sections[key]) continue;
    sections[key] = legacy[key] ?? builtInData(key);
    batch.set(sectionDoc(key), sections[key]);
    writes++;
  }
  const stats = statsData(sections);
  if (statsKey(stats.value) !== statsKey(storedStats?.value)) {
    batch.set(sectionDoc(STATS), stats);
    writes++;
  }
  [...content.docs, ...uploads.docs].forEach((snap) => batch.delete(snap.ref));
  if (writes || !content.empty || !uploads.empty) await batch.commit();
}

// `stored` keeps the shape the editor expects: { [key]: value, builtIn: { [key]: true } }.
export async function loadAdminData() {
  const snaps = await Promise.all([...SECTIONS, STATS].map((key) => getDoc(sectionDoc(key))));
  const { [STATS]: storedStats, ...sections } = Object.fromEntries(snaps.filter((snap) => snap.exists()).map((snap) => [snap.ref.parent.id, snap.data()]));
  await fillSections(sections, storedStats);

  const stored = { builtIn: {} };
  for (const [key, { value, builtIn }] of Object.entries(sections)) {
    stored[key] = value;
    if (builtIn) stored.builtIn[key] = true;
  }
  return { stored };
}

// Single-record sections store only the fields that are not "Use default"; a missing field falls back to the built-in value.
// `useBuiltIn` is a list section's "Show default data" switch.
// Saving a section the stats come from rewrites the stats document in the same atomic batch, so the two never disagree.
// `stored` = every section as loadAdminData returned it (kept current by the caller), before this save.
export function saveSection(key, value, useBuiltIn, stored) {
  const data = sectionData(key, value, useBuiltIn);
  if (!STATS_SOURCES.includes(key)) return setDoc(sectionDoc(key), data);

  const docs = Object.fromEntries(STATS_SOURCES.map((source) => [source, sectionData(source, stored[source], stored.builtIn[source])]));
  const batch = writeBatch(db);
  batch.set(sectionDoc(key), data);
  batch.set(sectionDoc(STATS), statsData({ ...docs, [key]: data }));
  return batch.commit();
}
