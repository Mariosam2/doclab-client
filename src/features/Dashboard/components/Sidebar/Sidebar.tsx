import "./Sidebar.css";
import DoclabFlaskSVG from "@src/assets/doclab_flask.svg";
import { useGetProfileQuery } from "@src/store/api/profileSlice";
import Avatar from "../Avatar/Avatar";
import Document from "@src/shared/ui/Icons/DocumentText";
import Sparkle from "@src/shared/ui/Icons/Sparkle";
import SidebarLink from "./components/SidebarLink/SidebarLink";
import { LayoutGroup } from "framer-motion";

const Sidebar = () => {
  const { data: profile } = useGetProfileQuery();
  console.log("profile", profile?.data);
  const profileFullName =
    profile?.data.firstname && profile?.data.lastname ? `${profile.data.firstname}+${profile.data.lastname}` : "A";
  const FALLBACK_URL = `https://ui-avatars.com/api/?name=${profileFullName}&background=1a0a2e&color=ccccff`;

  return (
    <div className="w-20 bg-c-dark h-full py-3 px-1.5 flex flex-col items-center">
      <img src={DoclabFlaskSVG} width={40} height={40} alt="flask icon svg" />
      <div className="actions h-full flex flex-col items-center mt-6">
        <LayoutGroup>
          <SidebarLink to="documents">
            <Document className="size-6 text-sky-50 stroke-2" />
          </SidebarLink>
          <SidebarLink to="summary">
            <Sparkle className="size-6 text-sky-50 stroke-2" />
          </SidebarLink>
        </LayoutGroup>
        <Avatar className="mt-auto" maxWidth="40px" imageSrc={profile?.data.avatarUrl ?? FALLBACK_URL} />
      </div>
    </div>
  );
};

export default Sidebar;
