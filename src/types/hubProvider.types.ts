export interface HubProviderFormData {
    // Shop Details
    shopName: string;
    businessTypes: string[];
    fullAddress: string;
    landmark: string;
    cityState: string;
    shopContact: string;
    shopEmail: string;
    // Owner
    ownerName: string;
    ownerEmail: string;
    preferredContact: string[];
    // Operations
    workingDays: string[];
    operatingFrom: string;
    operatingTo: string;
    staffMin: string;
    staffMax: string;
    footTraffic: string;
    cctvAvailable: "Yes" | "No";
    // Experience
    handledDelivery: "Yes" | "No";
    willingToCommit: "Yes" | "No";
    comments: string;
    // Images
    imagePreviews: string[];
}