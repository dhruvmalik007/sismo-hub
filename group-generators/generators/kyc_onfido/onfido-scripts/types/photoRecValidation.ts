import {FileLike} from '../utils/formatting'

export type LivePhotoRequest = {
    applicantId: string;
    file: FileLike;
    advancedValidation?: string;
  };
  
  export type LivePhoto = {
    id: string;
    createdAt: string;
    href: string;
    downloadHref: string;
    fileName: string;
    fileType: string;
    fileSize: number;
  };
  