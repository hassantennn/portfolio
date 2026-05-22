import { removeBackground } from '@imgly/background-removal';

/**
 * Optional browser-side background removal helper for future logo uploads.
 * Add `@imgly/background-removal` to package.json, then call this with a File or Blob.
 */
export async function removeLogoBackground(input: File | Blob): Promise<string> {
  const outputBlob = await removeBackground(input);
  return URL.createObjectURL(outputBlob);
}
