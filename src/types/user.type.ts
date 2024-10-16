export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  photo: Photo | null;
};
export type Photo = {
  path: string;
};
