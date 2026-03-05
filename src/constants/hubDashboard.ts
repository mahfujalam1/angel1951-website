export const INCOMING = [
    { id: "BNI234570", origin: "Shanghai", dest: "Australia Hub", time: "14:00 GST", status: "Arrived" },
];
export const PROCESSING_STATUS = [
    { id: "BNI2544415450", origin: "stais", status: "Arrived" },
];
export const PROCESSING_HUB = [
    { id: "BNI23456", dest: "Paris", status: "Arrived", time: "14:00 GST" },
];
export const OUTGOING = [
    { id: "BNI23456", nextHub: "London", dispatchTime: "18:30 GST" },
];
export const TASKS = [
    { label: "Verify New Packages (8)" },
    { label: "Arrange Pickups (3)" },
    { label: "Upload missing photos for BN" },
];
export const ACTIVITIES = [
    { id: "BNI23448", text: "cleared Customs." },
    { id: "BNI23447", text: "In Transit to London pickup scheduled." },
    { id: "BNI23447", text: "New Shipment Received" },
];