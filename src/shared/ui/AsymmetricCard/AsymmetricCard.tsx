import "./AsymmetricCard.css";

const AsymmetricCard = () => {
  return (
    <div className="relative max-w-lg mx-auto">
      <div className="rounded-3xl rounded-tr-none -p-px bg-linear-0-to-b from-white/20 to-white/5">
        <div className="bg-c-electric-violet/80 backdrop-blur-xl text-white p-8 flex flex-col gap-4 rounded-3xl rounded-tr-[80px]">
          <h2 className="text-xl font-bold font-satoshi leading-tight">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </h2>
          <p className="text-sm  text-white/70 leading-relaxed font-medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa nemo provident ducimus eveniet velit animi a
            excepturi debitis error eaque!
          </p>
          <div className="flex items-center justify-end -space-x-2 pt-2">
            <div className="w-8 h-8 rounded-full bg-c-periwinkle/40 border-2 border-c-electric-violet/80" />
            <div className="w-8 h-8 rounded-full bg-c-periwinkle/60 border-2 border-c-electric-violet/80" />
            <div className="w-8 h-8 rounded-full bg-c-periwinkle/40 border-2 border-c-electric-violet/80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsymmetricCard;
