import Share from '../Icons/Share';

interface ShareButtonProps {
  className?: string;
}

const ShareButton = ({ className }: ShareButtonProps) => {
  return (
    <button className={className} type="button">
      <Share className="size-5 me-2.5" />
      <span className="text-base font-medium">Share</span>
    </button>
  );
};

export default ShareButton;
