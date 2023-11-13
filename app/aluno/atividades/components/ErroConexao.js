import styles from '../page.module.css';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';



export default function ErroConexao({ connectionError }) {

  const router = useRouter();

  return (
    <Box className={styles.main} >
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h4" style={{ paddingBottom: "1rem", textAlign: "center" }} >
            {connectionError ? 'Erro de Conexão, não foi possível trazer as atividades' : 'Nenhuma atividade cadastrada!'}
          </Typography>
        </Grid>
        <Grid item style={{ padding: "4rem" }}>
          <Button variant="contained" onClick={() => router.push(`/aluno`)}>Voltar</Button>
        </Grid>
      </Grid>
    </Box>
  )
}