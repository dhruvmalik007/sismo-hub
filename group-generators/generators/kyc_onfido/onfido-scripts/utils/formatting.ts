import { Readable } from "stream";
import * as http from "http";
import * as stream from "stream";

export interface IFormData extends stream.Readable {
  append(key: string, value: any, options?: IAppendOptions | string): void;
  getHeaders(userHeaders?: IHeaders): IHeaders;
  submit(
    params: string | ISubmitOptions,
    callback?: (error: Error | null, response: http.IncomingMessage) => void
  ): http.ClientRequest;
  getBuffer(): Buffer;
  getBoundary(): string;
  getLength(callback: (err: Error | null, length: number) => void): void;
  getLengthSync(): number;
  hasKnownLength(): boolean;
}

interface IHeaders {
  [key: string]: any;
}

interface IAppendOptions {
  header?: string | IHeaders;
  knownLength?: number;
  filename?: string;
  filepath?: string;
  contentType?: string;
}

interface ISubmitOptions extends http.RequestOptions {
  protocol?: "https:" | "http:";
}

// Using require because "form-data" exports this object as a default export which breaks integration when esModuleInterop: false
// tslint:disable-next-line: no-var-requires
const FormData = require("form-data");

export type SimpleObject = { [key: string]: unknown };

type ContentsAndOptions = {
  contents: Readable;
  filepath: string;
  contentType?: string;
};

export type FileLike = Readable | ContentsAndOptions;

const snakeCase = (camelCaseString: string): string =>
  camelCaseString.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`);

const camelCase = (snakeCaseString: string): string =>
  snakeCaseString
    .replace(/_[0-9]/g, underscoreDigit => underscoreDigit[1])
    .replace(/_[a-z]/g, underscoreChar => underscoreChar[1].toUpperCase());

const deepMapObjectKeys = (value: unknown, f: (key: string) => string): any => {
  if (!(value instanceof Object)) {
    return value;
  } else if (Array.isArray(value)) {
    return value.map(item => deepMapObjectKeys(item, f));
  } else {
    return Object.keys(value).reduce<SimpleObject>((acc, key) => {
      acc[f(key)] = deepMapObjectKeys((value as SimpleObject)[key], f);
      return acc;
    }, {});
  }
};

export const convertObjectToSnakeCase = (requestBody: unknown): unknown => {
  // Converting to JSON and back first handles things like dates, circular references etc.
  requestBody = JSON.parse(JSON.stringify(requestBody));

  return deepMapObjectKeys(requestBody, snakeCase);
};

export const convertObjectToCamelCase = (
  responseBody: SimpleObject
): SimpleObject => deepMapObjectKeys(responseBody, camelCase);

export const toFormData = (object: SimpleObject): IFormData => {
  return Object.entries(object).reduce((formData, [key, value]) => {
    if (value instanceof Object && "contents" in value) {
      const { contents, ...options } = value as ContentsAndOptions;
      formData.append(snakeCase(key), contents, options);
    } else if (value !== undefined && value !== null) {
      if (value instanceof Object) {
        for (const [elementKey, elementValue] of Object.entries(value)) {
          formData.append(snakeCase(key + "[" + elementKey + "]"), elementValue);
        }
      } else {
        formData.append(snakeCase(key), value);
      }
    }
    return formData;
  }, new FormData());
};