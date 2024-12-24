import { faArrowUpRightFromSquare, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { Axios } from "../../Api/axios";
import { LogoutUrl, UserUrl } from "../../Api/Api";
import { Dropdown, DropdownButton } from "react-bootstrap";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Cookie from "cookie-universal";

export default function TopBar() {
  const menu = useContext(Menu);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const cookie = Cookie();

  useEffect(() => {
    setLoading(true);
    Axios.get(`${UserUrl}`).then((res) => {
      setUser(res.data);
      setLoading(false);
    });
  }, []);

  const handleLogout = async (e) => {
    setLoading(true);
    await Axios.get(`${LogoutUrl}`)
      .then((res) => {
        console.log(res);
        cookie.remove("token");
        window.location.pathname = "/login";
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const role = {
    1995: "Admin",
    1996: "Moderator",
    1999: "Product Manager",
  };
  return (
    <>
      {loading && <LoadingScreen />}
      <div className="top-bar">
        <div className="menu">
          <FontAwesomeIcon
            onClick={() => menu.setIsOpened(!menu.isOpened)}
            className={`menu-icon ${menu.isOpened ? "active" : ""}`}
            icon={faBars}
          />
          <h1 className="logo">e-commerce</h1>
        </div>
        <div>
          <DropdownButton
            variant="outline-secondary"
            id="dropdown-basic-button"
            title={`${loading ? "Loading..." : user.name}`}>
            <Dropdown.Item disabled style={{ color: "#ff572280" }}>
              {role[user.role]}
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>
              Logout <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </>
  );
}
