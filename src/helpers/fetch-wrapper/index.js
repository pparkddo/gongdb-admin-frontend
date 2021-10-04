export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};

class ResponseError extends Error {

  constructor(message, status, data) {
    super(message);  // message means statusText
    this.status = status;
    this.data = data;
  }
}

function get(url, options) {
    const requestOptions = {
      method: "GET",
      ...options,
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body, options) {
    const requestOptions = {
      method: "POST",
      body: body,
      ...options,
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body, options) {
    const requestOptions = {
      method: "PUT",
      body: body,
      ...options,
    };
    return fetch(url, requestOptions).then(handleResponse);    
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url, options) {
    const requestOptions = {
      method: "DELETE",
      ...options,
    };
    return fetch(url, requestOptions).then(handleResponse);
}

const handleResponse = response => {
  if (!response.ok) {
    return response.json().then(data => {
      throw new ResponseError(response.statusText, response.status, data);
    });
  }
  return response.json();
};
