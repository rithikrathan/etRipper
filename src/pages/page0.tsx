import { useState } from "react";
import type { PageProps } from "./index";

export default function Page0({ changePage }: PageProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="lock-screen">
      <div className="lock-topbar">
        <div className="lock-brand-text">SMART HUB</div>
      </div>

      <div className="lock-hero">
        <div className="lock-ring" id="unlock-icon">
          <i className="fas fa-house-chimney lock-ring-icon" />
          <div className="lock-ring-label">SECURED</div>
        </div>
      </div>

      <div className="lock-action-row">
        <div
          className={"lock-unlock-btn" + (pressed ? " pressed" : "")}
          id="unlock-btn"
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => { setPressed(false); changePage("page1"); }}
          onMouseLeave={() => setPressed(false)}
        >
          <i className="fas fa-lock-open" />
          <span>UNLOCK</span>
        </div>
      </div>
    </div>
  );
}
