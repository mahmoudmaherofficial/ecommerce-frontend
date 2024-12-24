import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserUrl } from "../../../Api/Api";
import LoadingScreen from "../../../Components/LoadingScreen/LoadingScreen";
import Error403 from "../Errors/Error403";

export default function RequireAuth({ allowedRole }) {
  // Cookies
  const cookie = Cookie();
  const token = cookie.get("token");

  // Navigation Handling
  const navigator = useNavigate();

  // User
  const [user, setUser] = useState("");

  useEffect(() => {
    axios
      .get(UserUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        navigator("/login", { replace: true });
        console.log(err.response.status, err.response.statusText);
      });
  }, []);
  return token ? (
    user === "" ? (
      <LoadingScreen />
    ) : allowedRole.includes(user.role) ? (
      <Outlet />
    ) : (
      <Error403 role={user.role} />
    )
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
