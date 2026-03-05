export type ShipmentSection =
    | "incoming"
    | "processing-status"
    | "processing-hub"
    | "outgoing";

export interface Shipment {
    id: string;
    origin?: string;
    dest?: string;
    status: string;
    time?: string;
    nextHub?: string;
    dispatchTime?: string;
    section: ShipmentSection;
}

export type ConditionType = "Good" | "Damage";
export type TransportType = "Air" | "Sea" | "Road";

export interface ConfirmReceiptData {
    condition: ConditionType;
    note: string;
}

export interface UpdateStatusData {
    newStatus: string;
    note: string;
}

export interface MarkInTransitData {
    nextHub: string;
    dispatchDateTime: string;
    assignedStaff: string;
    transportType: TransportType;
}