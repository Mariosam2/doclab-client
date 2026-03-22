interface QuoteProps {
  className?: string;
}

const Quote = ({ className }: QuoteProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6h5a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 0-2 2v1m11-10h5a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 0-2 2v1"
      />
    </svg>
  );
};
export default Quote;
