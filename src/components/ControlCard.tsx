import { useState } from "react";

type Props = {
  id: string;
  label: string;
  icon: string;
};

function ControlCard({ id, label, icon }: Props) {
  const [on, setOn] = useState(false);

  return (
    <div className={"control-item" + (on ? " active" : "")} id={id}>
      <div className="control-top">
        <div className="control-icon">
          <i className={"fas fa-" + icon} />
        </div>
        <label className="toggle">
          <input
            type="checkbox"
            checked={on}
            onChange={() => setOn((c) => !c)}
          />
          <span className="slider" />
        </label>
      </div>
      <div className="control-bottom">
        <div className="text-group">
          <div className="control-name">{label}</div>
          <div className="status-group">
            <div className="led" />
            <div className="control-status">{on ? "ON" : "Off"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlCard;
