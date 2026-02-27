import { NextRequest, NextResponse } from "next/server";
import { getShipmentByTrackingId } from "@/lib/store";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ trackingId: string }> }
) {
  const { trackingId } = await params;
  const shipment = await getShipmentByTrackingId(trackingId);

  if (!shipment) {
    return NextResponse.json(
      { error: "Shipment not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(shipment);
}
