import React from 'react'

export function Footer() {
  return (
    <footer className="bg-[#05080F] border-t border-[#1E3A5F]/30 px-6 md:px-12 lg:px-20 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="font-mono text-sm text-[#3B82F6] uppercase tracking-wider mb-2">
              24/8 Anthems
            </div>
            <p className="text-[#94A3B8] text-sm">
              Neuro-Golf Performance Audio — Where science meets swagger.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#10B981] animate-pulse" />
              <span className="text-[#94A3B8] text-xs font-mono">SYSTEM ACTIVE</span>
            </div>
            <div className="text-[#94A3B8] text-xs font-mono">112 BPM / 3:1 RATIO</div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-[#1E3A5F]/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#64748B] text-xs">
            Research compiled for educational and performance analysis purposes.
          </p>
          <p className="text-[#64748B] text-xs font-mono">
            FRAMES NOT SECONDS
          </p>
        </div>
      </div>
    </footer>
  )
}
