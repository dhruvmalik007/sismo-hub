/**
 * @about this script defines the API to integrate any user trying to instantiate their profile or trying to get details like applicant_id
 * @note DONT USE THIS AS PRODUCTION AS IT IS, THE SECURITY/ TRUST MODEL OF THE SISMO HUB needs the user to not share the personal identifiable information.
 * credits to the onfido description of their typescript SDK. 
 * 
 */

import axios, { AxiosInstance } from "axios";
import { ApiConfig } from "@group-generators/helpers/data-providers/rest-api";
import dotenv from "dotenv"

dotenv.config();

const URL = 'https://api.eu.onfido.com/v3.6/'

// 







export type ApplicationRequest = {
id: string;
created_at: string;
sandbox: boolean;

}

export type OnfidoOptions = {

}

const verificationOptions : string[] = [
"Image Integrity - Supported Document",
"Image Integrity - Image Quality",
"Visual Authenticity - Fonts",
"Visual Authenticity - Security Features",
"Visual Authenticity - Face Detection",
"Data Validation - Document Numbers",
"Data Consistency - Document Type"
];



const headerCreateApplicant: ApiConfig = {
    url: URL + '/applicants',
    method: 'GET',
    headers: {
        Authorization: ` Token token=${process.env.API_TOKEN}`,  
    },

    data: {
        first_name: "Jane",
        last_name: "Doe",
        dob: "1990-01-31",
        address: {
          "building_number": "100",
          "street": "Main Street",
          "town": "London",
          "postcode": "SW4 6EH",
          "country": "GBR"
      
    }
}

};


export const getApplicantResponse: any = async() => {
   return axios.request(headerCreateApplicant).then((response: any) => { 
    const applicant_id = response[0].data;
   });
}



const headerCreateCheck: ApiConfig = {
    url: URL + '/checks',
    method: 'GET',
    headers: {
        Authorization: ` Token token=${process.env.API_TOKEN}`,  
    },
    data: {
        applicant_id: getApplicantResponse[0]
    }
  
    }

export const getCheckResponse: any = async() => {
    return axios.request(headerCreateApplicant).then((response: any) => { 
    const checkResult = response[0].data;
       });
}
    
