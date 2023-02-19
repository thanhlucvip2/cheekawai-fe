import React, { useEffect } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { apiImportedProductAxios } from "@Axios/imported-product/api-imported-product";
import { adddate, convertDateTimeToDateString, odddate } from "@Utils/date";
interface Props {
  label: string;
  required?: boolean;
  placeholder: string;
  onList: Function;

  options: {
    value: string;
    label: string;
  }[];
}

const SelectComponent = (props: Props) => {
  const options: {
    value: string;
    label: string;
  }[] = props.options;

  const handleChange = (value: string) => {
    props.onList(value);
  };

  return (
    <div>
      <label className="form-label" htmlFor="input-1">
        {props.label}
        {props.required ? <span style={{ color: "red" }}>*</span> : null}
      </label>
      <Select
        className="select-ant"
        mode="tags"
        style={{ width: "100%" }}
        placeholder={props.placeholder}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};

export default SelectComponent;
