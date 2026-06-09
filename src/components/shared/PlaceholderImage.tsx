type PlaceholderImageProps = {
  seed: string;
  width?: number;
  height?: number;
  alt: string;
  aspectRatio?: string;
  className?: string;
  overlay?: boolean;
  priority?: boolean;
};

/**
 * Placeholder image using picsum.photos with a descriptive seed.
 * Replace with real Nano Media photography before production.
 */
export function PlaceholderImage({
  seed,
  width = 800,
  height = 600,
  alt,
  aspectRatio,
  className = "",
  overlay = false,
  priority = false,
}: PlaceholderImageProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gray-100 ${
        aspectRatio ?? ""
      } ${className}`}
    >
      <img
        src={`https://picsum.photos/seed/${seed}/${width}/${height}`}
        alt={alt}
        className="h-full w-full object-cover"
        loading={priority ? "eager" : "lazy"}
      />
      {overlay && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/30 to-transparent" />
      )}
    </div>
  );
}
