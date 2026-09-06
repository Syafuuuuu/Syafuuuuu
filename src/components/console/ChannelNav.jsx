import { archiveViews } from "../../archive";

export default function ChannelNav({ activeChannel, onSelect }) {
  return (
    <aside className="console-nav" aria-label="Archive navigation">
      <p className="panel-label">SELECT CHANNEL</p>
      <nav className="channel-list">
        {archiveViews.map((view, index) => (
          <a
            className={`channel ${activeChannel === view.id ? "is-active" : ""}`}
            href={`#${view.id}`}
            key={view.id}
            onClick={() => onSelect(view.id)}
          >
            <span className="channel__number">{String(index + 1).padStart(2, "0")}</span>
            <span className="channel__name">{view.title}</span>
            <span className="channel__indicator" aria-hidden="true" />
          </a>
        ))}
      </nav>
      <div className="console-nav__footer">
        <span className="panel-label">SIGNAL</span>
        <span className="signal-meter" aria-label="Signal strength: good">
          <i /><i /><i /><i /><i />
        </span>
      </div>
    </aside>
  );
}
