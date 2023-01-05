import { FC, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const FilterSelect: FC = () => {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
      <InputLabel id="demo-select-small">Sort</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        label="age"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>A-Z</MenuItem>
        <MenuItem value={20}>Lowest Price</MenuItem>
        <MenuItem value={30}>Highest Price</MenuItem>
        <MenuItem value={40}>Best Rating</MenuItem>
        <MenuItem value={50}>Most Reviews</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
