import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router";

const SidebarLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const { pathname } = useLocation();

  const isActive = pathname.endsWith(`/${to}`) || (to === "documents" && pathname.endsWith("/dashboard"));

  return (
    <NavLink to={to} className="relative mt-4 p-1.5 rounded-full">
      {isActive && (
        <motion.div
          key={pathname}
          layoutId="sidebar-active"
          className="absolute inset-0 bg-c-medium-purple rounded-full"
          animate={{
            scaleX: [1, 1.12, 0.92, 1.03, 1],
            scaleY: [1, 0.88, 1.08, 0.97, 1],
          }}
          transition={{
            layout: { type: "spring", stiffness: 400, damping: 24, mass: 0.8 },
            scaleX: { duration: 0.4, times: [0, 0.2, 0.5, 0.75, 1] },
            scaleY: { duration: 0.4, times: [0, 0.2, 0.5, 0.75, 1] },
          }}
        />
      )}
      <span className="relative z-10 block">{children}</span>
    </NavLink>
  );
};

export default SidebarLink;
