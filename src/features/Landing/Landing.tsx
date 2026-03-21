import NoAuthGuard from "@src/shared/guards/NoAuthGuard";
import Hero from "./Hero/Hero";
import "./Landing.css";

const Landing = () => {
  return (
    <NoAuthGuard>
      <Hero />
    </NoAuthGuard>
  );
};

export default Landing;
