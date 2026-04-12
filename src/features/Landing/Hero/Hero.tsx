import { Link } from 'react-router';
import Logo from '@src/shared/ui/Logo/Logo';
import Document3D from './components/Document3D';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-stripes" aria-hidden>
        <div className="stripe"></div>
        <div className="stripe"></div>
      </div>

      <div className="hero-canvas">
        <Document3D />
      </div>

      <div className="hero-overlay">
        <nav className="hero-nav">
          <Logo maxWidth="170px" />
          <Link to="/auth/login" className="nav-login">
            Sign in
          </Link>
        </nav>

        <div className="hero-content">
          <span className="hero-eyebrow">Collaborative docs · AI-assisted</span>
          <h2 className="hero-title">
            Your documents,
            <br />
            <span className="text-c-electric-violet">rewritten in light.</span>
          </h2>
          <p className="hero-lead">
            Doclab is where you write, refine and share your documents with the help of AI.
            A fast editor, real-time collaboration and clean exports &mdash; all in one place.
          </p>
          <div className="hero-cta">
            <Link to="/auth/login" className="btn-primary hero-btn">
              Go to dashboard
            </Link>
            <Link to="/auth/register" className="hero-btn-ghost">
              Create an account &rarr;
            </Link>
          </div>
        </div>

        <div className="hero-foot" aria-hidden>
          <span className="dot"></span>
          <span>Drag to rotate</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
