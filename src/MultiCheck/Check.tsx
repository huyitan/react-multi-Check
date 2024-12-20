import React, { useCallback, useRef } from "react";
import Checkbox, { CheckboxProps } from "../components/Checkbox";
import { Option } from "./MultiCheck";

export interface CheckProps extends Omit<CheckboxProps, "onChange"> {
  value: Option["value"];
  onChange?: (value: Option["value"], isChecked: boolean) => void;
}

const Check: React.FC<CheckProps> = ({ value, onChange, ...props }) => {
  // use ref to avoid unnecessary renders on Check component (memoized component)
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const handleChange = useCallback(
    (isChecked: boolean) => onChangeRef.current?.(value, isChecked),
    []
  );

  return <Checkbox onChange={handleChange} {...props} />;
};

export default Check;
