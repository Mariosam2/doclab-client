import "./Avatar.css";
interface AvatarProps {
  maxWidth: string;
  imageSrc?: string;
  className?: string;
}

const Avatar = ({ maxWidth, imageSrc, className }: AvatarProps) => {
  return (
    <div className={className}>
      <img
        className="w-full aspect-square border border-c-muted rounded-full"
        style={{ maxWidth }}
        src={imageSrc}
        alt="avatar image"
      />
    </div>
  );
};

export default Avatar;
