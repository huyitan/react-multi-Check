import { useState } from "react";

interface IUseInput<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T, ...payload: any[]) => void;
}

export const useInput = <T>({
  value,
  defaultValue,
  onChange = () => {},
}: IUseInput<T>): [T, (value: T, ...payload: any[]) => void] => {
  // support both Uncontrolled/controlled input state
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const handleUncontrolledChange = (val: T, ...payload: any[]) => {
    setUncontrolledValue(val);
    onChange?.(val, ...payload);
  };

  if (value !== undefined) {
    return [value as T, onChange];
  }

  return [uncontrolledValue as T, handleUncontrolledChange];
};
