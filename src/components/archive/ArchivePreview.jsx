import { archiveCollections, archiveEntries } from "../../archive";

export default function ArchivePreview({ onOpen }) {
  const collection = archiveCollections[0];
  const entries = collection.entryIds.map((id) => archiveEntries.find((entry) => entry.id === id));

  return (
    <section className="archive-preview" id="photographs" aria-labelledby="photographs-title">
      <div className="section-heading">
        <div><span className="eyebrow">02 / IMAGE BANK</span><h2 id="photographs-title">{collection.title}</h2></div>
        <p>{collection.description}</p>
      </div>
      <div className="contact-sheet">
        {entries.map((entry, index) => (
          <article className={`contact-sheet__item ${index === 0 ? "contact-sheet__item--large" : ""}`} key={entry.id}>
            <button className="archive-entry-button" type="button" onClick={() => onOpen(entry.id)} aria-label={`Open ${entry.title}`}>
              <div className={`photo-placeholder photo-placeholder--${["green", "rust", "blue"][index]}`} role="img" aria-label={entry.media.alt} />
            </button>
            <span>{entry.tags[0].toUpperCase()} / 0{index + 1}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
