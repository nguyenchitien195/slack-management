import axios, { AxiosResponse } from "axios";
import { WebClient } from "@slack/web-api";

export const postAuthentication = async (
  params: any,
): Promise<AxiosResponse<any>> => {
  return axios.post(`https://slack.com/api/oauth.v2.access`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getUserInfo = async (
  token: string,
  userId: string,
): Promise<any> => {
  const web = new WebClient(token);
  return web.users.info({
    user: userId,
  });
};

export const getFiles = async (
  token: string,
): Promise<any> => {
  const web = new WebClient(token);
  return web.files.list({count: 5});
}
