import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';



export default function ShowScore({ score }) {

  const router = useRouter();

  return (
    <Fragment>
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="h6" style={{ textAlign: "center" }} >
          Olá {localStorage.getItem("nome")}, seu Score foi de {score}
        </Typography>
      </Grid>
      <Grid item style={{ paddingTop: "2rem" }}>
        <Button variant="contained" onClick={() => router.push(`/aluno`)}>Voltar</Button>
      </Grid>
    </Grid>
  </Fragment>
  )
}