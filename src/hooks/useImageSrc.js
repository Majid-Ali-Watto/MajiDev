import { useEffect, useState } from "react";
import { firebaseConfig } from "../config/firebaseConfig";
import { DOCUMENTS } from "./useContent";
import { uploadedImageId } from "../utils/uploadedImage";

// A card's image as an address an <img> can load. A path or URL is returned as written. An image uploaded in /admin
// ("upload:{id}", see utils/uploadedImage) is fetched from its images/{id} document, a data URL, and handed out as a blob URL,
// which is also what "open in a new tab" needs (browsers refuse to open data URLs). An uploaded image never changes
// (a replacement gets a new id), so it is fetched once per page load.
const loaded = new Map(); // id → Promise<blob URL, or "" if it couldn't be loaded>

function loadUploaded(id) {
  if (!loaded.has(id)) {
    loaded.set(
      id,
      fetch(`${DOCUMENTS}/images/${id}?key=${firebaseConfig.apiKey}&mask.fieldPaths=data`)
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`${res.status} ${res.statusText}`))))
        .then((doc) => {
          const [head, base64] = doc.fields.data.stringValue.split(",");
          const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
          return URL.createObjectURL(new Blob([bytes], { type: head.slice(5, head.indexOf(";")) }));
        })
        .catch(() => {
          loaded.delete(id); // a later render may try again
          return "";
        }),
    );
  }
  return loaded.get(id);
}

// Resolves to `undefined` while an uploaded image is loading, "" if it couldn't be loaded (or there is none), else its address
export default function useImageSrc(src) {
  const id = uploadedImageId(src);
  const [result, setResult] = useState({ src, address: undefined });

  useEffect(() => {
    if (!id) return undefined;
    let current = true;
    loadUploaded(id).then((address) => current && setResult({ src, address }));
    return () => {
      current = false;
    };
  }, [id, src]);

  if (!id) return src;
  return result.src === src ? result.address : undefined; // a result for an earlier src is stale
}
