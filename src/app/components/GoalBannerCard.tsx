import { ChevronRight, LucideIcon } from "lucide-react";

interface GoalBannerCardProps {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  imageUrl: string;
  icon: LucideIcon;
  accentColor: string;
  onClick: () => void;
}

export function GoalBannerCard({
  titleLine1,
  titleLine2,
  subtitle,
  imageUrl,
  icon: Icon,
  accentColor,
  onClick,
}: GoalBannerCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative h-[160px] w-full overflow-hidden rounded-3xl shadow-md transition-all duration-150 active:scale-[0.98] md:h-[170px]"
      aria-label={`${titleLine1} ${titleLine2} - ${subtitle}`}
    >
      {/* Left Accent Edge */}
      <div
        className="absolute left-0 top-0 z-10 h-full w-1"
        style={{ backgroundColor: accentColor }}
      />

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/40 to-black/65" />

      {/* Dark Overlay on Press (subtle) */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-150 group-active:bg-black/10" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-between p-5 bg-[#000000b8]">
        {/* Top: Icon Chip */}
        

        {/* Bottom: Text + Chevron */}
        <div className="flex items-end justify-between gap-4">
          <div className="flex-1">
            {/* Title Stack - 2 Lines */}
            <div className="mb-1 flex flex-col gap-1">
              <div className="text-left text-[26px] font-semibold leading-tight text-white md:text-[28px]">
                {titleLine1}
              </div>
              <div 
                className="text-left text-[28px] font-bold leading-tight md:text-[30px]"
                style={{ color: accentColor }}
              >
                {titleLine2}
              </div>
            </div>
            <p className="text-left text-sm leading-relaxed text-white/85 md:text-base">
              {subtitle}
            </p>
          </div>

          {/* Chevron Button */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors group-hover:bg-white/30">
            <ChevronRight className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </button>
  );
}