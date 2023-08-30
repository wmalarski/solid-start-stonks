declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Env {
    CLIENT_ID?: string;
    CLIENT_SECRET?: string;
    DOMAIN?: string;
    NODE_ENV?: string;
    NOTION_DATABASE?: string;
    NOTION_KEY?: string;
    REDIRECT_URI?: string;
    SESSION_SECRET?: string;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export type __Placeholder = number;
