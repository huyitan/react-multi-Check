import React from "react";
import { render, screen } from "@testing-library/react";
import Checkbox from "./Checkbox";

describe("Checkbox", () => {
  it("renders label if label provided", () => {
    render(<Checkbox label="label" />);
    expect(screen.getByText("label")).toBeInTheDocument();
  });
});
