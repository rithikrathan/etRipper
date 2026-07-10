import { useEffect, useState } from "react";
import Header from "./components/Header";
import TempDisplay from "./components/TempDisplay";
import ControlsGrid from "./components/ControlsGrid";
import "./styles/global.css";

function App() {
  const [connected, setConnected] = useState(true);
  const [sensorOnline, setSensorOnline] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    if (mode === "base") {
      document.body.className = "dgus-base-mode";
    } else if (mode === "guide") {
      document.body.className = "dgus-guide-mode";
    }
  }, []);

  useEffect(() => {
    (window as any).toggleConnection = () => setConnected((c) => !c);
    (window as any).toggleSensor = () => setSensorOnline((c) => !c);
    (window as any).setDgusBaseMode = () => {
      document.body.className = "dgus-base-mode";
    };
    (window as any).setDgusGuideMode = () => {
      document.body.className = "dgus-guide-mode";
    };
    (window as any).resetDgusMode = () => {
      document.body.className = "";
    };
  }, []);

  return (
    <div className="device-screen" id="main-screen">
      <div className="canvas">
        <Header
          connected={connected}
          onToggle={() => setConnected((c) => !c)}
        />
        <TempDisplay
          sensorOnline={sensorOnline}
          onToggleSensor={() => setSensorOnline((c) => !c)}
        />
        <ControlsGrid />
      </div>
    </div>
  );
}

export default App;
