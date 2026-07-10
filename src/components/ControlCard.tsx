import { useState } from "react";

type Props = {
  id: string;
  label: string;
  icon: string;
};

function ControlCard({ id, label, icon }: Props) {
  const [on, setOn] = useState(false);

  return (
    <div className={"ctrl-card" + (on ? " active" : "")} id={id}>
      <div className="cc-top">
        <div className="cc-icon">
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
      <div className="cc-bottom">
        <div className="cc-label">{label}</div>
        <div className={"cc-status" + (on ? " on" : "")}>{on ? "ON" : "OFF"}</div>
      </div>
    </div>
  );
}

export default ControlCard;
