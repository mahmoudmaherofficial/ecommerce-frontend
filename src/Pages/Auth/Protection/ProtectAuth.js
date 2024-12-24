import Cookie from "cookie-universal";
import { Outlet } from "react-router-dom";

export default function ProtectAuth() {
  const token = Cookie().get("token");

  return token ? window.history.back() : <Outlet />;
}
