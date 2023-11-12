import { Fragment } from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';


export default function SeriesStep({ serie, setSerie, seriesData }) {

  const handleChange = (event) => {
    setSerie(event.target.value);
  };


  return (
    <Fragment>
      <Typography variant="h5" style={{ paddingBottom: "1.5rem" }} >
        Em que série você está?
      </Typography>
      <FormControl style={{ width: "40%" }}>
        <InputLabel id="demo-simple-select-label">Série</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={serie}
          label="Série"
          onChange={handleChange}
        >
          <MenuItem value={0} />
          {seriesData.map((element, index) => {
            return (
              <MenuItem key={element.value} value={element.value}>{element.label}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Fragment>
  )
}