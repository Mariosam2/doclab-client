import { useState } from 'react';

interface ClipboardCopyProps {
  btnClassName?: string;
  svgClassName?: string;
  text: string;
  onCopy: () => Promise<void>;
}

const ClipboardCopy = ({ btnClassName, svgClassName, text, onCopy }: ClipboardCopyProps) => {
  const [copying, setCopying] = useState(false);

  const handleCopy = async () => {
    if (copying) return;
    await navigator.clipboard.writeText(text);
    setCopying(true);
    await onCopy();
    setTimeout(() => setCopying(false), 1000);
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      className={`relative  overflow-hidden will-change-transform ${btnClassName}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className={`${svgClassName} transition-all duration-400 ease-in-out ${
          copying ? 'scale-50 opacity-0 rotate-12 text-c-medium-purple' : 'scale-100 opacity-100 rotate-0 text-c-muted '
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
        stroke="currentColor"
        className={`${svgClassName} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          copying
            ? 'scale-110 opacity-100 text-c-medium-purple duration-400'
            : 'scale-0 opacity-0 text-c-muted duration-300'
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
          className={copying ? 'animate-[draw_0.4s_ease-out_forwards]' : ''}
          style={copying ? { strokeDasharray: 30, strokeDashoffset: 0 } : {}}
        />
      </svg>
    </button>
  );
};

export default ClipboardCopy;
