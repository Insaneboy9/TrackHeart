import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";

function RadioButton({ title, label, register, options, value }) {
  return (
    <div className="mb-5">
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">{title}</FormLabel>
        <RadioGroup
          defaultValue={value}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              {...register(`${label}`, {
                required: "This field is required",
              })}
              value={index}
              control={<Radio required={true} />}
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default RadioButton;
