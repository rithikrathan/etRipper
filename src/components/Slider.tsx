type Props = {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
};

function Slider({ label, value = 50, min = 0, max = 100 }: Props) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="slider-wrapper" id="preview-slider">
      {label && <div className="slider-label">{label}</div>}
      <div className="slider-track">
        <div className="slider-fill" style={{ width: `${pct}%` }} />
        <div className="slider-thumb" style={{ left: `${pct}%` }} />
      </div>
    </div>
  );
}

export default Slider;
