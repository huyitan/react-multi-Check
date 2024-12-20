import { useInput } from "../../hooks/useInput";
import "./Checkbox.css";

import React, { memo } from "react";

export interface CheckboxProps
  extends Omit<React.ComponentProps<"input">, "onChange"> {
  label?: React.ReactNode;
  onChange?: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  defaultChecked,
  onChange,
  ...props
}) => {
  const [_checked, handleChange] = useInput<boolean>({
    value: checked,
    defaultValue: defaultChecked,
    onChange,
  });

  return (
    <label className="Checkbox-wrapper">
      <input
        className="Checkbox-input"
        checked={checked}
        onChange={(event) => {
          handleChange(event.currentTarget.checked);
        }}
        {...props}
        type="checkbox"
      />
      {label && <span className="Checkbox-label">{label}</span>}
    </label>
  );
};

export default memo(Checkbox);
