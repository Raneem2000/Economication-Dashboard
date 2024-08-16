import React from "react";
import Select from "react-select";
import styled from "styled-components";

const customStyles = {
  control: (provided) => ({
    ...provided,
    minHeight: "30px",
    margin: "-10px 8px 0 0",
    height: "auto",
    fontSize: "14px",
    borderRadius: "5px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "auto",
    padding: "0 6px",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "auto",
  }),
  clearIndicator: (provided) => ({
    ...provided,
    padding: "5px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "5px",
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#e0f7fa",
    borderRadius: "5px",
    margin: "2px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    fontSize: "14px",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    fontSize: "14px",
  }),
  menu: (provided) => ({
    ...provided,
    fontSize: "14px",
    borderRadius: "5px",
    zIndex: 9999,
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "200px",
    overflowY: "auto",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#e0f7fa" : "white",
    color: "black",
    fontSize: "14px",
    padding: "5px 10px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#b2ebf2",
    },
  }),
};

const Container = styled.div`
  width: 300px;
  margin: 10px 0;
`;

const options = [
  {
    value: { is_active: "all", is_subscriber: "all", is_online: "all" },
    label: "الكل",
  },
  {
    value: { is_active: "1", is_subscriber: "all", is_online: "all" },
    label: "المستخدمون الغير محظورون",
  },
  {
    value: { is_active: "0", is_subscriber: "all", is_online: "all" },
    label: "المستخدمون المحظورون",
  },
  {
    value: { is_active: "all", is_subscriber: "1", is_online: "all" },
    label: "المستخدمون المشتركون",
  },
  {
    value: { is_active: "all", is_subscriber: "0", is_online: "all" },
    label: "المستخدمون الغير مشتركون",
  },
  {
    value: { is_active: "all", is_subscriber: "all", is_online: "1" },
    label: "المستخدمون النشطون",
  },
  {
    value: { is_active: "all", is_subscriber: "all", is_online: "0" },
    label: "المستخدمون الغير نشطون",
  },
  { value: "deleted", label: "المستخدمون المحذوفون" },
];

const MultiSelect = ({ onChange }) => {
  const handleChange = (selected) => {
    onChange(selected);
  };

  return (
    <Container>
      <Select
        isMulti
        name="filters"
        options={options}
        onChange={handleChange}
        styles={customStyles}
        placeholder="فلترة المستخدمين"
      />
    </Container>
  );
};

export default MultiSelect;
