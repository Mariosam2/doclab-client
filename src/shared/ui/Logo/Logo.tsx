import DoclabFlaskSVG from "@src/assets/doclab_flask.svg";
import "./Logo.css";

interface LogoProps {
  maxWidth?: string;
}

const Logo = ({ maxWidth }: LogoProps) => {
  return (
    <div className="logo flex items-end gap-x-2.5 w-full" style={{ maxWidth }}>
      <img src={DoclabFlaskSVG} className=" size-14 shrink" alt="flask_logo" />
      <h1 className="text-4xl h-fit text-c-periwinkle font-bold flex items-center grow">
        Doc <span className="text-c-electric-violet">Lab</span>
      </h1>
    </div>
  );
};

export default Logo;
