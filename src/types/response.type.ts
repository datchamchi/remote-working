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

export type ResponseError = {
  status: string;
  message: string[] | string;
};
export type ResponseSuccess = {
  status: string;
  data: any;
};
