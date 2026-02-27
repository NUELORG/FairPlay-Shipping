"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Shipment, ShipmentStatus } from "@/types/shipment";
import { STATUS_LABELS } from "@/lib/utils";

const STATUS_ORDER: ShipmentStatus[] = [
  "pending",
  "picked_up",
  "on_hold",
  "custom_hold",
  "in_transit",
  "out_for_delivery",
  "delivered",
];

export default function TrackPage() {
  const params = useParams();
  const trackingId = params.trackingId as string;
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchShipment = () => {
    if (!trackingId) return;
    const base = typeof window !== "undefined" ? window.location.origin : "";
    fetch(`${base}/api/shipments/${trackingId}`)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        setShipment(data);
        setNotFound(!data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchShipment();
    const interval = setInterval(fetchShipment, 5000); // Poll for updates
    return () => clearInterval(interval);
  }, [trackingId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-28">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (notFound || !shipment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 pt-28">
        <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Shipment not found</h1>
        <p className="text-slate-600 mb-6 text-center">No shipment found with tracking ID: {trackingId}</p>
        <Link href="/" className="text-blue-600 font-medium hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const currentStatusIndex = STATUS_ORDER.indexOf(shipment.status);

  return (
    <div className="min-h-screen bg-slate-50 pt-28">
      {/* Hero */}
      <div className="relative h-56 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <p className="text-blue-200 text-sm font-medium">Tracking — Saved for life</p>
          <h1 className="text-3xl font-bold font-mono tracking-wider mt-1">{shipment.trackingId}</h1>
          <p className="mt-2 px-4 py-1 bg-white/20 rounded-full text-sm font-medium">
            {STATUS_LABELS[shipment.status]}
          </p>
          <p className="mt-3 text-xs text-slate-400">Access this tracking anytime — your history is stored permanently</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Status timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Shipment Progress</h2>
          <div className="space-y-0">
            {STATUS_ORDER.map((status, index) => {
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = status === shipment.status;
              return (
                <div key={status} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
                      } ${isCurrent ? "ring-4 ring-blue-200" : ""}`}
                    >
                      {isCompleted ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    {index < STATUS_ORDER.length - 1 && (
                      <div className={`w-0.5 flex-1 min-h-[24px] ${isCompleted ? "bg-blue-600" : "bg-slate-200"}`} />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className={`font-medium ${isCompleted ? "text-slate-800" : "text-slate-400"}`}>
                      {STATUS_LABELS[status]}
                    </p>
                    {shipment.statusHistory.find((h) => h.status === status) && (
                      <p className="text-sm text-slate-500 mt-0.5">
                        {new Date(
                          shipment.statusHistory.find((h) => h.status === status)!.timestamp
                        ).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ticket summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Shipment Details</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">From</h3>
              <p className="font-medium text-slate-800">{shipment.sender.name}</p>
              <p className="text-sm text-slate-600">{shipment.sender.city}, {shipment.sender.state}</p>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">To</h3>
              <p className="font-medium text-slate-800">{shipment.recipient.name}</p>
              <p className="text-sm text-slate-600">{shipment.recipient.city}, {shipment.recipient.state}</p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-slate-700"><span className="font-medium">Package:</span> {shipment.package.description}</p>
            <p className="text-slate-700"><span className="font-medium">Weight:</span> {shipment.package.weight} lbs</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 font-medium hover:underline">
            ← Track another package
          </Link>
        </div>
      </div>
    </div>
  );
}
