import "./Sidebar.css";
import DoclabFlaskSVG from "@src/assets/doclab_flask.svg";
import { useGetProfileQuery } from "@src/store/api/profileSlice";
import Avatar from "../Avatar/Avatar";

const Sidebar = () => {
  const { data: profile } = useGetProfileQuery();
  const profileFullName =
    profile?.data.firstName && profile?.data.lastName ? `${profile.data.firstName}+${profile.data.lastName}` : "A";
  const FALLBACK_URL = `https://ui-avatars.com/api/?name=${profileFullName}&background=1a0a2e&color=ccccff`;

  return (
    <div className="w-20 bg-c-dark h-full py-3 px-1.5 flex flex-col items-center">
      <img src={DoclabFlaskSVG} width={40} height={40} alt="flask icon svg" />
      <div className="actions h-full flex flex-col items-center ">
        <Avatar className="mt-auto" maxWidth="40px" imageSrc={profile?.data.imageSrc ?? FALLBACK_URL} />
      </div>
    </div>
  );
};

export default Sidebar;
