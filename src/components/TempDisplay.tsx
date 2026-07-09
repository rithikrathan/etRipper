function TempDisplay() {
  return (
    <div className="temp-display" id="widget-temp">
      <div className="temp-left">
        <div className="temp-icon-wrapper">
          <i className="fas fa-temperature-three-quarters" />
        </div>
        <div className="temp-text-group">
          <div className="temp-label">Climate</div>
          <div className="temp-sub">Sensor online</div>
        </div>
      </div>
      <div className="temp-right">
        <div className="temp-value"><span> </span></div>
        <div className="temp-unit">&deg;C</div>
      </div>
    </div>
  );
}

export default TempDisplay;
