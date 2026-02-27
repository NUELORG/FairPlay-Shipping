export function generateTrackingId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "FP";
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const STATUS_LABELS: Record<string, string> = {
  pending: "Order Received",
  picked_up: "Picked Up",
  on_hold: "On Hold",
  custom_hold: "Custom Hold",
  in_transit: "In Transit",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};
