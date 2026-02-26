import type { Shipment } from "@/types/shipment";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "shipments.json");

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function loadShipments(): Map<string, Shipment> {
  try {
    ensureDataDir();
    if (existsSync(DATA_FILE)) {
      const data = readFileSync(DATA_FILE, "utf-8");
      const arr = JSON.parse(data) as Shipment[];
      return new Map(arr.map((s) => [s.trackingId, s]));
    }
  } catch {
    // ignore
  }
  return new Map();
}

function saveShipments(shipments: Map<string, Shipment>) {
  try {
    ensureDataDir();
    const arr = Array.from(shipments.values());
    writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2));
  } catch {
    // ignore
  }
}

// Use global to persist across hot reloads, but load from file
const globalForStore = globalThis as unknown as { shipmentsMap: Map<string, Shipment> | null };
let shipments = globalForStore.shipmentsMap ?? loadShipments();
if (!globalForStore.shipmentsMap) {
  globalForStore.shipmentsMap = shipments;
}

export function createShipment(shipment: Shipment): Shipment {
  shipments.set(shipment.trackingId, shipment);
  saveShipments(shipments);
  return shipment;
}

export function getShipmentByTrackingId(trackingId: string): Shipment | undefined {
  return shipments.get(trackingId.toUpperCase());
}

export function getAllShipments(): Shipment[] {
  return Array.from(shipments.values());
}

export function updateShipmentStatus(
  trackingId: string,
  status: Shipment["status"]
): Shipment | undefined {
  const shipment = shipments.get(trackingId.toUpperCase());
  if (!shipment) return undefined;

  shipment.status = status;
  shipment.statusHistory.push({
    status,
    timestamp: new Date().toISOString(),
  });
  saveShipments(shipments);
  return shipment;
}
