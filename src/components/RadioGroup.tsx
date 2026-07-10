import { useState } from "react";

type Props = {
  name?: string;
  options?: string[];
};

function RadioGroup({ name = "radio", options = ["A", "B", "C"] }: Props) {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="radio-group" id="preview-radiogroup">
      {options.map((opt) => (
        <label key={opt} className="radio-row">
          <input
            type="radio"
            name={name}
            checked={selected === opt}
            onChange={() => setSelected(opt)}
          />
          <span className={"radio-dot" + (selected === opt ? " selected" : "")}>
            {selected === opt && <span className="radio-inner" />}
          </span>
          <span className="radio-label">{opt}</span>
        </label>
      ))}
    </div>
  );
}

export default RadioGroup;
