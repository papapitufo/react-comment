"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fetcher = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Fetcher = {
  get: get,
  post: post,
  put: put,
  patch: patch,
  "delete": _delete
};
exports.Fetcher = Fetcher;

function get(url, options) {
  var requestOptions = _objectSpread({
    method: 'GET'
  }, options);

  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body, options) {
  var requestOptions = _objectSpread({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }, options);

  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body, options) {
  var requestOptions = _objectSpread({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }, options);

  return fetch(url, requestOptions).then(handleResponse);
}

function patch(url, body, options) {
  var requestOptions = _objectSpread({
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }, options);

  return fetch(url, requestOptions).then(handleResponse);
} // prefixed with underscored because delete is a reserved word in javascript


function _delete(url, options) {
  var requestOptions = _objectSpread({
    method: 'DELETE'
  }, options);

  return fetch(url, requestOptions).then(handleResponse);
} // helper functions


function handleResponse(response) {
  return response.text().then(function (text) {
    var data = text && JSON.parse(text);

    if (!response.ok) {
      var error = data && data.message || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}