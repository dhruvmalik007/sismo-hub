import {FileLike} from '../utils/formatting'

type AddressOptional = {
    flatNumber: string | null;
    buildingNumber: string | null;
    buildingName: string | null;
    street: string | null;
    subStreet: string | null;
    town: string | null;
    state: string | null;
    line1: string | null;
    line2: string | null;
    line3: string | null;
  };
  
  export type AddressRequest = {
    postcode: string;
    country: string;
  } & Partial<AddressOptional>;
  
  export type Address = {
    postcode: string;
    country: string;
  } & Partial<AddressOptional>;
  


  export type ConsentsRequest = {
    name: string;
    granted: Boolean;
  };

  export type LocationRequest = {
    ipAddress?: string | null;
    countryOfResidence?: string | null;
  };

export type Location = {
    ipAddress: string;
    countryOfResidence: string;
  };

  export type ApplicantRequest = {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    dob?: string | null;
    address?: AddressRequest | null;
    idNumbers?: IdNumberRequest[] | null;
    phoneNumber?: string | null;
    location?: LocationRequest | null;
    consents?: ConsentsRequest[] | null;
  };
  
  export type Applicant = {
    id: string;
    createdAt: string;
    deleteAt: string | null;
    href: string;
    firstName: string;
    lastName: string;
    email: string | null;
    dob: string | null;
    address: Address | null;
    idNumbers: IdNumber[] | null;
    phoneNumber: string | null;
    location: Location | null;
  };


  export type CheckRequest = {
    applicantId: string;
    reportNames: string[];
    documentIds?: string[] | null;
    applicantProvidesData?: boolean;
    asynchronous?: boolean;
    tags?: string[] | null;
    suppressFormEmails?: boolean;
    redirectUri?: string | null;
    privacyNoticesReadConsentGiven?: boolean;
    webhookIds?: string[] | null;
    subResult?: string;
    consider?: string[];
  };
  
  export type Check = {
    id: string;
    reportIds: string[];
    createdAt: string;
    href: string;
    applicantId: string;
    applicantProvidesData: boolean;
    status: string;
    tags: string[];
    result: string | null;
    formUri: string | null;
    redirectUri: string | null;
    resultsUri: string;
    privacyNoticesReadConsentGiven: boolean;
    webhookIds: string[] | null;
  };
  
  
  export type DocumentRequest = {
    applicantId?: string | null;
    file: FileLike;
    type: string;
    side?: string | null;
    issuingCountry?: string | null;
    validateImageQuality?: boolean | null;
    location?: LocationRequest | null;
  };
  
  export type Document = {
    id: string;
    applicantId: string | null;
    createdAt: string;
    href: string;
    downloadHref: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    type: string;
    side: string | null;
    issuingCountry: string | null;
  };
  
  export type IdNumberRequest = {
    type: string;
    value: string;
    stateCode?: string | null;
  };
  
  export type IdNumber = {
    type: string;
    value: string;
    stateCode: string | null;
  };