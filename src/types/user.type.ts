export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  photo: {
    path: string;
  };
};
