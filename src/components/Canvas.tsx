import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { roomConfigs, type RoomConfig } from "../pages";

type CanvasProps = { width: number; height: number; children: ReactNode };

const screenStyle = (w: number, h: number): CSSProperties => ({
  width: `${w}px`, height: `${h}px`,
  minWidth: `${w}px`, maxWidth: `${w}px`,
  minHeight: `${h}px`, maxHeight: `${h}px`,
  flexShrink: 0, overflow: "hidden",
});

function Canvas({ width, height, children }: CanvasProps) {
  return (
    <div className="device-screen" id="main-screen" style={screenStyle(width, height)}>
      <div className="canvas">{children}</div>
    </div>
  );
}

/* ── CtrlTopbar ───────────────────────────────────────────── */

type CtrlTopbarProps = {
  roomName: string;
  roomIcon: string;
  goBack: () => void;
};

function CtrlTopbar({ roomName, roomIcon, goBack }: CtrlTopbarProps) {
  return (
    <div className="ctrl-topbar" id="ui-header">
      <div className="ctrl-nav-back" id="back-btn" onClick={goBack}>
        <i className="fas fa-chevron-left" />
        <span>ROOMS</span>
      </div>
      <div className="ctrl-room-identity">
        <i className={"fas fa-" + roomIcon + " ctrl-room-icon"} />
        <div className="ctrl-room-name">{roomName}</div>
      </div>
    </div>
  );
}

/* ── ClimatePanel ─────────────────────────────────────────── */

type ClimatePanelProps = {
  connected: boolean;
  onToggleConnection: () => void;
  sensorOnline: boolean;
  onToggleSensor: () => void;
};

function ClimatePanel({
  connected,
  onToggleConnection,
  sensorOnline,
  onToggleSensor,
}: ClimatePanelProps) {
  return (
    <div className="climate-panel" id="widget-temp">
      <div className="climate-values-row">
        <div className="climate-readout">
          <i className="fas fa-temperature-three-quarters climate-readout-icon temp" />
          <div className="climate-readout-val">
            <span className="th-val-slot" />
            <span className="climate-readout-unit">&deg;C</span>
          </div>
        </div>
        <div className="climate-divider" />
        <div className="climate-readout">
          <i className="fas fa-droplet climate-readout-icon hum" />
          <div className="climate-readout-val">
            <span className="th-val-slot" />
            <span className="climate-readout-unit">%</span>
          </div>
        </div>
      </div>
      <div className="climate-sensor-row">
        <div
          className={"conn-pill" + (connected ? "" : " disconnected")}
          id="conn-status"
          onClick={onToggleConnection}
        >
          <i className={"fas fa-" + (connected ? "wifi" : "link-slash")} />
          <span id="conn-text">{connected ? "Server: Connected" : "Server: Offline"}</span>
        </div>
        <div
          className={"sensor-bubble" + (sensorOnline ? "" : " offline")}
          id="sensor-status"
          onClick={onToggleSensor}
        >
          <i className={"fas fa-" + (sensorOnline ? "circle-check" : "circle-xmark")} />
          <span id="sensor-text">{sensorOnline ? "Sensor: Online" : "Sensor: Offline"}</span>
        </div>
      </div>
    </div>
  );
}

/* ── ControlCard ──────────────────────────────────────────── */

type ControlCardProps = { id: string; label: string; icon: string };

function ControlCard({ id, label, icon }: ControlCardProps) {
  const [on, setOn] = useState(false);
  return (
    <div className={"ctrl-card" + (on ? " active" : "")} id={id}>
      <div className="cc-pillar" />
      <div className="cc-top-row">
        <div className="cc-icon-box">
          <i className={"fas fa-" + icon} />
        </div>
        <label className="toggle">
          <input type="checkbox" checked={on} onChange={() => setOn(c => !c)} />
          <span className="slider" />
        </label>
      </div>
      <div className="cc-bottom-row">
        <div className="cc-label">{label}</div>
        <div className="cc-status-tag">{on ? "ON" : "OFF"}</div>
      </div>
    </div>
  );
}

/* ── ControlsGrid ─────────────────────────────────────────── */

type ControlsGridProps = { roomConfig?: RoomConfig };

function ControlsGrid({ roomConfig }: ControlsGridProps) {
  const config = roomConfig || roomConfigs["living-room"];
  return (
    <div className="ctrl-grid-2">
      {config.controls.map(c => (
        <ControlCard key={c.id} id={c.id} label={c.label} icon={c.icon} />
      ))}
    </div>
  );
}

export { Canvas, CtrlTopbar, ClimatePanel, ControlsGrid, ControlCard };
export default Canvas;
