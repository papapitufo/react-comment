export const Fetcher = {
  get,
  post,
  put,
  patch,
  delete: _delete
};

function get(url, options) {
  const requestOptions = {
    method: 'GET',
    ...options
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body, options) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...options
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body, options) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...options
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function patch(url, body, options) {
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...options
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url, options) {
  const requestOptions = {
    method: 'DELETE',
    ...options
  };
  return fetch(url, requestOptions).then(handleResponse);
}

// helper functions

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}