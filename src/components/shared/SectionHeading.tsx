type SectionHeadingProps = {
  eyebrow?: string;
  heading: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  heading,
  description,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`mb-12 md:mb-16 ${isCenter ? "text-center" : ""} ${className}`}
    >
      {eyebrow && (
        <span className="text-brand-500 font-semibold text-sm tracking-widest uppercase mb-3 block">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
        {heading}
      </h2>
      {description && (
        <p
          className={`mt-4 text-gray-600 text-base md:text-lg leading-relaxed ${
            isCenter ? "max-w-2xl mx-auto" : "max-w-[65ch]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
