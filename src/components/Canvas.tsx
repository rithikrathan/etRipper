import type { CSSProperties, ReactNode } from "react";

type Props = {
  width: number;
  height: number;
  children: ReactNode;
};

const screenStyle = (w: number, h: number): CSSProperties => ({
  width: `${w}px`,
  height: `${h}px`,
  minWidth: `${w}px`,
  maxWidth: `${w}px`,
  minHeight: `${h}px`,
  maxHeight: `${h}px`,
  flexShrink: 0,
  overflow: "hidden",
});

function Canvas({ width, height, children }: Props) {
  return (
    <div className="device-screen" id="main-screen" style={screenStyle(width, height)}>
      <div className="canvas">{children}</div>
    </div>
  );
}

export default Canvas;
