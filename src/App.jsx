import { useEffect, useState } from "react";
import { archiveEntries } from "./archive";
import ArchivePreview from "./components/archive/ArchivePreview";
import ArchiveModal from "./components/archive/ArchiveModal";
import LowerDeck from "./components/archive/LowerDeck";
import ChannelNav from "./components/console/ChannelNav";
import FeaturedPiece from "./components/console/FeaturedPiece";
import SiteFooter from "./components/layout/SiteFooter";
import SiteHeader from "./components/layout/SiteHeader";

function VolumeReadout({ level }) {
  const levels = ["LOW", "MEDIUM", "HIGH"];

  return (
    <span className={`volume-readout volume-readout--${level.toLowerCase()}`}>
      VOLUME <b className="volume-dashes" aria-hidden="true"><i /><i /><i /></b> {level}
      <span className="sr-only">Volume level {levels.indexOf(level) + 1} of 3</span>
    </span>
  );
}

export default function App() {
  const [activeChannel, setActiveChannel] = useState("featured");
  const [pieceIndex, setPieceIndex] = useState(0);
  const [dialRotation, setDialRotation] = useState(0);
  const [time, setTime] = useState("");
  const [volumeLevel, setVolumeLevel] = useState("LOW");
  const [selectedEntryId, setSelectedEntryId] = useState(() => new URLSearchParams(window.location.search).get("entry"));

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const levels = ["LOW", "MEDIUM", "HIGH"];
    let levelIndex = 0;
    const interval = window.setInterval(() => {
      levelIndex = (levelIndex + 1) % levels.length;
      setVolumeLevel(levels[levelIndex]);
    }, 4200);
    return () => window.clearInterval(interval);
  }, []);

  const changePiece = (direction) => {
    setPieceIndex((current) => (current + direction + archiveEntries.length) % archiveEntries.length);
    setDialRotation((current) => current + direction * 120);
  };

  useEffect(() => {
    const syncEntryFromUrl = () => setSelectedEntryId(new URLSearchParams(window.location.search).get("entry"));
    window.addEventListener("popstate", syncEntryFromUrl);
    return () => window.removeEventListener("popstate", syncEntryFromUrl);
  }, []);

  const openEntry = (entryId) => {
    window.history.pushState({}, "", `?entry=${encodeURIComponent(entryId)}`);
    setSelectedEntryId(entryId);
  };

  const closeEntry = () => {
    window.history.pushState({}, "", window.location.pathname);
    setSelectedEntryId(null);
  };

  const changeSelectedEntry = (direction) => {
    const currentIndex = archiveEntries.findIndex((entry) => entry.id === selectedEntryId);
    const nextIndex = (currentIndex + direction + archiveEntries.length) % archiveEntries.length;
    openEntry(archiveEntries[nextIndex].id);
  };

  const selectedEntry = archiveEntries.find((entry) => entry.id === selectedEntryId);
  const selectedEntryIndex = selectedEntry ? archiveEntries.indexOf(selectedEntry) : -1;

  return (
    <main className="site-shell">
      <SiteHeader time={time} />
      <section className="console machine-idle" id="top" aria-labelledby="console-title">
        <div className="console__topline"><span className="eyebrow">PERSONAL FREQUENCY / 001</span><span className="eyebrow">FIELD NOTES + PHOTOGRAPHS</span></div>
        <div className="console__body">
          <ChannelNav activeChannel={activeChannel} onSelect={setActiveChannel} />
          <div className="archive-stage-wrapper">
            <FeaturedPiece
              entry={archiveEntries[pieceIndex]}
              index={pieceIndex}
              dialRotation={dialRotation}
              onPrevious={() => changePiece(-1)}
              onNext={() => changePiece(1)}
              onTune={() => changePiece(1)}
            />
          </div>
        </div>
        <div className="console__bottomline"><VolumeReadout level={volumeLevel} /><span>UNIT 001 / ANALOGUE MODE</span><span>EST. 2026</span></div>
      </section>
      <ArchivePreview onOpen={openEntry} />
      <LowerDeck />
      <SiteFooter />
      {selectedEntry && <ArchiveModal entry={selectedEntry} index={selectedEntryIndex} total={archiveEntries.length} onClose={closeEntry} onPrevious={() => changeSelectedEntry(-1)} onNext={() => changeSelectedEntry(1)} />}
    </main>
  );
}
