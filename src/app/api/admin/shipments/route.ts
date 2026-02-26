import { NextResponse } from "next/server";
import { getAllShipments } from "@/lib/store";

export async function GET() {
  const shipments = getAllShipments();
  return NextResponse.json(shipments);
}
