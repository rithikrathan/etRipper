type Props = {
  connected: boolean;
  onToggle: () => void;
};

function Header({ connected, onToggle }: Props) {
  return (
    <div className="header" id="ui-header">
      <div className="header-left">
        <i className="fas fa-microchip" />
        <h1>IntelliGB</h1>
      </div>
      <div
        className={"status-badge " + (connected ? "connected" : "disconnected")}
        id="conn-status"
        onClick={onToggle}
      >
        <i className={"fas fa-" + (connected ? "wifi" : "link-slash")} />
        <span id="conn-text">{connected ? "Connected" : "Offline"}</span>
      </div>
    </div>
  );
}

export default Header;
