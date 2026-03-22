interface UnderlineProps {
  className?: string;
}

const Underline = ({ className }: UnderlineProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 21h16M6 3v8a6 6 0 0 0 12 0V3" />
    </svg>
  );
};
export default Underline;
