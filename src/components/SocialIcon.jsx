/** Brand icons for the social links (filled, inherit currentColor). */
const icons = {
  facebook: (
    <path d="M13.5 21v-7.8h2.6l.4-3.1h-3V8.2c0-.9.3-1.5 1.6-1.5h1.6V3.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H8v3.1h2.5V21h3z" />
  ),
  instagram: (
    <>
      <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9z" />
      <path d="M12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4z" />
      <circle cx="17.2" cy="6.8" r="1.1" />
    </>
  ),
  youtube: (
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z" />
  ),
  linkedin: (
    <path d="M4.5 3A1.9 1.9 0 1 1 4.5 6.8 1.9 1.9 0 0 1 4.5 3zM3 8.8h3V21H3V8.8zm5.2 0H11v1.7c.5-.9 1.7-2 3.6-2 3.5 0 4.2 2.3 4.2 5.4V21h-3v-6.2c0-1.5 0-3.3-2-3.3s-2.3 1.600-2.300 3.200V21h-3V8.800z" />
  ),
};

export default function SocialIcon({ name, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      {icons[name]}
    </svg>
  );
}
