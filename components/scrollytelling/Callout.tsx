import React from 'react'
import { cn } from '@/lib/utils'

const calloutVariants: Record<string, string> = {
  insight: 'border-l-4 border-[#00F0FF] bg-[#00F0FF]/5 p-6 md:p-8',
  principle: 'border-l-4 border-[#3B82F6] bg-[#3B82F6]/5 p-6 md:p-8',
  metric: 'border-l-4 border-[#F59E0B] bg-[#F59E0B]/5 p-6 md:p-8',
}

interface CalloutProps {
  variant?: keyof typeof calloutVariants
  className?: string
  children: React.ReactNode
}

export function Callout({ variant = 'insight', className, children }: CalloutProps) {
  return (
    <div className={cn(calloutVariants[variant] || calloutVariants.insight, className)}>
      {children}
    </div>
  )
}

interface MetricDisplayProps {
  value: string
  label: string
  description: string
  sentiment?: 'good' | 'neutral' | 'warning'
}

const sentimentColors: Record<string, { border: string; value: string }> = {
  good: { border: 'border-[#10B981]', value: 'text-[#10B981]' },
  neutral: { border: 'border-[#3B82F6]', value: 'text-[#3B82F6]' },
  warning: { border: 'border-[#F59E0B]', value: 'text-[#F59E0B]' },
}

export function MetricDisplay({ value, label, description, sentiment = 'neutral' }: MetricDisplayProps) {
  const colors = sentimentColors[sentiment] || sentimentColors.neutral
  return (
    <div className={cn('border-l-4 p-6 bg-[#0C1220]', colors.border)}>
      <div className={cn('font-mono text-3xl font-bold mb-1', colors.value)}>{value}</div>
      <div className="text-white font-semibold text-sm mb-2">{label}</div>
      <div className="text-[#94A3B8] text-sm leading-relaxed">{description}</div>
    </div>
  )
}

interface PrincipleBoxProps {
  title: string
  children: React.ReactNode
}

export function PrincipleBox({ title, children }: PrincipleBoxProps) {
  return (
    <div className="bg-[#0C1220] border border-[#1E3A5F] p-6">
      <div className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider mb-3">{title}</div>
      <p className="text-[#E2E8F0] font-medium leading-relaxed">{children}</p>
    </div>
  )
}
