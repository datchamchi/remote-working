export type DataType = {
  type: "inform" | "invite";
  title?: string;
  content: string;
  from: string;
  to: string;
  project?: string;
};
