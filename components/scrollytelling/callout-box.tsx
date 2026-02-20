import React from "react"
import { cn } from "@/lib/utils"
import { Lightbulb, Zap, Info } from "lucide-react"

interface CalloutBoxProps {
  type: "insight" | "principle" | "info"
  title?: string
  children: React.ReactNode
  className?: string
}

export function CalloutBox({
  type,
  title,
  children,
  className,
}: CalloutBoxProps) {
  const config = {
    insight: {
      icon: Lightbulb,
      borderColor: "border-orange",
      bgColor: "bg-orange/5",
      iconColor: "text-orange",
    },
    principle: {
      icon: Zap,
      borderColor: "border-terra-cotta",
      bgColor: "bg-terra-cotta/5",
      iconColor: "text-terra-cotta",
    },
    info: {
      icon: Info,
      borderColor: "border-cream-dark",
      bgColor: "bg-cream-dark/5",
      iconColor: "text-cream-dark",
    },
  }

  const { icon: Icon, borderColor, bgColor, iconColor } = config[type]

  return (
    <div
      className={cn(
        "my-8 rounded-xl border p-6",
        borderColor,
        bgColor,
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn("mt-0.5 shrink-0", iconColor)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          {title && (
            <div className={cn("mb-2 font-mono text-sm font-bold uppercase tracking-wider", iconColor)}>
              {title}
            </div>
          )}
          <div className="text-cream-dark leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
