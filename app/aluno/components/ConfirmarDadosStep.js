import { Fragment } from 'react';

import Typography from '@mui/material/Typography';


export default function ConfirmarDadosStep({ nome, livro, serie }) {

  return (
    <Fragment>
      <Typography variant="h5" style={{ paddingBottom: "1.5rem" }} >
        Seus dados estão corretos?
      </Typography>
      {nome !== "" ? (
        <Typography sx={{ mb: 1 }}>
          Nome: {nome}
        </Typography>
      ) : ""}
      {livro !== 0 ? (
        <Typography sx={{ mt: 2, mb: 1 }}>
          Livro: {livro}
        </Typography>
      ) : ""}
      {serie !== 0 ? (
        <Typography sx={{ mt: 2, mb: 1 }}>
          Série: {serie}
        </Typography>
      ) : ""}
    </Fragment>
  )
}