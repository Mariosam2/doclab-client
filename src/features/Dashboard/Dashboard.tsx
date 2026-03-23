import AuthGuard from "@src/shared/guards/AuthGuard";
import "./Dashboard.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router";



const Dashboard = () => {
  return (
    <AuthGuard>
      <div className="w-full h-screen flex">
        <Sidebar />
        <Outlet />
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
