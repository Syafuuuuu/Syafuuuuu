export default function DialControl({ rotation, onTune }) {
  return (
    <div className="dial-control">
      <span className="dial-control__label">TUNE</span>
      <button
        className="dial"
        type="button"
        onClick={onTune}
        style={{ "--dial-rotation": `${rotation}deg` }}
        aria-label="Tune archive item"
      >
        <span />
      </button>
    </div>
  );
}
