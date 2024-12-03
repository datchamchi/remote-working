/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URL_BACKEND: string;
  readonly VITE_STREAM_API: string;
  readonly VITE_STREAM_TOKEN: string;
  readonly VITE_STREAM_USERID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
