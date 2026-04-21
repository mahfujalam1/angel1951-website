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
        slug: "express-delivery",
        desc: "Provide one-stop groupage shipping service from China to Africa. Container shipments at competitive rates.",
    },
    {
        icon: PlaneTakeoff,
        tag: "CONSOLIDATION",
        title: "Air Cargo",
        slug: "air-cargo",
        desc: "A convenient solution for individuals/small businesses shipping small parcels from China to any destination.",
    },
    {
        icon: Ship,
        tag: "SEA & AIR CARGO",
        title: "Sea Cargo",
        slug: "sea-cargo",
        desc: "Combining the low-cost advantage of sea shipping with the high-efficiency advantage of air freight.",
    },
    {
        icon: Leaf,
        tag: "SPECIAL CONTAINER",
        title: "Fresh Produce Cargo",
        slug: "fresh-produce",
        desc: "Provide booking and shipping services for special containers such as ISO containers, refrigerated cargo.",
    },
    {
        icon: Snowflake,
        tag: "GROUPAGE",
        title: "Frozen Cargo",
        slug: "frozen-cargo",
        desc: "Provide one-stop groupage shipping service from China to Africa. Specialized cold chain management.",
    },
    {
        icon: Container,
        tag: "GROUPAGE",
        title: "Groupage Container",
        slug: "groupage-container",
        desc: "Provide one-stop groupage shipping service from China to Africa. Container solutions for multiple clients.",
    },
    {
        icon: Package2,
        tag: "FULL CONTAINER",
        title: "Full Container Loading",
        slug: "fcl-service",
        desc: "Be familiar with the customs clearance policies of major domestic and foreign ports. Seamless FCL service.",
    },
];

export const otherServices: Service[] = [
    {
        icon: Tag,
        tag: "SEA & AIR CARGO",
        title: "Personalized Container",
        slug: "personalized-container",
        desc: "Combining the low-cost advantage of sea shipping with the efficiency of personalized service.",
    },
    {
        icon: Search,
        tag: "CONSOLIDATION",
        title: "Sourcing and Branding",
        slug: "sourcing-branding",
        desc: "A convenient solution for individuals/small businesses shipping small parcels from China.",
    },
    {
        icon: ClipboardList,
        tag: "FULL CONTAINER LOADING",
        title: "Procurement Services",
        slug: "procurement-services",
        desc: "Be familiar with the customs clearance policies of major domestic and foreign ports.",
    },
    {
        icon: Thermometer,
        tag: "GROUPAGE",
        title: "Frozen Shipment Freight",
        slug: "frozen-shipment",
        desc: "Provide one-stop groupage shipping service from China to Africa. Temperature control solutions.",
    },
    {
        icon: HandHeart,
        tag: "AIR CARGO",
        title: "Handling of Specials",
        slug: "handling-specials",
        desc: "Provide air cargo services from China to Nigeria, delivered directly to the logistics company.",
    },
    {
        icon: Anchor,
        tag: "SPECIAL CONTAINER",
        title: "Heavy Equipments",
        slug: "heavy-equipments",
        desc: "Provide booking and shipping services for special containers such as ISO containers, refrigerated.",
    },
    {
        icon: Archive,
        tag: "GROUPAGE",
        title: "Fulfillment Services",
        slug: "fulfillment-services",
        desc: "Provide one-stop groupage shipping service from China to Africa. Complete order fulfillment solutions.",
    },
    {
        icon: Warehouse,
        tag: "GROUPAGE",
        title: "Warehouse Services",
        slug: "warehouse-services",
        desc: "Provide one-stop groupage shipping service from China. State-of-the-art warehouse management.",
    },
    {
        icon: FileCheck,
        tag: "GROUPAGE",
        title: "Custom Clearance",
        slug: "custom-clearance",
        desc: "Comprehensive customs clearance from China to destinations worldwide. Fast, reliable, hassle-free.",
    },
];

export const serviceDetailsMap: Record<string, {
    fullTitle: string;
    image: string;
    detailedDesc: string;
    features: string[];
    process: { title: string; desc: string }[];
}> = {
    "air-cargo": {
        fullTitle: "Premium Air Freight Services",
        image: "https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        detailedDesc: "Our air freight services offer a convenient and efficient solution for individuals and businesses looking to transport goods quickly from China to Africa and other global destinations. We handle everything from small parcels to large commercial shipments with the utmost care and speed.",
        features: [
            "Express and standard delivery options",
            "Real-time tracking and updates",
            "Direct flights to major hubs",
            "Door-to-door delivery services",
            "Specialized handling for fragile items"
        ],
        process: [
            { title: "Booking", desc: "Select your service and provide shipment details online." },
            { title: "Pickup", desc: "We collect your goods from your location or you drop them at our hub." },
            { title: "Sorting", desc: "Goods are measured, weighed, and sorted at our warehouse." },
            { title: "Transit", desc: "Swift air transport to the destination country." },
            { title: "Delivery", desc: "Last-mile delivery directly to your doorstep." }
        ]
    },
    "sea-cargo": {
        fullTitle: "Global Sea Freight Solutions",
        image: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        detailedDesc: "Combining cost-effectiveness with global reach, our sea cargo services are ideal for large volume shipments. We offer both Full Container Load (FCL) and Less than Container Load (LCL) options to suit your budget and timeline.",
        features: [
            "Competitive ocean freight rates",
            "Consolidation services (LCL)",
            "Container tracking",
            "Port-to-port and door-to-door options",
            "Customs clearance expertise"
        ],
        process: [
            { title: "Documentation", desc: "Gathering necessary export/import permits." },
            { title: "Loading", desc: "Securely packing goods into sea containers." },
            { title: "Sailing", desc: "Scheduled departures across major shipping routes." },
            { title: "Arrival", desc: "Port handling and customs processing." },
            { title: "Distribution", desc: "Final transport from port to your location." }
        ]
    },
    "express-delivery": {
        fullTitle: "Express One-Stop Logistics",
        image: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        detailedDesc: "When time is of the essence, our express delivery services provide the fastest route for your shipments from China to Africa. We pride ourselves on reliability and speed for every package we handle.",
        features: [
            "Priority handling",
            "Guaranteed delivery timelines",
            "Seamless customs transit",
            "Comprehensive insurance options",
            "Expert customer support"
        ],
        process: [
            { title: "Instant Quote", desc: "Get a price and timeline instantly." },
            { title: "Pickup", desc: "Priority pickup within 2 hours." },
            { title: "Air Lift", desc: "The next available flight out." },
            { title: "Clearance", desc: "Pre-arrival customs clearance." },
            { title: "Final Mile", desc: "Immediate delivery upon arrival." }
        ]
    },
    "custom-clearance": {
        fullTitle: "Hassle-Free Customs Clerance",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2959d43?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        detailedDesc: "Navigating international regulations can be complex. Our expert team handles all customs documentation and procedures, ensuring your goods cross borders without delay.",
        features: [
            "Regulatory compliance audit",
            "Duty and tax calculation",
            "Electronic entry filing",
            "Bonding and storage",
            "Dispute resolution support"
        ],
        process: [
            { title: "Review", desc: "Checking invoice and packing lists." },
            { title: "Submission", desc: "Filing entries with customs authorities." },
            { title: "Calculation", desc: "Determining precise duties and taxes." },
            { title: "Approval", desc: "Securing the release of goods." },
            { title: "Release", desc: "Coordinating with transport for final delivery." }
        ]
    }
    // Add more mappings as needed or a default fallback
};