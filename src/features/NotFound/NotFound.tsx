import { NavLink } from "react-router";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-page bg-c-dark min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="stripes">
        <div className="stripe"></div>
        <div className="stripe"></div>
      </div>

      <div className="particles">
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
        <span className="particle"></span>
      </div>

      <div className="relative z-10 text-center px-6">
        <div className="flask-wrapper mx-auto mb-6">
          <svg width="80" height="80" viewBox="0 0 140 130" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(2, 2)">
              <path
                d="M54,38 C54,48 48,56 40,72 L26,98 Q18,114 34,118 L102,118 Q118,114 110,98 L96,72 C88,56 82,48 82,38 Z"
                fill="#9933ff"
                opacity="0.3"
              />
              <g fill="none" stroke="#ccccff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="44" y1="8" x2="92" y2="8" />
                <path d="M54,8 L54,38 M82,8 L82,38" />
                <line x1="54" y1="23" x2="82" y2="23" />
                <path d="M54,38 C54,48 48,56 40,72 L26,98 Q18,114 34,118 L102,118 Q118,114 110,98 L96,72 C88,56 82,48 82,38" />
              </g>
              <circle cx="54" cy="92" r="5.5" fill="#ccccff" opacity="0.5" />
              <circle cx="74" cy="80" r="4" fill="#ccccff" opacity="0.5" />
              <circle cx="62" cy="68" r="2.5" fill="#ccccff" opacity="0.5" />
            </g>
          </svg>
        </div>

        <h1 className="error-code text-[120px] leading-none font-bold text-c-electric-violet tracking-tight">404</h1>

        <h2 className="text-2xl font-medium text-c-periwinkle mt-2 mb-3">Experiment not found</h2>
        <p className="text-c-periwinkle max-w-md mx-auto mb-10 text-sm leading-relaxed">
          Looks like this page escaped the lab. The document you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-4">
          <NavLink to="/home" className="btn-primary px-8 py-2.5 text-white text-sm font-medium">
            Back to lab
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
