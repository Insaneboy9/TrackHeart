import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function DropdownList({
  title,
  options,
  label,
  register,
  value,
  defaultValue,
}) {
  return (
    <Box sx={{ minWidth: 120, mb: 3 }}>
      <FormControl fullWidth>
        <InputLabel className="mb-5" id="demo-simple-select-label">
          {title}
        </InputLabel>
        <Select
          defaultValue={defaultValue}
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          {...register(`${label}`, {
            required: "This field is required",
          })}
        >
          {options.map((option, index) => (
            <MenuItem
              key={index}
              {...register(`${label}`, {
                required: "This field is required",
              })}
              value={value[index]}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default DropdownList;
