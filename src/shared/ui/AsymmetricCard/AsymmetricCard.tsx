import "./AsymmetricCard.css";

const AsymmetricCard = () => {
  return (
    <div className="relative max-w-lg mx-auto">
      <svg
        className="absolute top-0 right-0 w-20 h-20 z-50"
        viewBox="0 0 48 48"
        fill="none">
        <path
          d="M 0 12 Q 0 0, 12 0 L 48 0 L 48 48 C 48 36, 36 24, 24 24 C 12 24, 0 12, 0 12 Z"
          className="fill-c-dark"
        />
      </svg>

      <div className="rounded-3xl rounded-tr-none -p-px bg-linear-0-to-b from-white/20 to-white/5">
        <div className="bg-c-electric-violet/80 backdrop-blur-xl text-white p-8 flex flex-col gap-4 rounded-3xl rounded-tr-none">
          <h2 className="text-xl font-bold font-satoshi leading-tight">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </h2>
          <p className="text-sm font-light text-white/70 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nemo
            provident ducimus eveniet velit animi a excepturi debitis error
            eaque!
          </p>
          <div className="flex items-center justify-end -space-x-2 pt-2">
            <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-c-electric-violet/80" />
            <div className="w-8 h-8 rounded-full bg-white/30 border-2 border-c-electric-violet/80" />
            <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-c-electric-violet/80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsymmetricCard;
