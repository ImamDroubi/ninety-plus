import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function SelectStream() {
  return (
    <SelectSmall/>
  )
}

export  function SelectAutoWidth() {
  const [stream, setStream] = React.useState('');

  const handleChange = (event) => {
    setStream(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">الفرع</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={stream}
          onChange={handleChange}
          autoWidth
          label="الفرع"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>العلمي</MenuItem>
          <MenuItem value={21}>الأدبي</MenuItem>
          <MenuItem value={22}>الصناعي</MenuItem>
          <MenuItem value={22}>التجاري</MenuItem>
          <MenuItem value={22}>الزراعي</MenuItem>
          <MenuItem value={22}>الفندقي</MenuItem>
          <MenuItem value={22}>الشرعي</MenuItem>
          <MenuItem value={22}>التكنولوجي</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}


export  function SelectSmall() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">الفرع</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={10}>العلمي</MenuItem>
        <MenuItem value={21}>الأدبي</MenuItem>
        <MenuItem value={22}>الصناعي</MenuItem>
        <MenuItem value={22}>التجاري</MenuItem>
        <MenuItem value={22}>الزراعي</MenuItem>
        <MenuItem value={22}>الفندقي</MenuItem>
        <MenuItem value={22}>الشرعي</MenuItem>
        <MenuItem value={22}>التكنولوجي</MenuItem>
      </Select>
    </FormControl>
  );
}
