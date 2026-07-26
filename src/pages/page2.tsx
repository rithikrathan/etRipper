import { CtrlTopbar, ClimatePanel, ControlsGrid } from "../components/Canvas";
import { roomConfigs, type PageProps } from "./index";

export default function Page2({
  connected,
  onToggleConnection,
  sensorOnline,
  onToggleSensor,
  selectedRoom,
  goBack,
}: PageProps) {
  const currentRoom = roomConfigs[selectedRoom] || roomConfigs["living-room"];

  return (
    <div className="page-layout">
      <CtrlTopbar
        roomName={currentRoom.name}
        roomIcon={currentRoom.icon}
        goBack={goBack}
      />
      <ClimatePanel
        connected={connected}
        onToggleConnection={onToggleConnection}
        sensorOnline={sensorOnline}
        onToggleSensor={onToggleSensor}
      />
      <ControlsGrid roomConfig={currentRoom} />
    </div>
  );
}
