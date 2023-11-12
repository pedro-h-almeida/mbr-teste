import { Fragment } from 'react';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';


export default function NomeStep({ nome, setNome }) {

  const handleChange = (event) => {
    setNome(event.target.value);
  };

  return (
    <Fragment>
      <Fragment>
        <Typography variant="h5" style={{ paddingBottom: "1.5rem" }} >
          Qual o seu nome?
        </Typography>
        <TextField
          id="outlined-controlled"
          label="Nome"
          value={nome}
          onChange={handleChange}
        />
      </Fragment>
    </Fragment>
  )
}