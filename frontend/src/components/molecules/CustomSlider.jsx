import { Box, Slider } from '@mui/material';

const CustomSlider = ({
  labels,
  max,
  min,
  step,
  defaultValue,
  handleChange,
}) => {
  return (
    <>
      <Slider
        defaultValue={defaultValue}
        valueLabelDisplay='auto'
        step={step}
        onChange={handleChange}
        marks
        min={min}
        max={max}
      />
      <Box display='flex' justifyContent='space-between'>
        {labels.map((label, index) => (
          <div key={index} className='label-item'>
            {label}
          </div>
        ))}
      </Box>
    </>
  );
};

export default CustomSlider;
