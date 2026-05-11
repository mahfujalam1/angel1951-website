export interface ContainerCustomerFormData {
  legalName: string;
  tradingName: string;
  registrationNumber: string;
  countryOfRegistration: string;
  registeredAddress: string;
  contactFullName: string;
  contactPosition: string;
  contactPhone: string;
  contactEmail: string;
  containerSize: string[];
  shippingFrequency: string;
  primaryCargoTypes: string[];
  originCountry: string;
  destinationCountry: string;
  imagePreviews: string[];
}

export interface CorporatePartnerFormData {
  legalName: string;
  tradingName: string;
  registrationNumber: string;
  countryOfRegistration: string;
  registeredAddress: string;
  yearsInOperation: string;
  contactFullName: string;
  contactPosition: string;
  contactPhone: string;
  contactEmail: string;
  companyWebsite: string;
  natureOfBusiness: string[];
  countriesOperateFrom: string;
  countriesShipTo: string;
  estimatedMonthlyVolume: string;
  paymentTerms: string;
  imagePreviews: string[];
}
