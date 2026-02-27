"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Shipment, ShipmentStatus } from "@/types/shipment";
import { STATUS_LABELS } from "@/lib/utils";

const STATUS_OPTIONS: ShipmentStatus[] = [
  "pending",
  "picked_up",
  "on_hold",
  "custom_hold",
  "in_transit",
  "out_for_delivery",
  "delivered",
];

export default function AdminPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchShipments = () => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    fetch(`${base}/api/admin/shipments`)
      .then((res) => res.json())
      .then(setShipments)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchShipments();
    const interval = setInterval(fetchShipments, 3000); // Refresh every 3s for new orders
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (trackingId: string, status: ShipmentStatus) => {
    setUpdating(trackingId);
    try {
      const base = typeof window !== "undefined" ? window.location.origin : "";
      const res = await fetch(`${base}/api/shipments/${trackingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchShipments();
      }
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28">
      {/* Admin Hero */}
      <div className="relative h-40 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-slate-300 text-sm mt-1">Manage shipment statuses</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" />
          </div>
        ) : shipments.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">No shipments yet</h2>
            <p className="text-slate-600 mb-6">Create a shipment from the main site to see it here.</p>
            <Link href="/send" className="text-blue-600 font-medium hover:underline">
              Create a shipment →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">All Shipments ({shipments.length})</h2>
            {shipments.map((shipment) => (
              <div
                key={shipment.trackingId}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-mono font-bold text-slate-800">{shipment.trackingId}</p>
                    <p className="text-sm text-slate-600 mt-1">
                      {shipment.sender.city} → {shipment.recipient.city}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Created: {new Date(shipment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
                      {STATUS_LABELS[shipment.status]}
                    </span>
                    <select
                      value={shipment.status}
                      onChange={(e) => updateStatus(shipment.trackingId, e.target.value as ShipmentStatus)}
                      disabled={updating === shipment.trackingId}
                      className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                    <Link
                      href={`/track/${shipment.trackingId}`}
                      target="_blank"
                      className="text-sm text-blue-600 hover:underline font-medium"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
