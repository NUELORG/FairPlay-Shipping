import { NextRequest, NextResponse } from "next/server";
import { createShipment } from "@/lib/store";
import { generateTrackingId } from "@/lib/utils";
import type { Shipment, ShipmentStatus } from "@/types/shipment";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const trackingId = generateTrackingId();
    const now = new Date().toISOString();

    const shipment: Shipment = {
      id: crypto.randomUUID(),
      trackingId,
      sender: body.sender,
      recipient: body.recipient,
      package: body.package,
      status: "pending",
      createdAt: now,
      statusHistory: [{ status: "pending" as ShipmentStatus, timestamp: now }],
    };

    await createShipment(shipment);
    return NextResponse.json(shipment);
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
