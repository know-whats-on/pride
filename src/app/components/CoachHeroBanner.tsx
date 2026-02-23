interface CoachHeroBannerProps {
  coachName: string;
  descriptor: string;
  imageUrl: string;
  accentColor: string;
}

export function CoachHeroBanner({
  coachName,
  descriptor,
  imageUrl,
  accentColor,
}: CoachHeroBannerProps) {
  return (
    <div className="relative h-[130px] w-full overflow-hidden rounded-3xl shadow-md md:h-[140px]">
      {/* Left Accent Edge */}
      <div
        className="absolute left-0 top-0 z-10 h-full w-1"
        style={{ backgroundColor: accentColor }}
      />

      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/40 to-black/65" />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end p-5 bg-[#000000b8]">
        <h1 className="mb-1 text-[22px] font-semibold leading-tight text-white md:text-[24px]">
          {coachName}
        </h1>
        <p className="text-sm leading-relaxed text-white/80 md:text-[15px]">
          {descriptor}
        </p>
      </div>
    </div>
  );
}
