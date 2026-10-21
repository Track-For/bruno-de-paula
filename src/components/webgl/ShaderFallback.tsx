export default function ShaderFallback() {
  return (
    <svg
      className="balance-fallback"
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth=".8">
        <circle cx="300" cy="300" r="235" opacity=".3" />
        <circle cx="300" cy="300" r="185" opacity=".15" />
        <path d="M300 70V510M95 220L300 155 505 220M155 200L95 360H215L155 200ZM445 200L385 360H505L445 200ZM95 360Q155 440 215 360M385 360Q445 440 505 360M220 510H380M260 490H340" />
        <path
          d="M40 300H560M300 25V575M134 134L466 466M134 466L466 134"
          opacity=".15"
        />
        <circle cx="300" cy="155" r="7" />
      </g>
    </svg>
  );
}
