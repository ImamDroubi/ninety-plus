import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

const allOptions = [
  {
    id: 99,
    name: "المادة كاملة",
  },
];

export default function SelectBookChaptersForm({
  list = [],
  setSelectedOptions,
  selectedOptions = [],
}) {
  const optionsList = [...allOptions, ...list];

  const handleClick = (id) => {
    if (selectedOptions.indexOf(id) === -1) {
      setSelectedOptions([...selectedOptions, id]);
    } else {
      let newList = selectedOptions;
      newList = newList.filter((item) => item !== id);
      setSelectedOptions(newList);
    }
  };
  return (
    <FormGroup>
      {optionsList.map((option) => {
        return (
          <FormControlLabel
            key={option.id}
            checked={selectedOptions.indexOf(option.id) !== -1}
            onChange={() => handleClick(option.id)}
            control={<Checkbox />}
            label={option.name}
          />
        );
      })}
    </FormGroup>
  );
}
