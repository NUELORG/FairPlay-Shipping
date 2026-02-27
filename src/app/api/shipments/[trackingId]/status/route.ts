import { NextRequest, NextResponse } from "next/server";
import { updateShipmentStatus } from "@/lib/store";
import type { ShipmentStatus } from "@/types/shipment";

const VALID_STATUSES: ShipmentStatus[] = [
  "pending",
  "picked_up",
  "on_hold",
  "custom_hold",
  "in_transit",
  "out_for_delivery",
  "delivered",
];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ trackingId: string }> }
) {
  const { trackingId } = await params;
  const body = await request.json();
  const { status } = body;

  if (!status || !VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { error: "Invalid status" },
      { status: 400 }
    );
  }

  const shipment = await updateShipmentStatus(trackingId, status);

  if (!shipment) {
    return NextResponse.json(
      { error: "Shipment not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(shipment);
}
