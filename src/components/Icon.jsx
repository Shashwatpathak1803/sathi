/** Simple inline SVG icons (stroke-based, inherit currentColor). */
const paths = {
  women: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M12 11v9M9 17h6" />
    </>
  ),
  child: (
    <>
      <circle cx="12" cy="6" r="3" />
      <path d="M8 21v-6a4 4 0 0 1 8 0v6M5 12l3 1M19 12l-3 1" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2 2z" />
      <path d="M20 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2z" />
    </>
  ),
  health: (
    <>
      <path d="M12 21s-7-4.6-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.4-9 9-9 9z" />
      <path d="M8 12h2l1.5-3 2 6 1.5-3h2" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 10v4a1 1 0 0 0 1 1h3l8 4V5L7 9H4a1 1 0 0 0-1 1z" />
      <path d="M18 9a4 4 0 0 1 0 6M7 15l1 5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5l8-3 8 3v16" />
      <path d="M9 9h1M14 9h1M9 13h1M14 13h1M10 21v-4h4v4M2 21h20" />
    </>
  ),
  people: (
    <>
      <circle cx="8" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2 20a6 6 0 0 1 12 0M13 20a4.5 4.5 0 0 1 9 0" />
    </>
  ),
  pin: (
    <>
      <path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  chevronLeft: <path d="M15 5l-7 7 7 7" />,
  chevronRight: <path d="M9 5l7 7-7 7" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  external: <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />,
};

export default function Icon({ name, size = 24, className = '', ...rest }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
