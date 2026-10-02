import React from "react";

// Animated illustration panel shown alongside the login/register forms.
// Pure inline SVG + CSS animation — no external image assets required.
const AuthHero = () => (
  <div className="auth-hero">
    <div className="blob blob-1" />
    <div className="blob blob-2" />
    <div className="blob blob-3" />

    <div className="auth-hero-content">
      <svg
        className="hero-illustration"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4338ca" />
          </linearGradient>
          <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* soft glow behind everything */}
        <circle cx="200" cy="200" r="150" fill="#818cf8" opacity="0.18" />

        {/* laptop base */}
        <rect x="55" y="282" width="290" height="16" rx="7" fill="#1e1b4b" opacity="0.85" />

        {/* laptop screen */}
        <rect x="75" y="108" width="250" height="176" rx="18" fill="url(#screenGrad)" />
        <rect x="95" y="128" width="210" height="136" rx="10" fill="#f8fafc" />

        {/* list lines inside screen (notices) */}
        <rect x="112" y="148" width="100" height="10" rx="5" fill="#06b6d4" />
        <rect x="112" y="170" width="176" height="8" rx="4" fill="#cbd5e1" />
        <rect x="112" y="188" width="150" height="8" rx="4" fill="#cbd5e1" />
        <rect x="112" y="206" width="176" height="8" rx="4" fill="#e2e8f0" />
        <rect x="112" y="224" width="120" height="8" rx="4" fill="#e2e8f0" />

        {/* speech bubble — complaint alert */}
        <g className="float-fast">
          <rect x="18" y="48" width="92" height="64" rx="16" fill="#22d3ee" />
          <path d="M40 112 L40 130 L64 112 Z" fill="#22d3ee" />
          <text x="64" y="90" fontSize="34" fontWeight="700" fill="white" textAnchor="middle" fontFamily="Poppins, sans-serif">!</text>
        </g>

        {/* graduation cap */}
        <g className="float-slow">
          <path d="M290 46 L350 70 L290 94 L230 70 Z" fill="#1e1b4b" />
          <rect x="278" y="94" width="24" height="10" rx="3" fill="#1e1b4b" />
          <line x1="332" y1="76" x2="332" y2="104" stroke="#1e1b4b" strokeWidth="3" />
          <circle cx="332" cy="108" r="4" fill="#fbbf24" />
        </g>

        {/* resolved checkmark badge */}
        <g className="pulse">
          <circle cx="322" cy="276" r="36" fill="url(#badgeGrad)" />
          <path
            d="M305 277 L317 289 L341 263"
            stroke="white"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>

        {/* floating dots for depth */}
        <circle className="twinkle" cx="60" cy="230" r="5" fill="#fbbf24" />
        <circle className="twinkle" style={{ animationDelay: "1s" }} cx="340" cy="150" r="4" fill="#22d3ee" />
        <circle className="twinkle" style={{ animationDelay: "2s" }} cx="100" cy="310" r="4" fill="#818cf8" />
      </svg>

      <h1>Your Campus, Connected</h1>
      <p>Notices, complaints and updates for students, faculty and admins — all in one place.</p>

      <div className="hero-features">
        <div className="hero-feature"><span className="feature-icon">🔒</span> Secure, role-based login</div>
        <div className="hero-feature"><span className="feature-icon">📢</span> Real-time campus notices</div>
        <div className="hero-feature"><span className="feature-icon">✅</span> Complaints tracked end-to-end</div>
      </div>
    </div>
  </div>
);

export default AuthHero;
