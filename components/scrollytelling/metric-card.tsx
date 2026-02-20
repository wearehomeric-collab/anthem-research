import { cn } from "@/lib/utils"

interface MetricCardProps {
  value: string
  label: string
  status?: "good" | "neutral" | "warning"
  className?: string
}

export function MetricCard({
  value,
  label,
  status = "neutral",
  className,
}: MetricCardProps) {
  const statusStyles = {
    good: "border-l-orange text-orange",
    neutral: "border-l-cream-dark text-cream-dark",
    warning: "border-l-terra-cotta text-terra-cotta",
  }

  return (
    <div
      className={cn(
        "rounded-xl border-l-4 bg-charcoal-light p-6",
        statusStyles[status],
        className
      )}
    >
      <div className="font-sans text-4xl font-bold lg:text-5xl">{value}</div>
      <div className="mt-2 font-mono text-sm text-cream-dark">{label}</div>
    </div>
  )
}
