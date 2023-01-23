import axiosClient from "./axios";
import { ENPOINT } from "./endpoint";
import { LoginModel, UserProfile } from "@Models/index";
import { HttpResponseModel } from "./http-response.model";

export const authClient = {
  login(data: LoginModel): Promise<HttpResponseModel<UserProfile>> {
    return axiosClient.post(ENPOINT.login, data);
  },

  logout() {
    return axiosClient.post(ENPOINT.logout);
  },
};
