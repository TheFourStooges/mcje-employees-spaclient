import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

// const options = [
//   {
//     label: "Dropdown Option 1",
//     value: "1",
//   },
//   {
//     label: "Dropdown Option 2",
//     value: "2",
//   },
// ];

const FormInputDropdown = ({ name, control, label, options, ...rest }) => {
  const generateSingleOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl size={'medium'} fullWidth variant='standard'>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value}>
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};

export default FormInputDropdown;