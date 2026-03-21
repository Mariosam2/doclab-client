import AuthGuard from "@src/shared/guards/AuthGuard";
import "./Dashboard.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Documents from "./components/Documents/Documents";

const Dashboard = () => {
  return (
    <AuthGuard>
      <div className="w-full h-screen flex">
        <Sidebar />
        <Documents />
      </div>
    </AuthGuard>
  );
};

export default Dashboard;
