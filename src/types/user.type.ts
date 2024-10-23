export type User = {
  id: number;
  name: string;
  email: string;
  photo: Photo | null;
};
export type Photo = {
  path: string;
};
