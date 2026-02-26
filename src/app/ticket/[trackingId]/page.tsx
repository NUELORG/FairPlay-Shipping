"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Shipment } from "@/types/shipment";
import { STATUS_LABELS } from "@/lib/utils";

export default function TicketPage() {
  const params = useParams();
  const trackingId = params.trackingId as string;
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!trackingId) return;
    const base = typeof window !== "undefined" ? window.location.origin : "";
    fetch(`${base}/api/shipments/${trackingId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setShipment)
      .finally(() => setLoading(false));
  }, [trackingId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-28">
        <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 pt-28">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Shipment not found</h1>
        <p className="text-slate-600 mb-6">Please check your tracking ID and try again.</p>
        <Link href="/" className="text-blue-600 font-medium hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success banner */}
        <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold text-emerald-800">Shipment Created Successfully!</h2>
            <p className="text-sm text-emerald-700">Save your tracking ID to track your package.</p>
          </div>
        </div>

        {/* Ticket Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden print:shadow-none">
          {/* Ticket header with barcode-style design */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-200 text-sm font-medium">Tracking Number</p>
                <p className="text-2xl font-mono font-bold tracking-widest mt-1">{shipment.trackingId}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-200 text-sm">Status</p>
                <p className="text-lg font-semibold">{STATUS_LABELS[shipment.status]}</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="h-8 w-1 bg-white/30 rounded-sm" style={{ width: i % 3 === 0 ? 3 : 2 }} />
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* Route visualization */}
            <div className="flex items-center justify-between mb-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-medium text-slate-800 text-sm">{shipment.sender.city}</p>
                <p className="text-xs text-slate-500">From</p>
              </div>
              <div className="flex-1 mx-4 border-t-2 border-dashed border-slate-300" />
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-medium text-slate-800 text-sm">{shipment.recipient.city}</p>
                <p className="text-xs text-slate-500">To</p>
              </div>
            </div>

            {/* Details grid */}
            <div className="grid sm:grid-cols-2 gap-6 border-t border-slate-200 pt-6">
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Sender</h3>
                <p className="font-medium text-slate-800">{shipment.sender.name}</p>
                <p className="text-sm text-slate-600">{shipment.sender.address}</p>
                <p className="text-sm text-slate-600">{shipment.sender.city}, {shipment.sender.state} {shipment.sender.zip}</p>
                <p className="text-sm text-slate-600">{shipment.sender.phone}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Recipient</h3>
                <p className="font-medium text-slate-800">{shipment.recipient.name}</p>
                <p className="text-sm text-slate-600">{shipment.recipient.address}</p>
                <p className="text-sm text-slate-600">{shipment.recipient.city}, {shipment.recipient.state} {shipment.recipient.zip}</p>
                <p className="text-sm text-slate-600">{shipment.recipient.phone}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Package</h3>
              <p className="text-slate-700"><span className="font-medium">Weight:</span> {shipment.package.weight} lbs</p>
              <p className="text-slate-700"><span className="font-medium">Dimensions:</span> {shipment.package.dimensions}</p>
              <p className="text-slate-700"><span className="font-medium">Description:</span> {shipment.package.description}</p>
            </div>

            <p className="mt-6 text-xs text-slate-400">Created: {new Date(shipment.createdAt).toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => window.print()}
            className="py-3 px-6 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Print
          </button>
          <Link
            href={`/track/${shipment.trackingId}`}
            className="flex-1 py-3 text-center bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold rounded-lg transition-colors"
          >
            Track This Package
          </Link>
          <Link
            href="/send"
            className="flex-1 py-3 text-center border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            Send Another Package
          </Link>
        </div>
      </div>
    </div>
  );
}
