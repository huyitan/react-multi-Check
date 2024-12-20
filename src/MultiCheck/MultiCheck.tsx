import "./MultiCheck.css";

import React, { useEffect, useMemo, useState } from "react";
import { FC } from "react";
import distributeOptions from "../utils/distributeOptions";
import Check from "./Check";

export type Option = {
  label: string;
  value: string;
};

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. All the options (including the "Select All") should be split into several columns, and the order is from top to bottom in each column
 */
type Props = {
  // the label text of the whole component
  label?: string;
  // Assume no duplicated labels or values
  // It may contain any values, so be careful for you "Select All" option
  options: Option[];
  // Always be non-negative integer.
  // The default value is 1
  // 0 is considered as 1
  // We only check [0, 1, 2, ... 10], but it should work for greater number
  columns?: number;
  // Which options should be selected.
  // - If `undefined`, makes the component in uncontrolled mode with no default options checked, but the component is still workable;
  // - if not undefined, it's considered as the default value to render the component. And when it changes, it will be considered as the NEW default value to render the component again
  // - Assume no duplicated values.
  // - It may contain values not in the options.
  values?: string[];
  // if not undefined, when checked options are changed, they should be passed to outside
  // if undefined, the options can still be selected, but won't notify the outside
  onChange?: (options: Option[]) => void;
};

const SelectAllId = "#select-all";

export const MultiCheck: FC<Props> = ({
  label,
  options,
  columns,
  values,
  onChange,
}) => {
  const _columns = columns || 1;
  const [uncontrolledValues, setUncontrolledValues] = useState(values || []);

  useEffect(() => {
    setUncontrolledValues(values || []);
  }, [values]);

  const layoutConfig = useMemo(() => {
    // create layout include Select All option
    const _options: Option[] = [
      { label: "Select All", value: SelectAllId },
      ...options,
    ];

    return distributeOptions(_options, _columns);
  }, [_columns, options]);

  const handleClickCheckbox = (value: Option["value"], isChecked: boolean) => {
    let selectedOptions = options.filter((option) =>
      uncontrolledValues.includes(option.value)
    );

    if (isChecked) {
      const option = options.find((o) => o.value === value);

      if (option) {
        selectedOptions.push(option);
      }
    } else {
      selectedOptions = selectedOptions.filter((op) => op.value !== value);
    }

    setUncontrolledValues(selectedOptions.map((option) => option.value));
    onChange?.(selectedOptions);
  };

  const handleClickSelectAll = (value: Option["value"], isChecked: boolean) => {
    if (isChecked) {
      setUncontrolledValues(options.map((op) => op.value));
      onChange?.(options);
    } else {
      setUncontrolledValues([]);
      onChange?.([]);
    }
  };

  const isAllChecked = useMemo(() => {
    return options.every((option) => uncontrolledValues.includes(option.value));
  }, [uncontrolledValues, options]);

  const isNoOptions = !options.length;

  return (
    <div className="MultiCheck">
      {label && <div className="MultiCheck-label">{label}</div>}

      <div className="MultiCheck-card">
        {isNoOptions ? (
          <span>No Options</span>
        ) : (
          layoutConfig.map((column, index) => (
            <div className="MultiCheck-column" key={index}>
              {column.map((option) => {
                if (option.value === SelectAllId) {
                  return (
                    <Check
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      checked={isAllChecked}
                      onChange={handleClickSelectAll}
                    />
                  );
                } else
                  return (
                    <Check
                      key={option.value}
                      label={option.label}
                      value={option.value}
                      checked={uncontrolledValues.includes(option.value)}
                      onChange={handleClickCheckbox}
                    />
                  );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
