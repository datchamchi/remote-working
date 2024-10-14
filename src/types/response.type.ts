import { Project } from "./project.type";

export type LoginSuccessMessage = {
  status: string;
  accessToken: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    photo: {
      path: string;
    };
  };
};
export type ErrorMessage = {
  status: string;
  message: string;
};
export type GetAllProjectSuccess = {
  status: string;
  data: Project[];
};
