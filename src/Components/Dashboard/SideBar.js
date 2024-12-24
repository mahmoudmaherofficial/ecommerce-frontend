import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
import { Axios } from "../../Api/axios";
import { UserUrl } from "../../Api/Api";
import { NavLinks } from "./NavLinks";

export default function SideBar() {
  const menu = useContext(Menu);
  const window = useContext(WindowSize);
  const [user, setUser] = useState({});
  const navigator = useNavigate();

  useEffect(() => {
    Axios.get(`${UserUrl}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        navigator("/login", { replace: true });
      });
  }, []);

  return (
    <>
      {
        <div
          style={{
            position: "absolute",
            top: 0,
            left: menu.isOpened && window.width < 768 ? 0 : "-100%",
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.4)",
            transition: "all 0.3s ease-in-out",
            backdropFilter: "blur(3px)",
            zIndex: 1,
          }}></div>
      }
      <div
        className={`side-bar${menu.isOpened ? " opened" : ""}${window.width < 768 ? " mobile-closed" : ""}`}
        style={{ left: window.width < 768 && !menu.isOpened ? "-100%" : 0, width: menu.isOpened ? "250px" : "83px" }}>
        <div className="tabs">
          {NavLinks.filter((link) => link.role.includes(user.role)).map((link, index) => (
            <NavLink key={index} to={link.path} className="tab">
              <FontAwesomeIcon icon={link.icon} />
              <p>{link.name}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
