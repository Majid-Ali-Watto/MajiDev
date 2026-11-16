const MAX_DATA_URL_LENGTH = 700_000; // keeps the Firestore document well under its 1 MiB limit

async function loadImage(file) {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");
  const url = URL.createObjectURL(file);
  try {
    return await new Promise((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Couldn't read that image."));
      el.src = url;
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

// Browsers that can't encode `mime` silently return PNG, which is far larger for photos.
const encode = (canvas, mime, quality) => {
  const dataUrl = canvas.toDataURL(mime, quality);
  return dataUrl.startsWith(`data:${mime}`) ? dataUrl : canvas.toDataURL("image/jpeg", quality);
};

// Center-crops to a square, scales down to `size` px and returns a data URL.
export async function resizeImage(file, { size, mime, quality = 0.85 }) {
  const img = await loadImage(file);
  const w = img.naturalWidth || size;
  const h = img.naturalHeight || size;
  const side = Math.min(w, h);
  const out = file.type === "image/svg+xml" ? size : Math.min(size, side); // never upscale a raster

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = out;
  canvas.getContext("2d").drawImage(img, (w - side) / 2, (h - side) / 2, side, side, 0, 0, out, out);

  const dataUrl = encode(canvas, mime, quality);
  if (dataUrl.length > MAX_DATA_URL_LENGTH) throw new Error("That image is too large even after resizing. Try a smaller one.");
  return dataUrl;
}

// Scales down to at most `maxWidth` px wide, keeping the shape (a card crops it to fit), and returns a data URL of at most
// `maxLength` characters: the quality drops step by step until it fits.
export async function scaleImage(file, { maxWidth, mime, maxLength }) {
  const img = await loadImage(file);
  const w = img.naturalWidth || maxWidth;
  const h = img.naturalHeight || Math.round(maxWidth * 0.625); // an SVG without a size
  const width = Math.min(maxWidth, w); // never upscale a raster
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = Math.max(1, Math.round((h * width) / w));
  canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);

  for (const quality of [0.85, 0.7, 0.55, 0.4]) {
    const dataUrl = encode(canvas, mime, quality);
    if (dataUrl.length <= maxLength) return dataUrl;
  }
  throw new Error("That image is too large even after resizing. Try a smaller one.");
}
