import DialControl from "./DialControl";

export default function FeaturedPiece({ entry, index, dialRotation, onPrevious, onNext, onTune }) {
  return (
    <div className="console-stage">
      <div className="stage-heading">
        <div>
          <p className="panel-label">NOW PLAYING</p>
          <h1 id="console-title">A room for looking closely.</h1>
        </div>
        <div className="counter-readout" aria-label={`Archive item ${index + 1} of 12`}>
          <span>ARCHIVE</span>
          <strong>{String(index + 1).padStart(2, "0")}</strong><small>/ 12</small>
        </div>
      </div>

      <article className="featured-piece" id="featured">
        <div className="featured-piece__image" style={{ background: entry.media.background }} role="img" aria-label={entry.media.alt} />
        <div className="featured-piece__caption">
          <div>
            <span className="piece-tag">IMAGE / 001</span>
            <h2>{entry.title}</h2>
          </div>
          <p>{entry.description}</p>
        </div>
      </article>

      <div className="console-controls" aria-label="Featured piece controls">
        <button className="tactile-button" type="button" onClick={onPrevious} aria-label="Previous archive item">← <span>PREV</span></button>
        <DialControl rotation={dialRotation} onTune={onTune} />
        <button className="tactile-button" type="button" onClick={onNext} aria-label="Next archive item"><span>NEXT</span> →</button>
      </div>
    </div>
  );
}
