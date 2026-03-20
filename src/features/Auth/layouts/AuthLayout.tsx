import { Outlet } from "react-router";
import AsymmetricCard from "../../../shared/ui/AsymmetricCard/AsymmetricCard";

const AuthLayout = () => {
  return (
    <div className="grid grid-cols-5 bg-c-periwinkle">
      <div className="auth-form col-span-2 grid place-items-center">
        <Outlet />
      </div>

      <div className="col-span-3 bg-c-dark text-c-periwinkle rounded-l-2xl min-h-screen">
        <div className="stripes">
          <div className="stripe"></div>
          <div className="stripe"></div>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="welcome p-4 mt-6">
            <h1 className="text-shadow-white">Welcome to Doclab</h1>
            <p className="text-sm text-c-periwinkle">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio,
              asperiores?
            </p>
          </div>
          <AsymmetricCard />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
