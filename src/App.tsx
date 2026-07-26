import { useEffect, useState } from "react";
import Canvas from "./components/Canvas";
import PageRouter from "./components/PageRouter";
import "./styles/global.css";
import "./styles/canvas.css";

function App() {
  const [connected, setConnected] = useState(true);
  const [sensorOnline, setSensorOnline] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState("living-room");

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
    (window as any).setRoom = (roomId: string) => setSelectedRoom(roomId);
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
    <Canvas width={480} height={800}>
      <PageRouter
        connected={connected}
        onToggleConnection={() => setConnected((c) => !c)}
        sensorOnline={sensorOnline}
        onToggleSensor={() => setSensorOnline((c) => !c)}
        selectedRoom={selectedRoom}
        onSelectRoom={setSelectedRoom}
      />
    </Canvas>
  );
}

export default App;
