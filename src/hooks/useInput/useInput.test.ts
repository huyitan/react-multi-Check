import { act, renderHook } from "@testing-library/react";
import { useInput } from "./useInput";

describe("useUncontrolled", () => {
  it("returns default value for initial uncontrolled input state", () => {
    const hook = renderHook(() =>
      useInput({
        value: undefined,
        defaultValue: "default-value",
      })
    ).result.current;

    expect(hook[0]).toBe("default-value");
  });

  it("supports uncontrolled input state", () => {
    const hook = renderHook(() => useInput({ defaultValue: "default-value" }));

    act(() => hook.result.current[1]("new-value"));

    expect(hook.result.current[0]).toBe("new-value");
  });

  it("calls onChange with uncontrolled input state", () => {
    const spy = jest.fn();
    const hook = renderHook(() =>
      useInput({ defaultValue: "default-value", onChange: spy })
    );

    act(() => hook.result.current[1]("new-value"));

    expect(spy).toHaveBeenCalledWith("new-value");
  });

  it("supports controlled input state", () => {
    const spy = jest.fn();
    const hook = renderHook(() =>
      useInput({ value: "controlled-value", onChange: spy })
    );

    act(() => hook.result.current[1]("new-value"));

    expect(hook.result.current[0]).toBe("controlled-value");

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("new-value");
  });
});
