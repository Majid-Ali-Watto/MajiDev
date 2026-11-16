// An image uploaded in /admin lives in its own Firestore document, images/{id}, and a content field refers to it as
// "upload:{id}" (the `imgURL` of a card). Anything else in such a field is a /public path or a URL, shown as written.
const PREFIX = "upload:";
const ID = /^[\w-]{1,64}$/; // the id goes into a document path, so only plain characters pass

export const uploadedImageRef = (id) => PREFIX + id;

// The document id behind an "upload:{id}" reference, or null for any other value
export const uploadedImageId = (src) => {
  if (typeof src !== "string" || !src.startsWith(PREFIX)) return null;
  const id = src.slice(PREFIX.length);
  return ID.test(id) ? id : null;
};
