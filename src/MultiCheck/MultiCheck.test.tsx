import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MultiCheck, Option } from "./MultiCheck";

describe("MultiCheck", () => {
  const options: Option[] = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Option 4", value: "option4" },
  ];

  it("renders the label if label provided", () => {
    render(<MultiCheck label="label" options={options} />);
    expect(screen.getByText("label")).toBeInTheDocument();
  });

  it("renders correctly with no options", () => {
    render(<MultiCheck options={[]} />);
    expect(screen.getByText("No Options")).toBeInTheDocument();
  });

  it("renders the correct number of checkboxes including Select All", () => {
    render(<MultiCheck options={options} columns={2} />);
    expect(screen.getByLabelText("Select All")).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  it("handles Select All functionality correctly", () => {
    render(<MultiCheck options={options} />);

    const selectAllCheckbox = screen.getByLabelText("Select All");
    fireEvent.click(selectAllCheckbox);

    options.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeChecked();
    });

    fireEvent.click(selectAllCheckbox);
    options.forEach((option) => {
      expect(screen.getByLabelText(option.label)).not.toBeChecked();
    });
  });

  it("checks and unchecks individual options", () => {
    render(<MultiCheck options={options} />);

    const optionCheckbox = screen.getByLabelText("Option 1");
    fireEvent.click(optionCheckbox);
    expect(optionCheckbox).toBeChecked();

    fireEvent.click(optionCheckbox);
    expect(optionCheckbox).not.toBeChecked();
  });

  it("calls onChange when an option is selected or deselected", () => {
    const handleChange = jest.fn();
    render(<MultiCheck options={options} onChange={handleChange} />);

    const optionCheckbox = screen.getByLabelText("Option 1");
    fireEvent.click(optionCheckbox);
    expect(handleChange).toHaveBeenCalledWith([
      { label: "Option 1", value: "option1" },
    ]);

    fireEvent.click(optionCheckbox);
    expect(handleChange).toHaveBeenCalledWith([]);
  });
});
