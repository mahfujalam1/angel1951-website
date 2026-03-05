export interface OutPartnerFormData {
    // Shop Details
    legalName: string;
    tradingName: string;
    registrationNumber: string;
    countryOfRegistration: string;
    registeredAddress: string;
    yearsInOperation: string;
    // Authorized Contact
    contactFullName: string;
    contactPosition: string;
    contactPhone: string;
    contactEmail: string;
    companyWebsite: string;
    // Business & Cargo
    natureOfBusiness: string[];
    countriesOperateFrom: string;
    countriesShipTo: string;
    primaryCargoTypes: string[];
    estimatedMonthlyVolume: string;
    // Requested Overseas Services
    handledDelivery: "Yes" | "No";
    willingToCommit: "Yes" | "No";
    servicesRequired: string;
    countriesShipToService: string;
    // Images
    imagePreviews: string[];
}