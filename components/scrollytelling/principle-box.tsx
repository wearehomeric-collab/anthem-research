import { cn } from "@/lib/utils"

interface PrincipleBoxProps {
  title: string
  quote: string
  className?: string
  variant?: "default" | "highlight"
}

export function PrincipleBox({
  title,
  quote,
  className,
  variant = "default",
}: PrincipleBoxProps) {
  return (
    <div
      className={cn(
        "relative my-8 overflow-hidden rounded-xl border-l-4 p-6",
        variant === "highlight"
          ? "border-orange bg-gradient-to-r from-orange/10 to-transparent"
          : "border-terra-cotta bg-charcoal-light/50",
        className
      )}
    >
      <div className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-orange">
        {title}
      </div>
      <p className="font-sans text-lg leading-relaxed text-cream-light italic">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  )
}
