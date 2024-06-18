import axios from "axios";
import { BASE_URL } from "./constants";

const client = axios.create({
  baseURL: BASE_URL,
});

export const request = async (options) => {
  const onSuccess = (response) => {
    return response?.data;
  };

  const onError = (error) => {
    return Promise.reject(error.response?.data);
  };

  return client(options).then(onSuccess).catch(onError);
};
