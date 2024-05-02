"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostData = PostData;
exports.GetData = GetData;
exports.request = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var request = _axios["default"].create({
  baseURL: "https://admin-mpbt.ssv.uz/api/v1" // headers: {
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
  //   "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
  // },

});

exports.request = request;

function PostData(endpoint, data, token) {
  return fetch("".concat("https://admin-mpbt.ssv.uz/api/v1" + endpoint), {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "*/*",
      // 'Content-type': 'multipart/form-data'
      // "Content-Type": "multipart/form-data",
      // "type": "formData"
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(function (res) {
    return res.json();
  });
}

request.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {// window.location = '/';
    // localStorage.clear();
  }

  if (error.response.status === 404 && window.location.pathname !== "/notfound") {
    window.location = "/notfound";
  }

  return Promise.reject(error);
});

function GetData(endpoint, token) {
  return fetch("".concat("https://admin-mpbt.ssv.uz/api/v1/" + endpoint), {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json" // "Access-Control-Request-Headers": "*"

    }
  }).then(function (response) {
    return response.json();
  });
}