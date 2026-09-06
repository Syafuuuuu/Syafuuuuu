import { useEffect } from "react";

export default function ArchiveModal({ entry, index, total, onClose, onPrevious, onNext }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };

    document.body.classList.add("archive-modal-open");
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("archive-modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div className="archive-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="archive-modal__panel" role="dialog" aria-modal="true" aria-labelledby="archive-modal-title">
        <button className="archive-modal__close tactile-button" type="button" onClick={onClose} aria-label="Close archive entry">CLOSE ×</button>
        <div className="archive-modal__image" style={{ background: entry.media.background }} role="img" aria-label={entry.media.alt} />
        <div className="archive-modal__body">
          <div>
            <span className="piece-tag">{entry.type.toUpperCase()} / {String(index + 1).padStart(2, "0")}</span>
            <h2 id="archive-modal-title">{entry.title}</h2>
            <p>{entry.description}</p>
          </div>
          <dl className="archive-modal__metadata">
            <div><dt>DATE</dt><dd>{entry.date}</dd></div>
            <div><dt>TAGS</dt><dd>{entry.tags.join(" / ")}</dd></div>
          </dl>
        </div>
        <div className="archive-modal__controls">
          <button className="tactile-button" type="button" onClick={onPrevious}>← PREV</button>
          <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
          <button className="tactile-button" type="button" onClick={onNext}>NEXT →</button>
        </div>
      </section>
    </div>
  );
}
