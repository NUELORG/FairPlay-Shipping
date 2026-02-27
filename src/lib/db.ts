// Vercel Blob - add from Vercel dashboard, no external signup
// Project → Storage → Create Blob Store → token auto-added
import { put, list } from "@vercel/blob";

const BLOB_PATH = "fairplay/shipments.json";

async function getBlobUrl(): Promise<string | null> {
  try {
    const { blobs } = await list({ prefix: "fairplay/" });
    const match = blobs.find((b) => b.pathname?.endsWith("shipments.json"));
    return match?.url ?? null;
  } catch {
    return null;
  }
}

export async function dbGetAll(): Promise<unknown[]> {
  try {
    const url = await getBlobUrl();
    if (!url) return [];
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function dbSaveAll(shipments: unknown[]): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(shipments, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

export function isDbConfigured() {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}
