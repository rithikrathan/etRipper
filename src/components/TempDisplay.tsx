type Props = {
  sensorOnline: boolean;
  onToggleSensor: () => void;
};

function TempDisplay({ sensorOnline, onToggleSensor }: Props) {
  return (
    <div className="temp-hero" id="widget-temp">
      <div className="th-value-row">
        <div className="th-icon">
          <i className="fas fa-temperature-high" />
        </div>
        <div className="th-value"><span>24</span><span className="th-unit">&deg;C</span></div>
      </div>
      <div className="th-bottom">
        <div className="th-label">Climate</div>
        <div className={"th-sub" + (sensorOnline ? "" : " offline")} id="sensor-status" onClick={onToggleSensor}>
          {sensorOnline ? "Sensor Online" : "Sensor Offline"}
        </div>
      </div>
    </div>
  );
}

export default TempDisplay;
