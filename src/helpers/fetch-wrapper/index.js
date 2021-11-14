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
  return fetchAndWrapResponse(url, requestOptions);
}

function post(url, body, options) {
  const requestOptions = {
    method: "POST",
    body: body,
    ...options,
  };
  return fetchAndWrapResponse(url, requestOptions);
}

function put(url, body, options) {
  const requestOptions = {
    method: "PUT",
    body: body,
    ...options,
  };
  return fetchAndWrapResponse(url, requestOptions);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url, options) {
  const requestOptions = {
    method: "DELETE",
    ...options,
  };
  return fetchAndWrapResponse(url, requestOptions);
}

function fetchAndWrapResponse(url, requestOptions) {
  return fetch(url, requestOptions)
    .then(handleResponse)
    .catch(handleError);
}

const handleResponse = response => {
  if (!response.ok) {
    return response.json().then(data => {
      throw new ResponseError(response.statusText, response.status, data);
    });
  }
  return response;
};

const handleError = error => {
  if (error instanceof ResponseError) {
    throw error;
  }

  const now = new Date().toISOString();

  // Network error
  if (error.message === "Failed to fetch") {
    throw new ResponseError(error.message, -1, {
      timestamp: now,
      message: "네트워크에 접속할 수 없습니다. 네트워크 연결을 확인해주세요",
    });
  }

  // Unhandled exception
  throw new ResponseError(error.message, -1, {
    timestamp: now,
    message: "Unhandled exception occurred: " + error.message,
  });
}