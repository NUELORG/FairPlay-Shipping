import type { Shipment } from "@/types/shipment";
import { dbGetAll, dbSaveAll, isDbConfigured } from "./db";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "shipments.json");

// Fallback: file-based store (local dev without Blob)
function loadFromFile(): Map<string, Shipment> {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
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

function saveToFile(shipments: Map<string, Shipment>) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(DATA_FILE, JSON.stringify(Array.from(shipments.values()), null, 2));
  } catch {
    // ignore
  }
}

const fileStore = new Map<string, Shipment>();
const loaded = loadFromFile();
loaded.forEach((s, k) => fileStore.set(k, s));

async function getAllFromDb(): Promise<Shipment[]> {
  if (isDbConfigured()) {
    const data = await dbGetAll();
    return (data as Shipment[]).filter((s) => s?.trackingId);
  }
  return Array.from(fileStore.values());
}

async function saveAllToDb(shipments: Shipment[]) {
  if (isDbConfigured()) {
    await dbSaveAll(shipments);
  } else {
    fileStore.clear();
    shipments.forEach((s) => fileStore.set(s.trackingId.toUpperCase(), s));
    saveToFile(fileStore);
  }
}

export async function createShipment(shipment: Shipment): Promise<Shipment> {
  const all = await getAllFromDb();
  all.push(shipment);
  await saveAllToDb(all);
  return shipment;
}

export async function getShipmentByTrackingId(trackingId: string): Promise<Shipment | undefined> {
  const key = trackingId.toUpperCase();
  if (isDbConfigured()) {
    const all = await getAllFromDb();
    return all.find((s) => s.trackingId.toUpperCase() === key);
  }
  return fileStore.get(key);
}

export async function getAllShipments(): Promise<Shipment[]> {
  return getAllFromDb();
}

export async function updateShipmentStatus(
  trackingId: string,
  status: Shipment["status"]
): Promise<Shipment | undefined> {
  const key = trackingId.toUpperCase();
  const all = await getAllFromDb();
  const idx = all.findIndex((s) => s.trackingId.toUpperCase() === key);
  if (idx === -1) return undefined;

  const shipment = all[idx];
  shipment.status = status;
  shipment.statusHistory.push({ status, timestamp: new Date().toISOString() });

  await saveAllToDb(all);
  return shipment;
}
