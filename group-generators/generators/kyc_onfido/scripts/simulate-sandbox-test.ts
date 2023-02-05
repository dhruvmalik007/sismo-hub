import axios from "axios";
import { ApiConfig } from "@group-generators/helpers/data-providers/rest-api";
import dotenv from "dotenv"

dotenv.config();

const URL: string = 'https://api.eu.onfido.com/v3.6/'

type aplicantStatus = {
id: string;
created_at: string;
sandbox: boolean;

}

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
    
