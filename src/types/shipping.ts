// types/shipping.ts

export type ShipmentStatus =
    | "Shipment Created"
    | "In Transit"
    | "Custom Processing"
    | "At Hub"
    | "Out of Delivery"
    | "Delivered"
    | "Arrived at destination";

export type Shipment = {
    id: string;
    orderNo: string;
    user: {
        name: string;
        avatar: string;
        addressShort: string;
    };
    email: string;
    receiverAddress: string;
    phoneNumber: string;
    status: ShipmentStatus;
};

export type TimelineStep = {
    label: string;
    date: string;
    completed: boolean;
    active: boolean;
};

export type MediaItem = {
    type: "image" | "coming_soon";
    src?: string;
    caption: string;
    subCaption?: string;
};

export const SHIPMENTS: Shipment[] = [
    {
        id: "1",
        orderNo: "#1258415256",
        user: { name: "Wade Warren", avatar: "https://i.pravatar.cc/40?img=1", addressShort: "2118 Thornridge Cr. Syrac..." },
        email: "asif@fake.com",
        receiverAddress: "6391 Elgin St. Celina, Delaware 10299",
        phoneNumber: "(208) 555-0112",
        status: "Shipment Created",
    },
    {
        id: "2",
        orderNo: "#1258415256",
        user: { name: "Kathryn Murphy", avatar: "https://i.pravatar.cc/40?img=5", addressShort: "3891 Ranchview Dr. Richa..." },
        email: "priya@sample.com",
        receiverAddress: "3517 W. Gray St. Utica, Pennsylvania 57867",
        phoneNumber: "(671) 555-0110",
        status: "At Hub",
    },
    {
        id: "3",
        orderNo: "#1258415256",
        user: { name: "Marvin McKinney", avatar: "https://i.pravatar.cc/40?img=3", addressShort: "8502 Preston Rd. Inglew..." },
        email: "asif@fake.com",
        receiverAddress: "4140 Parker Rd. Allentown, New Mexico 31134",
        phoneNumber: "(205) 555-0100",
        status: "In Transit",
    },
    {
        id: "4",
        orderNo: "#1258415256",
        user: { name: "Jenny Wilson", avatar: "https://i.pravatar.cc/40?img=9", addressShort: "4140 Parker Rd. Allento..." },
        email: "mehedi@mail.com",
        receiverAddress: "3891 Ranchview Dr. Richardson, California 62639",
        phoneNumber: "(319) 555-0115",
        status: "Custom Processing",
    },
    {
        id: "5",
        orderNo: "#1258415256",
        user: { name: "Esther Howard", avatar: "https://i.pravatar.cc/40?img=6", addressShort: "2118 Thornridge Cir. Syrac..." },
        email: "jamil@demo.com",
        receiverAddress: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
        phoneNumber: "(303) 555-0105",
        status: "Out of Delivery",
    },
    {
        id: "6",
        orderNo: "#1258415256",
        user: { name: "Brooklyn Simmons", avatar: "https://i.pravatar.cc/40?img=7", addressShort: "2715 Ash Dr. San Jose, So..." },
        email: "asif@fake.com",
        receiverAddress: "8502 Preston Rd. Inglewood, Maine 98380",
        phoneNumber: "(480) 555-0103",
        status: "Delivered",
    },
    {
        id: "7",
        orderNo: "#1258415256",
        user: { name: "Jane Cooper", avatar: "https://i.pravatar.cc/40?img=8", addressShort: "4517 Washington Ave. M..." },
        email: "asif@fake.com",
        receiverAddress: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
        phoneNumber: "(629) 555-0129",
        status: "Arrived at destination",
    },
    {
        id: "8",
        orderNo: "#1258415256",
        user: { name: "Jane Cooper", avatar: "https://i.pravatar.cc/40?img=8", addressShort: "4517 Washington Ave. M..." },
        email: "asif@fake.com",
        receiverAddress: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
        phoneNumber: "(629) 555-0129",
        status: "Shipment Created",
    },
];

export const TIMELINE_STEPS: TimelineStep[] = [
    { label: "Shipment Created", date: "Feb 18, 14:00", completed: true, active: false },
    { label: "Picked by staff", date: "Feb 18, 14:00", completed: true, active: false },
    { label: "Arrived at Hub", date: "Feb 18, 14:00", completed: false, active: false },
    { label: "Departed from Hub", date: "Feb 18, 14:00", completed: false, active: true },
    { label: "Out for Delivery", date: "Feb 18, 14:00", completed: false, active: false },
    { label: "Delivered", date: "Feb 18, 14:00", completed: false, active: false },
];

export const MEDIA_ITEMS: MediaItem[] = [
    {
        type: "image",
        src: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=300&q=80",
        caption: "Pickup Photo",
        subCaption: "Hub Receiving Photo",
    },
    {
        type: "image",
        src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&q=80",
        caption: "Delivery Confirmation Photo",
        subCaption: "Photo",
    },
    {
        type: "coming_soon",
        caption: "Delivery Confirmation Photo",
        subCaption: "Photo",
    },
];