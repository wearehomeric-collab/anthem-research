import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  sectionNumber?: string
  eyebrow?: string
  title: string
  subtitle?: string
  className?: string
  accentColor?: "orange" | "orange-dark" | "terra-cotta"
}

export function SectionHeader({
  sectionNumber,
  eyebrow,
  title,
  subtitle,
  className,
  accentColor = "orange",
}: SectionHeaderProps) {
  const accentClasses = {
    orange: "text-orange",
    "orange-dark": "text-orange-dark",
    "terra-cotta": "text-terra-cotta",
  }

  return (
    <div className={cn("mb-12", className)}>
      {(sectionNumber || eyebrow) && (
        <div className="mb-4 flex items-center gap-3">
          {sectionNumber && (
            <span
              className={cn(
                "font-mono text-sm font-bold tracking-wider",
                accentClasses[accentColor]
              )}
            >
              {sectionNumber}
            </span>
          )}
          {eyebrow && (
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cream-dark">
              {eyebrow}
            </span>
          )}
        </div>
      )}
      <h2 className="text-balance font-sans text-3xl font-bold text-cream-light sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-cream-dark">
          {subtitle}
        </p>
      )}
    </div>
  )
}
