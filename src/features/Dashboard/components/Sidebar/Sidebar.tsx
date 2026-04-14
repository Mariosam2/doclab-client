import './Sidebar.css';
import DoclabFlaskSVG from '@src/assets/doclab_flask.svg';
import Avatar from '../Avatar/Avatar';
import Document from '@src/shared/ui/Icons/DocumentText';
import Sparkle from '@src/shared/ui/Icons/Sparkle';
import Logout from '@src/shared/ui/Icons/Logout';
import SidebarLink from './components/SidebarLink/SidebarLink';
import { LayoutGroup } from 'framer-motion';
import { useProfile } from '@src/shared/hooks/useProfile';
import { useAuthStore } from '@src/shared/store/authStore';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const Sidebar = () => {
  const { data: profile } = useProfile();
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const profileFullName =
    profile?.data.firstname && profile?.data.lastname ? `${profile.data.firstname}+${profile.data.lastname}` : 'A';
  const FALLBACK_URL = `https://ui-avatars.com/api/?name=${profileFullName}&background=1a0a2e&color=ccccff`;

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

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

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          aria-label="Log out"
          title="Log out"
          className="group relative mt-auto mb-2 size-11 rounded-xl flex items-center justify-center text-sky-50/70 hover:text-red-300 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
        >
          <Logout className="size-6 stroke-2 transition-transform duration-200 group-hover:translate-x-0.5" />
          <span className="pointer-events-none absolute left-full ml-3 px-2 py-1 rounded-md bg-c-dark border border-white/10 text-xs text-sky-50 whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 z-50">
            Log out
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate('/dashboard/profile')}
          aria-label="Edit profile"
          title="Edit profile"
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c-electric-violet cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Avatar maxWidth="40px" imageSrc={profile?.data.avatarUrl ?? FALLBACK_URL} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
