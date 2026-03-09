import { Service } from "@/types/service.types";
import {
    Zap,
    PlaneTakeoff,
    Ship,
    Leaf,
    Snowflake,
    Container,
    Package2,
    Tag,
    Search,
    ClipboardList,
    Thermometer,
    HandHeart,
    Anchor,
    Archive,
    Warehouse,
    FileCheck,
} from "lucide-react";

export const coreServices: Service[] = [
    {
        icon: Zap,
        tag: "GROUPAGE",
        title: "Express Delivery Services",
        desc: "Provide one-stop groupage shipping service from China to Africa. Container shipments at competitive rates.",
    },
    {
        icon: PlaneTakeoff,
        tag: "CONSOLIDATION",
        title: "Air Cargo",
        desc: "A convenient solution for individuals/small businesses shipping small parcels from China to any destination.",
    },
    {
        icon: Ship,
        tag: "SEA & AIR CARGO",
        title: "Sea Cargo",
        desc: "Combining the low-cost advantage of sea shipping with the high-efficiency advantage of air freight.",
    },
    {
        icon: Leaf,
        tag: "SPECIAL CONTAINER",
        title: "Fresh Produce Cargo",
        desc: "Provide booking and shipping services for special containers such as ISO containers, refrigerated cargo.",
    },
    {
        icon: Snowflake,
        tag: "GROUPAGE",
        title: "Frozen Cargo",
        desc: "Provide one-stop groupage shipping service from China to Africa. Specialized cold chain management.",
    },
    {
        icon: Container,
        tag: "GROUPAGE",
        title: "Groupage Container",
        desc: "Provide one-stop groupage shipping service from China to Africa. Container solutions for multiple clients.",
    },
    {
        icon: Package2,
        tag: "FULL CONTAINER",
        title: "Full Container Loading",
        desc: "Be familiar with the customs clearance policies of major domestic and foreign ports. Seamless FCL service.",
    },
];

export const otherServices: Service[] = [
    {
        icon: Tag,
        tag: "SEA & AIR CARGO",
        title: "Personalized Container",
        desc: "Combining the low-cost advantage of sea shipping with the efficiency of personalized service.",
    },
    {
        icon: Search,
        tag: "CONSOLIDATION",
        title: "Sourcing and Branding",
        desc: "A convenient solution for individuals/small businesses shipping small parcels from China.",
    },
    {
        icon: ClipboardList,
        tag: "FULL CONTAINER LOADING",
        title: "Procurement Services",
        desc: "Be familiar with the customs clearance policies of major domestic and foreign ports.",
    },
    {
        icon: Thermometer,
        tag: "GROUPAGE",
        title: "Frozen Shipment Freight",
        desc: "Provide one-stop groupage shipping service from China to Africa. Temperature control solutions.",
    },
    {
        icon: HandHeart,
        tag: "AIR CARGO",
        title: "Handling of Specials",
        desc: "Provide air cargo services from China to Nigeria, delivered directly to the logistics company.",
    },
    {
        icon: Anchor,
        tag: "SPECIAL CONTAINER",
        title: "Heavy Equipments",
        desc: "Provide booking and shipping services for special containers such as ISO containers, refrigerated.",
    },
    {
        icon: Archive,
        tag: "GROUPAGE",
        title: "Fulfillment Services",
        desc: "Provide one-stop groupage shipping service from China to Africa. Complete order fulfillment solutions.",
    },
    {
        icon: Warehouse,
        tag: "GROUPAGE",
        title: "Warehouse Services",
        desc: "Provide one-stop groupage shipping service from China. State-of-the-art warehouse management.",
    },
    {
        icon: FileCheck,
        tag: "GROUPAGE",
        title: "Custom Clearance",
        desc: "Comprehensive customs clearance from China to destinations worldwide. Fast, reliable, hassle-free.",
    },
];