import { useState } from "react";

type Props = {
  label?: string;
};

function PushButton({ label = "Button" }: Props) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      className={"push-button" + (pressed ? " pressed" : "")}
      id="preview-pushbutton"
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      <span>{label}</span>
    </div>
  );
}

export default PushButton;
