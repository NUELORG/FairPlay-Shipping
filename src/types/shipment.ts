export type ShipmentStatus =
  | "pending"
  | "picked_up"
  | "on_hold"
  | "custom_hold"
  | "in_transit"
  | "out_for_delivery"
  | "delivered";

export interface Shipment {
  id: string;
  trackingId: string;
  sender: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
  recipient: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
  package: {
    weight: string;
    dimensions: string;
    description: string;
  };
  status: ShipmentStatus;
  createdAt: string;
  statusHistory: { status: ShipmentStatus; timestamp: string }[];
}
