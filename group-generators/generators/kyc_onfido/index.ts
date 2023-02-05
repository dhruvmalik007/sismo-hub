import {dataProviders} from "@group-generators/helpers/data-providers"
import { dataOperators } from "@group-generators/helpers/data-operators"
import dotenv from "dotenv"
import {Tags,ValueType,GroupWithData, AccountSource} from "topics/group"
import {getApplicantResponse, getCheckResponse} from './scripts/simulate-sandbox-test'
import { GenerationContext,
    GenerationFrequency,
    GroupGenerator,
} from "topics/group-generator"
import { ApiConfig } from "@group-generators/helpers/data-providers/rest-api"

const kycStatus: string[] =  ["result:clear", "result:consider" ]
const typeOfVerif: string[] = ["document","facial-similarity"]
type onfidoResponseType =  {
applicant_id: string;
typeOfVerif: typeof typeOfVerif;
result:typeof kycStatus;


};

type FilteredDataType = {
    id:string;
    created_at: string; //ISO timestamp
    Status: string;
};


dotenv.config()

const generator: GroupGenerator = {
generationFrequency: GenerationFrequency.Once,

generate: async(context: GenerationContext): Promise<GroupWithData[]> => {
const ApiConfig: ApiConfig = {
    url: "https://api.eu.onfido.com/v3.4/checks",
    method: "GET",
    headers: {
       Authorization: `token ${process.env.ONFIDO_API}` 
    },
    data: {
        applicant_id: getApplicantResponse[0],
        report: typeOfVerif
    }
};

const restProvider = new dataProviders.RestProvider();

const response = await restProvider.fetchData(ApiConfig);

const filteredData = response.data.filter(
    (data: onfidoResponseType) => data.result.toString() == ('result.clear' || 'result.consider'))
    .map(({id,created_at,Status}: FilteredDataType) => ({
id,
created_at,
Status,
}));


const elligibleContributors = filteredData.reduce(
    (restData: FilteredDataType, curation: FilteredDataType ) => ({
        ...restData,
        [curation.Status]: 'result:clear',
    }),
    {}


);

return [
    {
        name: "onfido-verified-entities",
        timestamp: context.timestamp,
        generatedBy:'' ,
        data: elligibleContributors,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User],
    }
];

},


};

export default generator;


