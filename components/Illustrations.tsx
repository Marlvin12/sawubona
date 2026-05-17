const inkStyle = {
  stroke: "#1a1a1a",
  strokeWidth: 2.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};
const paperFill = { fill: "#ffffff", stroke: "#1a1a1a", strokeWidth: 2.2, strokeLinejoin: "round" as const };

export function IllusHands() {
  return (
    <svg viewBox="0 0 360 240" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect x="116" y="70" width="108" height="138" rx="3" transform="rotate(-6 170 139)" {...paperFill} />
      <rect x="140" y="64" width="108" height="138" rx="3" transform="rotate(4 194 133)" {...paperFill} />
      <g {...inkStyle}>
        <path d="M200 70 C 220 60, 248 62, 266 80 C 280 96, 282 120, 272 142 C 260 166, 238 180, 216 178 C 200 176, 190 170, 184 160" />
        <path d="M208 82 C 216 74, 226 72, 234 78" />
        <path d="M228 88 C 238 84, 248 88, 252 98" />
        <path d="M246 108 C 256 110, 262 120, 260 132" />
        <path d="M212 124 C 224 130, 240 128, 250 118" />
        <circle cx="228" cy="116" r="5" />
        <path d="M184 160 C 180 172, 184 186, 196 192" />
      </g>
    </svg>
  );
}

export function IllusCode() {
  return (
    <svg viewBox="0 0 240 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <rect x="30" y="28" width="180" height="108" rx="4" {...paperFill} />
      <g {...inkStyle}>
        <path d="M56 52 L 48 68 L 56 84" />
        <path d="M184 52 L 192 68 L 184 84" />
        <path d="M96 96 L 144 96" />
        <path d="M76 112 L 164 112" />
        <path d="M80 64 L 120 64" strokeWidth="1.6" />
        <path d="M80 76 L 160 76" strokeWidth="1.6" />
      </g>
    </svg>
  );
}

export function IllusStack() {
  return (
    <svg viewBox="0 0 240 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <g {...inkStyle}>
        <rect x="60" y="96" width="120" height="24" rx="2" fill="#fff" />
        <rect x="52" y="72" width="136" height="24" rx="2" fill="#fff" />
        <rect x="44" y="48" width="152" height="24" rx="2" fill="#fff" />
        <circle cx="60" cy="60" r="3" fill="#1a1a1a" />
        <circle cx="68" cy="84" r="3" fill="#1a1a1a" />
        <circle cx="76" cy="108" r="3" fill="#1a1a1a" />
      </g>
    </svg>
  );
}

export function IllusNeural() {
  return (
    <svg viewBox="0 0 240 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <g {...inkStyle}>
        {[50, 80, 110].map((y, i) => <circle key={"a" + i} cx="60" cy={y} r="7" fill="#fff" />)}
        {[40, 68, 96, 124].map((y, i) => <circle key={"b" + i} cx="120" cy={y} r="7" fill="#fff" />)}
        {[60, 90, 120].map((y, i) => <circle key={"c" + i} cx="180" cy={y} r="7" fill="#fff" />)}
        {[50, 80, 110].flatMap((y1) => [40, 68, 96, 124].map((y2) => (
          <path key={`${y1}-${y2}`} d={`M66 ${y1} L 114 ${y2}`} strokeWidth="1" />
        )))}
        {[40, 68, 96, 124].flatMap((y1) => [60, 90, 120].map((y2) => (
          <path key={`l2-${y1}-${y2}`} d={`M126 ${y1} L 174 ${y2}`} strokeWidth="1" />
        )))}
      </g>
    </svg>
  );
}

export function IllusRobot() {
  return (
    <svg viewBox="0 0 240 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <g {...inkStyle}>
        <rect x="88" y="62" width="64" height="56" rx="6" fill="#fff" />
        <rect x="100" y="40" width="40" height="22" rx="4" fill="#fff" />
        <circle cx="110" cy="86" r="5" fill="#1a1a1a" />
        <circle cx="130" cy="86" r="5" fill="#1a1a1a" />
        <path d="M106 104 Q 120 112 134 104" />
        <path d="M120 40 L 120 28" />
        <circle cx="120" cy="24" r="4" fill="#fff" />
        <path d="M88 80 L 72 88 L 72 108" />
        <path d="M152 80 L 168 88 L 168 108" />
        <rect x="96" y="118" width="20" height="10" rx="2" fill="#fff" />
        <rect x="124" y="118" width="20" height="10" rx="2" fill="#fff" />
      </g>
    </svg>
  );
}

export function IllusBook() {
  return (
    <svg viewBox="0 0 240 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <g {...inkStyle}>
        <path d="M40 60 Q 80 40 120 60 Q 160 40 200 60 L 200 120 Q 160 100 120 120 Q 80 100 40 120 Z" fill="#fff" />
        <path d="M120 60 L 120 120" />
        <path d="M56 72 L 100 64" strokeWidth="1.2" />
        <path d="M56 86 L 108 78" strokeWidth="1.2" />
        <path d="M56 100 L 100 94" strokeWidth="1.2" />
        <path d="M140 64 L 184 72" strokeWidth="1.2" />
        <path d="M132 78 L 184 86" strokeWidth="1.2" />
        <path d="M140 94 L 184 100" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

export function IllusSeedling() {
  return (
    <svg viewBox="0 0 240 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <g {...inkStyle}>
        <path d="M120 130 L 120 70" />
        <path d="M120 94 C 104 86, 86 92, 80 108 C 92 108, 108 104, 120 96" fill="#fff" />
        <path d="M120 82 C 136 72, 158 78, 164 96 C 148 96, 132 92, 120 84" fill="#fff" />
        <rect x="90" y="126" width="60" height="22" rx="3" fill="#fff" />
        <path d="M102 126 L 138 126" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

export function IllusFlag() {
  return (
    <svg viewBox="0 0 240 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      <g {...inkStyle}>
        <path d="M80 130 L 80 30" />
        <path d="M80 38 C 110 28, 140 50, 170 40 L 170 82 C 140 92, 110 70, 80 80 Z" fill="#fff" />
        <circle cx="80" cy="30" r="4" fill="#1a1a1a" />
        <circle cx="80" cy="134" r="6" fill="#1a1a1a" />
      </g>
    </svg>
  );
}

const illustrationMap: Record<string, React.FC> = {
  code: IllusCode,
  stack: IllusStack,
  neural: IllusNeural,
  robot: IllusRobot,
  hands: IllusHands,
  book: IllusBook,
  seedling: IllusSeedling,
  flag: IllusFlag,
};

export function ProgramIllus({ kind }: { kind: string }) {
  const C = illustrationMap[kind] || IllusCode;
  return <C />;
}
