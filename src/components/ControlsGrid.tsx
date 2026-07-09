import ControlCard from "./ControlCard";

const controls = [
  { id: "ctrl-1", label: "Light 1", icon: "lightbulb" },
  { id: "ctrl-2", label: "Fan 1", icon: "fan" },
  { id: "ctrl-3", label: "Light 2", icon: "lightbulb" },
  { id: "ctrl-4", label: "Fan 2", icon: "fan" },
  { id: "ctrl-5", label: "Light 3", icon: "lightbulb" },
  { id: "ctrl-6", label: "Fan 3", icon: "fan" },
  { id: "ctrl-7", label: "Television", icon: "tv" },
  { id: "ctrl-8", label: "Heater", icon: "fire" },
];

function ControlsGrid() {
  return (
    <>
      <div className="section-label">
        <i className="fas fa-layer-group" />
        <span>Switches</span>
      </div>
      <div className="controls-grid">
        {controls.map((c) => (
          <ControlCard key={c.id} id={c.id} label={c.label} icon={c.icon} />
        ))}
      </div>
    </>
  );
}

export default ControlsGrid;
