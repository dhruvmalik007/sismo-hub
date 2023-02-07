export type WorkflowRunRequest = {
    applicantId: string;
    workflowId: string;
    customData?: any;
  };
  
  type WorkflowRunError = {
    type:	string;
    message: string;
  }
  
  type WorkflowRunLink = {
    url:	string;
    completed_redirect_url:	string;
    expired_redirect_url:	string;
    expires_at:	string;
    language: string;
  }
  
  export type WorkflowRun = {
    id: string;
    applicantId: string;
    workflowId: string;
    workflowVersionId: number;
    dashboardUrl: string;
    status: string;
    output: any;
    reasons: string[] | null;
    error: WorkflowRunError | null;
    link: WorkflowRunLink | null;
    createdAt: string;
    updatedAt: string;
  };
  
  export type WorkflowRunListRequest = {
    page?: number;
    status?: string;
    created_at_gt?: string;
    created_at_lt?: string;
  }
  