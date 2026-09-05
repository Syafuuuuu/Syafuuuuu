import { useEffect, useState } from "react";
import { channels, featuredPieces } from "./archive";

function ChannelNav({ activeChannel, onSelect }) {
  return (
    <aside className="console-nav" aria-label="Archive navigation">
      <p className="panel-label">SELECT CHANNEL</p>
      <nav className="channel-list">
        {channels.map(([number, name, id]) => (
          <a
            className={`channel ${activeChannel === id ? "is-active" : ""}`}
            href={`#${id}`}
            key={id}
            onClick={() => onSelect(id)}
          >
            <span className="channel__number">{number}</span>
            <span className="channel__name">{name}</span>
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

function FeaturedPiece({ piece, index, onPrevious, onNext, onTune }) {
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
        <div className="featured-piece__image" style={{ background: piece.image }} role="img" aria-label="A quiet room with morning light" />
        <div className="featured-piece__caption">
          <div>
            <span className="piece-tag">IMAGE / 001</span>
            <h2>{piece.title}</h2>
          </div>
          <p>{piece.description}</p>
        </div>
      </article>

      <div className="console-controls" aria-label="Featured piece controls">
        <button className="tactile-button" type="button" onClick={onPrevious} aria-label="Previous archive item">← <span>PREV</span></button>
        <div className="dial-control">
          <span className="dial-control__label">TUNE</span>
          <button className="dial" type="button" onClick={onTune} aria-label="Tune archive item"><span /></button>
        </div>
        <button className="tactile-button" type="button" onClick={onNext} aria-label="Next archive item"><span>NEXT</span> →</button>
      </div>
    </div>
  );
}

function ArchivePreview() {
  return (
    <section className="archive-preview" id="photographs" aria-labelledby="photographs-title">
      <div className="section-heading">
        <div><span className="eyebrow">02 / IMAGE BANK</span><h2 id="photographs-title">Collected light</h2></div>
        <p>Photographs, contact sheets, and scenes that stayed with me.</p>
      </div>
      <div className="contact-sheet">
        <article className="contact-sheet__item contact-sheet__item--large"><div className="photo-placeholder photo-placeholder--green" role="img" aria-label="Trees seen through a window" /><span>AFTERNOON / 01</span></article>
        <article className="contact-sheet__item"><div className="photo-placeholder photo-placeholder--rust" role="img" aria-label="A red object in soft light" /><span>OBJECT / 02</span></article>
        <article className="contact-sheet__item"><div className="photo-placeholder photo-placeholder--blue" role="img" aria-label="A blue evening sky" /><span>EVENING / 03</span></article>
      </div>
    </section>
  );
}

function LowerDeck() {
  return (
    <section className="lower-deck" id="notes">
      <article className="note-panel">
        <span className="eyebrow">03 / FIELD NOTE</span>
        <p className="note-panel__date">MARCH 08, 2026 / 08:14</p>
        <h2>Keep the imperfect edges.</h2>
        <p>There is a particular pleasure in the parts of an object that reveal how it was made: the seam, the thumbprint, the uneven line. I am trying to leave more of that in the work.</p>
        <a className="text-link" href="#">Read the note <span aria-hidden="true">↗</span></a>
      </article>
      <aside className="likes-panel" id="likes">
        <span className="eyebrow">04 / CURRENT ROTATION</span>
        <ul><li><span>01</span> Books with generous margins</li><li><span>02</span> Late-night radio</li><li><span>03</span> Objects that show their age</li></ul>
      </aside>
    </section>
  );
}

export default function App() {
  const [activeChannel, setActiveChannel] = useState("featured");
  const [pieceIndex, setPieceIndex] = useState(0);
  const [dialRotation, setDialRotation] = useState(0);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }));
    updateTime();
    const interval = window.setInterval(updateTime, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const changePiece = (direction) => {
    setPieceIndex((current) => (current + direction + featuredPieces.length) % featuredPieces.length);
    setDialRotation((current) => current + direction * 120);
  };

  return (
    <main className="site-shell">
      <header className="console-header">
        <a className="brand-mark" href="#top" aria-label="Syafiq studio archive home"><span className="brand-mark__light" aria-hidden="true" /><span>SYAFIQ / STUDIO ARCHIVE</span></a>
        <div className="header-readout"><span className="readout-dot" aria-hidden="true" /><span>LOCAL TIME {time}</span></div>
      </header>

      <section className="console" id="top" aria-labelledby="console-title">
        <div className="console__topline"><span className="eyebrow">PERSONAL FREQUENCY / 001</span><span className="eyebrow">FIELD NOTES + PHOTOGRAPHS</span></div>
        <div className="console__body">
          <ChannelNav activeChannel={activeChannel} onSelect={setActiveChannel} />
          <div style={{ "--dial-rotation": `${dialRotation}deg` }} className="archive-stage-wrapper">
            <FeaturedPiece piece={featuredPieces[pieceIndex]} index={pieceIndex} onPrevious={() => changePiece(-1)} onNext={() => changePiece(1)} onTune={() => changePiece(1)} />
          </div>
        </div>
        <div className="console__bottomline"><span>VOLUME <b aria-hidden="true">━━━</b> LOW</span><span>UNIT 001 / ANALOGUE MODE</span><span>EST. 2026</span></div>
      </section>

      <ArchivePreview />
      <LowerDeck />
      <footer className="site-footer" id="about"><div><span className="eyebrow">05 / ABOUT THE OPERATOR</span><p>I am Syafiq. I make images, collect references, and write down the things I do not want to forget.</p></div><div className="footer-links"><a href="#">Instagram</a><a href="#">Email</a><a href="#top">Back to top ↑</a></div></footer>
    </main>
  );
}
