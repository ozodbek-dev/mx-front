import axios from "axios";
import { toast } from "react-toastify";

export const request = axios.create({
  baseURL: "https://admin-mpbt.ssv.uz/api/v1",
});
export const requestIMMUNO = axios.create({
  baseURL: "http://128.199.113.181/api/",
});

export function PostData(endpoint, data, token) {
  return fetch(`${"https://admin-mpbt.ssv.uz/api/v1" + endpoint}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location = "/";
      localStorage.clear();
    }
    if (error.response.status === 404) {
      toast.error("Ma'lumot Topilmadi!");
    }
    return Promise.reject(error);
  }
);

export function GetData(endpoint, token) {
  return fetch(`${`https://admin-mpbt.ssv.uz/api/v1/` + endpoint}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}
