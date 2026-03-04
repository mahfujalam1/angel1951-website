import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Shipment {
    id: string;
    trackingNo: string;
    origin: string;
    destination: string;
    status: "pending" | "in-transit" | "delivered" | "cancelled";
    createdAt: string;
    estimatedDelivery: string;
    weight: number;
    type: "sea" | "air" | "express";
}

interface ShipmentState {
    shipments: Shipment[];
    selectedShipment: Shipment | null;
    loading: boolean;
}

const initialState: ShipmentState = {
    shipments: [],
    selectedShipment: null,
    loading: false,
};

const shipmentSlice = createSlice({
    name: "shipment",
    initialState,
    reducers: {
        setShipments(state, action: PayloadAction<Shipment[]>) {
            state.shipments = action.payload;
        },
        addShipment(state, action: PayloadAction<Shipment>) {
            state.shipments.unshift(action.payload);
        },
        setSelectedShipment(state, action: PayloadAction<Shipment | null>) {
            state.selectedShipment = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
    },
});

export const { setShipments, addShipment, setSelectedShipment, setLoading } = shipmentSlice.actions;
export default shipmentSlice.reducer;