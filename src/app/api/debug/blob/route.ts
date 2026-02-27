import { NextResponse } from "next/server";
import { get } from "@vercel/blob";

const BLOB_PATH = "fairplay/shipments.json";

export async function GET() {
  const tokenSet = !!process.env.BLOB_READ_WRITE_TOKEN;
  if (!tokenSet) {
    return NextResponse.json({
      ok: false,
      error: "BLOB_READ_WRITE_TOKEN not set in Vercel env vars",
      tokenSet: false,
    });
  }

  try {
    const result = await get(BLOB_PATH, { access: "private" });
    if (!result || result.statusCode !== 200 || !result.stream) {
      return NextResponse.json({
        ok: true,
        tokenSet: true,
        existingCount: 0,
        message: "Blob empty or not found (normal for first use)",
      });
    }
    const data = await new Response(result.stream).json();
    const count = Array.isArray(data) ? data.length : 0;
    return NextResponse.json({
      ok: true,
      tokenSet: true,
      existingCount: count,
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      tokenSet: true,
      error: err instanceof Error ? err.message : String(err),
      name: err instanceof Error ? err.name : undefined,
    });
  }
}
