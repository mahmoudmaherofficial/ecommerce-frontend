import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Dashboard/SideBar";
import TopBar from "../../Components/Dashboard/TopBar";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="position-relative">
        <TopBar />
        <SideBar />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
