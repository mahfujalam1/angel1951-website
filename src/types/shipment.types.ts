export type ShipmentStatus =
    | "Created"
    | "Processing"
    | "Received"
    | "In Transit"
    | "Arrived on destination Country"
    | "Custom Cleared"
    | "Arrived at Hub"
    | "Out of delivery"
    | "Delivered";

export interface ShipmentRow {
    id: string;
    trackingNumber: string;
    customer: {
        name: string;
        address: string;
        avatar?: string;
    };
    email: string;
    origin: string;
    destination: string;
    phone?: string;
    status: ShipmentStatus;
}

export interface TimelineEvent {
    label: string;
    timestamp?: string;
    highlight?: boolean;
    status?: ShipmentStatus;
    toHub?: string;
    time?: string;
    estimatedDelivery?: string;
}

export interface ShipmentDetail {
    trackingNumber: string;
    status: ShipmentStatus;
    lastUpdate: string;
    routing: {
        origin: string;
        destination: string;
    };
    sender: {
        name: string;
        phone: string;
        pickupAddress: string;
    };
    receiver: {
        name: string;
        phone: string;
        deliveryAddress: string;
    };
    package: {
        type: string;
        weight: string;
        dimensions: string;
        quantity: number;
        note: string;
    };
    timeline: TimelineEvent[];
    assignedHub: {
        hubName: string;
        staffName: string;
        staffPhone: string;
        staffAvatar?: string;
    };
    payment: {
        status: ShipmentStatus;
        amount: string;
        invoice: string;
    };
    proofPhotos: {
        label: string;
        url?: string;
        timestamp: string;
    }[];
}

// ── Status styling map ──────────────────────────────────────────────────────
export const STATUS_STYLES: Record<ShipmentStatus, string> = {
    Created: "bg-amber-50 text-amber-600 border-amber-200",
    Processing: "bg-purple-50 text-purple-600 border-purple-200",
    Received: "bg-blue-50 text-blue-600 border-blue-200",
    "In Transit": "bg-cyan-50 text-cyan-600 border-cyan-200",
    "Arrived on destination Country": "bg-teal-50 text-teal-600 border-teal-200",
    "Custom Cleared": "bg-indigo-50 text-indigo-600 border-indigo-200",
    "Arrived at Hub": "bg-emerald-50 text-emerald-600 border-emerald-200",
    "Out of delivery": "bg-gray-100 text-gray-600 border-gray-200",
    Delivered: "bg-green-50 text-green-600 border-green-200",
};

// ── Timeline ordered steps ──────────────────────────────────────────────────
export const TIMELINE_STEPS: ShipmentStatus[] = [
    "Created",
    "Processing",
    "Received",
    "In Transit",
    "Arrived on destination Country",
    "Custom Cleared",
    "Arrived at Hub",
    "Out of delivery",
    "Delivered",
];

// ── Mock data ───────────────────────────────────────────────────────────────
const CUSTOMERS = [
    { name: "Wade Warren", address: "2118 Thornridge Cir. Syrac...", avatar: "" },
    { name: "Kathryn Murphy", address: "8901 Kanchanow Dr. Richa...", avatar: "" },
    { name: "Marvin McKinney", address: "8502 Preston Rd. Inglew...", avatar: "" },
    { name: "Jenny Wilson", address: "4140 Parker Rd. Allentown...", avatar: "" },
    { name: "Esther Howard", address: "2118 Thornridge Cir. Syrac...", avatar: "" },
    { name: "Brooklyn Simmons", address: "2176 Ash Dr. San Jose, So...", avatar: "" },
    { name: "Jane Cooper", address: "4517 Washington Ave. M...", avatar: "" },
];

const STATUSES: ShipmentStatus[] = [
    "Created",
    "Created",
    "Processing",
    "Out of delivery",
    "Created",
    "In Transit",
    "Created",
    "Created",
    "Out of delivery",
    "Arrived at Hub",
    "Delivered",
    "Custom Cleared",
    "Arrived at Hub",
    "Processing",
    "Arrived at Hub",
    "Processing",
];

export const MOCK_SHIPMENTS: ShipmentRow[] = STATUSES.map((status, i) => ({
    id: `ship-${i}`,
    trackingNumber: "#1258415256",
    customer: CUSTOMERS[i % CUSTOMERS.length],
    email: i % 3 === 0 ? "osif@fake.com" : i % 3 === 1 ? "priya@sample.com" : "mehed@mail.com",
    origin: "Bangladesh",
    destination: "Us",
    phone: `(${200 + i * 10}) 555-0${100 + i}`,
    status,
}));

export const MOCK_DETAIL: ShipmentDetail = {
    trackingNumber: "BN123456",
    status: "In Transit",
    lastUpdate: "Apr 22, 2024, 3:45 PM",
    routing: { origin: "Shanghai, China", destination: "London, UK" },
    sender: {
        name: "John Dunn",
        phone: "+88138 12345 678",
        pickupAddress: "123 Nanzing Rd, Shanghai China",
    },
    receiver: {
        name: "Jannie Smith",
        phone: "16554 0 7 123456",
        deliveryAddress: "45 Oxford St Street, London, UK",
    },
    package: {
        type: "Parcel",
        weight: "2.5 KG",
        dimensions: "40 x 30 x 20 cm",
        quantity: 1,
        note: "Handle with care",
    },
    timeline: [
        { label: "Created", timestamp: "April 17, 2024, 9:00 AM", time: "April 17, 2024, 9:19 AM" },
        { label: "Picked up by Ahmed Khan", timestamp: "", time: "" },
        { label: "Arrived at Shanghai Hub", timestamp: "", time: "April 17, 2024, 9:19 AM" },
        { label: "Departed From Shanghai have hub", timestamp: "", time: "April 17, 2024, 9:19 AM" },
        {
            label: "In Transit",
            timestamp: "",
            time: "Apr 19, 2024, 2:00 PM",
            highlight: true,
            status: "In Transit",
            toHub: "To London Hub",
        },
        { label: "Estimated Delivery: Apr 25, 2024", timestamp: "", time: "" },
        { label: "Out Of Delivery", timestamp: "", time: "" },
        { label: "Delivered", timestamp: "", time: "" },
    ],
    assignedHub: {
        hubName: "Dubai Hub",
        staffName: "Ahmed Khan",
        staffPhone: "+36985155 6998",
    },
    payment: {
        status: "In Transit",
        amount: "$120.00",
        invoice: "INV-05731",
    },
    proofPhotos: [
        { label: "Picked Up", url: "", timestamp: "April 17, 2024, 9:19 AM" },
        { label: "At Hub", url: "", timestamp: "April 17, 2024, 9:19 AM" },
        { label: "Delivered", url: undefined, timestamp: "April 17, 2024, 9:19 AM" },
    ],
};