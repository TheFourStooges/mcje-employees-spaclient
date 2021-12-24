import React, { useEffect } from "react";
import { FormLabel, Slider } from "@mui/material";
import { Controller } from "react-hook-form";

const FormInputSlider = ({
  name,
  control,
  setValue,
  label,
}) => {
  const [sliderValue, setSliderValue] = React.useState<number>(30);

  useEffect(() => {
    if (sliderValue) setValue(name, sliderValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderValue]);

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  return (
    <>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <Slider
            value={sliderValue}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            step={1}
          />
        )}
      />
    </>
  );
};

export default FormInputSlider;