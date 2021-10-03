import { toast as toastifyToast } from "react-toastify";

function success(message) {
  toastifyToast(message, {type: "success"});
}

function error(message) {
  toastifyToast(message, {type: "error"});
}

export { success, error };