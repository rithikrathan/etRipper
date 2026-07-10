type Props = {
  value?: number;
  max?: number;
  label?: string;
};

function ProgressBar({ value = 65, max = 100, label }: Props) {
  const pct = Math.round((value / max) * 100);

  return (
    <div className="progress-wrapper" id="preview-progress">
      {label && <div className="progress-label">{label}</div>}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress-value">{pct}%</div>
    </div>
  );
}

export default ProgressBar;
