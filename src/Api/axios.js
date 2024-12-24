import axios from "axios";
import Cookie from "cookie-universal";

const cookie = Cookie();

export const Axios = axios.create({
  headers: {
    Authorization: `Bearer ${cookie.get("token")}`,
  },
});
