import type { SVGProps } from "react";

export function LogoIcon({ className = "size-7", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="logoBrand" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="logoAccent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Base Rounded Shape */}
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        rx="11"
        fill="url(#logoBg)"
        stroke="#334155"
        strokeWidth="1.5"
      />
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="9.5"
        fill="none"
        stroke="url(#logoBrand)"
        strokeWidth="1"
        strokeOpacity="0.3"
      />

      {/* Top CSV Badge */}
      <rect x="7.5" y="7.5" width="22" height="9" rx="4.5" fill="url(#logoBrand)" />
      <text
        x="18.5"
        y="14.3"
        fill="#020617"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        fontWeight="900"
        fontSize="6.5"
        textAnchor="middle"
      >
        CSV
      </text>

      {/* Online / Active Indicator */}
      <circle cx="39" cy="12" r="2.5" fill="#10b981" />

      {/* Grid Cells */}
      {/* Active Cell */}
      <rect x="7.5" y="19.5" width="14" height="10" rx="2.5" fill="url(#logoAccent)" />
      <rect x="9.5" y="23.5" width="10" height="2" rx="1" fill="#ffffff" />

      {/* Standard Cells */}
      <rect
        x="24.5"
        y="19.5"
        width="16"
        height="10"
        rx="2.5"
        fill="#1e293b"
        stroke="#334155"
        strokeWidth="0.75"
      />
      <rect x="27.5" y="23.5" width="10" height="2" rx="1" fill="#64748b" />

      <rect
        x="7.5"
        y="32"
        width="14"
        height="9"
        rx="2.5"
        fill="#1e293b"
        stroke="#334155"
        strokeWidth="0.75"
      />
      <rect x="9.5" y="35.5" width="10" height="2" rx="1" fill="#475569" />

      <rect
        x="24.5"
        y="32"
        width="16"
        height="9"
        rx="2.5"
        fill="#1e293b"
        stroke="#334155"
        strokeWidth="0.75"
      />
      <rect x="27.5" y="35.5" width="10" height="2" rx="1" fill="#475569" />
    </svg>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <LogoIcon className="size-8 transition-transform hover:scale-105" />
      <div className="flex flex-col leading-none">
        <span className="text-sm font-bold tracking-tight text-foreground flex items-center gap-1">
          CSV{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">
            Viewer
          </span>
        </span>
        <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
          &amp; Editor Online
        </span>
      </div>
    </div>
  );
}
