import { Outlet } from "react-router";
import AsymmetricCard from "../../../shared/ui/AsymmetricCard/AsymmetricCard";
import Logo from "@src/shared/ui/Logo/Logo";
import "./AuthLayout.css";
import NoAuthGuard from "@src/shared/guards/NoAuthGuard";

const AuthLayout = () => {
  return (
    <NoAuthGuard>
      <div className="grid grid-cols-5 ">
        <div className="auth-form col-span-2 grid place-items-center">
          <Outlet />
        </div>

        <div className="col-span-3 right-container bg-c-dark text-c-periwinkle rounded-l-2xl min-h-screen">
          <div className="stripes">
            <div className="stripe"></div>
            <div className="stripe"></div>
          </div>

          <div className="max-w-lg mx-auto pt-42">
            <Logo maxWidth="180px" />
            <div className="welcome p-4 mt-2.5">
              <h1 className="text-shadow-white text-4xl font-medium mb-3">Welcome to Doclab</h1>
              <p className="text-sm text-c-periwinkle font-medium">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, asperiores?
              </p>
            </div>
            <AsymmetricCard />
          </div>
        </div>
      </div>
    </NoAuthGuard>
  );
};

export default AuthLayout;
