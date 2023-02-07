// url is also optional to allow updating.
export type WebhookRequest = {
    url?: string | null;
    enabled?: boolean;
    environments?: string[];
    events?: string[] | null;
  };
  
  export type Webhook = {
    id: string;
    url: string;
    enabled: boolean;
    events: string[];
    token: string;
    href: string;
    environments: string[];
  };
  