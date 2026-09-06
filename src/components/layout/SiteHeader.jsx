export default function SiteHeader({ time }) {
  return (
    <header className="console-header">
      <a className="brand-mark" href="#top" aria-label="Syafiq studio archive home">
        <span className="brand-mark__light" aria-hidden="true" />
        <span>SYAFIQ / STUDIO ARCHIVE</span>
      </a>
      <div className="header-readout">
        <span className="readout-dot ambient-pulse" aria-hidden="true" />
        <span>LOCAL TIME {time}</span>
      </div>
    </header>
  );
}
