import { useEffect, useState } from "react";
import "./Loader.css";

interface LoaderProps {
  isLoading: boolean;
  variant?: "document" | "dashboard";
}

const Loader = ({ isLoading, variant = "document" }: LoaderProps) => {
  const [visible, setVisible] = useState(isLoading);
  const [active, setActive] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
      setActive(true);
    } else {
      const fadeTimer = setTimeout(() => setActive(false), 2000);

      const unmountTimer = setTimeout(() => setVisible(false), 2500);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, [isLoading]);

  if (!visible && !isLoading) return null;

  return (
    <div
      className={`loader ${variant} ${active ? "loader--active" : "loader--exit"}`}>
      <div className="loader__content">
        {/* Flask SVG */}
        <div className="loader__flask-wrapper">
          <svg
            className="loader__flask"
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            {/* Flask neck */}
            <rect
              x="42"
              y="4"
              width="36"
              height="45"
              rx="4"
              fill="var(--color-c-medium-purple)"
              opacity="0.6"
            />
            {/* Flask cap */}
            <rect
              x="36"
              y="0"
              width="48"
              height="10"
              rx="5"
              fill="var(--color-c-medium-purple)"
              opacity="0.8"
            />
            {/* Flask body */}
            <path
              d="M42 49 L12 110 Q8 120 16 128 L18 130 Q22 134 30 134 L90 134 Q98 134 102 130 L104 128 Q112 120 108 110 L78 49Z"
              fill="url(#flaskGradient)"
              stroke="var(--color-c-medium-purple)"
              strokeWidth="2"
            />

            {/* Liquid fill - animated */}
            <clipPath id="liquidClip">
              <path d="M42 49 L12 110 Q8 120 16 128 L18 130 Q22 134 30 134 L90 134 Q98 134 102 130 L104 128 Q112 120 108 110 L78 49Z" />
            </clipPath>
            <g clipPath="url(#liquidClip)">
              <rect
                className="loader__liquid"
                x="8"
                y="75"
                width="104"
                height="65"
                fill="url(#liquidGradient)"
              />
              {/* Bubbles */}
              <circle
                className="loader__bubble loader__bubble--1"
                cx="45"
                cy="110"
                r="4"
                fill="rgba(255,255,255,0.5)"
              />
              <circle
                className="loader__bubble loader__bubble--2"
                cx="65"
                cy="120"
                r="3"
                fill="rgba(255,255,255,0.4)"
              />
              <circle
                className="loader__bubble loader__bubble--3"
                cx="55"
                cy="105"
                r="5"
                fill="rgba(255,255,255,0.35)"
              />
              <circle
                className="loader__bubble loader__bubble--4"
                cx="75"
                cy="115"
                r="3"
                fill="rgba(255,255,255,0.3)"
              />
            </g>

            <defs>
              <linearGradient
                id="flaskGradient"
                x1="60"
                y1="49"
                x2="60"
                y2="134"
                gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--color-c-periwinkle)" stopOpacity="0.3" />
                <stop
                  offset="1"
                  stopColor="var(--color-c-medium-purple)"
                  stopOpacity="0.15"
                />
              </linearGradient>
              <linearGradient
                id="liquidGradient"
                x1="60"
                y1="75"
                x2="60"
                y2="140"
                gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--color-c-medium-purple)" />
                <stop offset="1" stopColor="var(--color-c-electric-violet)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Glow ring */}
          <div className="loader__glow" />
        </div>

        {/* Text */}
        <div className="loader__text">
          <span className="loader__title">
            {variant === "document" ? "Loading document" : "Loading workspace"}
          </span>
          <span className="loader__dots">
            <span className="loader__dot">.</span>
            <span className="loader__dot">.</span>
            <span className="loader__dot">.</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
