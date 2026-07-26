import { roomConfigs, type PageProps } from "./index";

const SASH_COLORS: Record<string, string> = {
  "living-room": "#f6c177",
  "bedroom":     "#c4a7e7",
  "kitchen":     "#eb6f92",
  "bathroom":    "#9ccfd8",
  "garage":      "#31748f",
  "garden":      "#a6e3a1",
};

const ROOM_ORDER = ["living-room", "bedroom", "kitchen", "bathroom", "garage", "garden"];

export default function Page1({ changePage, goBack, onSelectRoom }: PageProps) {
  return (
    <div className="page-layout">
      <div className="nav-bar">
        <div className="nav-back-btn" id="back-btn" onClick={goBack}>
          <i className="fas fa-chevron-left" />
          <span>Back</span>
        </div>
        <div className="nav-title">ROOMS</div>
      </div>

      <div className="room-list-grid">
        {ROOM_ORDER.map((rid) => {
          const r = roomConfigs[rid];
          return (
            <div
              key={rid}
              className="room-tile"
              id={rid}
              onClick={() => { onSelectRoom(rid); changePage("page2"); }}
            >
              <div className="room-tile-sash" style={{ backgroundColor: SASH_COLORS[rid] }} />
              <i className={"fas fa-" + r.icon + " room-tile-bg-icon"} />
              <div className="room-tile-content">
                <div className="room-tile-name">{r.name}</div>
                <i className="fas fa-chevron-right room-tile-arrow" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
