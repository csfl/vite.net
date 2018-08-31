import axios from "axios";
import config from "./config";

if (process.server) {
  console.log("server");
  config.baseURL = "http://127.0.0.1:8080/api";
} else {
  console.log("client");
  config.baseURL = "/api";
}

const service = axios.create(config);

// Intercepting requests or responses before they are handled by then or catch
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Judging response status
service.interceptors.response.use(
  res => {
    let body = res.data || {};
    if (!body) return;
    if (body.code) {
      throw body;
    }
    return body.data || {};
  },
  error => {
    if (!error.code) {
      error = {
        code: error.response && error.response.status ? error.response.status : "5000",
        msg: error.response && error.response.statusText ? error.response.statusText : "request error"
      };
    }
    return Promise.reject(error);
  }
);

export function post(url, data) {
  // console.log("post request url", url);
  return service({
    method: "post",
    url,
    data
  });
}

export function get(url, data) {
  // console.log("get request url", url);
  return service({
    method: "get",
    url,
    params: data
  });
}
