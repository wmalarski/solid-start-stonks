declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Env {
    NOTION_DATABASE?: string;
    NOTION_KEY?: string;
    GOOGLE_ID?: string;
    GOOGLE_SECRET?: string;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export type __Placeholder = number;
