// Vercel Blob - add from Vercel dashboard, no external signup
// Project → Storage → Create Blob Store → token auto-added
import { put, get } from "@vercel/blob";

const BLOB_PATH = "fairplay/shipments.json";

export async function dbGetAll(): Promise<unknown[]> {
  try {
    const result = await get(BLOB_PATH, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) return [];
    const data = await new Response(result.stream).json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function dbSaveAll(shipments: unknown[]): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(shipments, null, 2), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

export function isDbConfigured() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}
