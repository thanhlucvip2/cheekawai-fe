import { VerifyUserModel } from "./../../models/verify-user.model";
import { HttpResponseModel } from "./../http-response.model";
import {} from "@Models/index";
import axiosClient from "@Axios/axios";
import { ENPOINT } from "@Axios/endpoint";
import { AxiosResponse } from "axios";
import { RegisterModel } from "@Models/register.model";

export const apiUserAxios = {
  register(data: RegisterModel): Promise<HttpResponseModel<null>> {
    return axiosClient.post(ENPOINT.user_registor, data);
  },
  veryUser(data: VerifyUserModel): Promise<HttpResponseModel<null>> {
    return axiosClient.get(
      `${ENPOINT.user_very_code}?username=${data.username}&code=${data.code}`
    );
  },
  resendVerifyCode(username: string) {
    return axiosClient.get(`${ENPOINT.user_resend_code}?username=${username}`);
  },

  resetPassword(username: string) {
    return axiosClient.post(ENPOINT.user_reset_password, { username });
  },
};
