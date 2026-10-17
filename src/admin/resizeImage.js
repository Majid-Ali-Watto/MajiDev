const MAX_DATA_URL_LENGTH = 700_000; // keeps the Firestore document well under its 1 MiB limit

// Center-crops to a square, scales down to `size` px and returns a data URL.
export async function resizeImage(file, { size, mime, quality = 0.85 }) {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");

  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Couldn't read that image."));
      el.src = url;
    });
    const w = img.naturalWidth || size;
    const h = img.naturalHeight || size;
    const side = Math.min(w, h);
    const out = file.type === "image/svg+xml" ? size : Math.min(size, side); // never upscale a raster

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = out;
    canvas.getContext("2d").drawImage(img, (w - side) / 2, (h - side) / 2, side, side, 0, 0, out, out);

    let dataUrl = canvas.toDataURL(mime, quality);
    // Browsers that can't encode `mime` silently return PNG, which is far larger for photos.
    if (!dataUrl.startsWith(`data:${mime}`)) dataUrl = canvas.toDataURL("image/jpeg", quality);
    if (dataUrl.length > MAX_DATA_URL_LENGTH) throw new Error("That image is too large even after resizing. Try a smaller one.");
    return dataUrl;
  } finally {
    URL.revokeObjectURL(url);
  }
}
