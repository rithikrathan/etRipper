import { useState } from "react";

type Props = {
  label?: string;
};

function Checkbox({ label = "Option" }: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <label className="checkbox-row" id="preview-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked((c) => !c)}
      />
      <span className="checkbox-box">
        {checked && <i className="fas fa-check" />}
      </span>
      <span className="checkbox-label">{label}</span>
    </label>
  );
}

export default Checkbox;
