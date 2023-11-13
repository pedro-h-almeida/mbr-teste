import { Fragment } from 'react';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';


export default function FinalizarAtividadeStep({ respostasUsuario, atividadesData }) {

  return (
    <Fragment>
      <Typography variant="h5" style={{ paddingBottom: "1.5rem", textAlign: "center" }} >
        Estas foram as suas escolhas, deseja finalizar as atividades?
      </Typography>
      <List style={{ backgroundColor: "rgb(250,250,250)", borderRadius: 20, overflow: 'hidden' }}>
        {respostasUsuario.map((element, index) => {
          const atividadeObj = atividadesData.find(x => x.idAtividade === element.idAtividade);
          if (atividadeObj) {
            const alternativaObj = atividadeObj.alternativas.find(x => x.idAlternativa === element.idAlternativa);
            const alternativaIndex = atividadeObj.alternativas.findIndex(x => x.idAlternativa === element.idAlternativa);

            const atividadeDesc = `${index + 1}) ${atividadeObj.descAtividade}`;
            const alternativaDesc = `${alternativaIndex === 0 ? 'A' : alternativaIndex === 1 ? 'B' : alternativaIndex === 2 ? 'C' : 'D'} - ${alternativaObj.descAlternativa}`
            return (
              <Fragment key={index}>
                {index === 0 ? (
                  <Divider />
                ) : ""}
                <ListItem sx={{ pb: 0 }}>
                  <ListItemText primary={atividadeDesc} />
                </ListItem>
                <List disablePadding>
                  <ListItem sx={{ pl: 4, }}>
                    <ListItemText primary={alternativaDesc} />
                  </ListItem>
                </List>
                {index !== respostasUsuario.length ? (
                  <Divider />
                ) : ""}
              </Fragment>
            );
          }
        })}
      </List>
    </Fragment>
  )
}