import axios from "axios";
import { useEffect } from "react";
import { GoogleCallBackUrl } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

export default function GoogleCallBack() {
  const location = useLocation();
  const cookie = Cookie();
  useEffect(() => {
    const googleCall = async () => {
      await axios
        .get(`${GoogleCallBackUrl}${location.search}`)
        .then((res) => {
          console.log(res.data);
          cookie.set("token", res.data.access_token);
          window.location.pathname = "/dashboard";
        })
        .catch((err) => {
          console.log(err);
        });
    };
    googleCall();
  }, []);
  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}
