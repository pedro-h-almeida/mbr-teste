'use client'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MobileStepper from '@mui/material/MobileStepper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useState } from 'react';
import styles from './page.module.css';





const atividadesData = [
  {
    idAtividade: 1,
    descAtividade: "Descrição Atividade 1",
    alternativas: [
      {
        idAlternativa: 1,
        decAlternativa: "Desc Alt 1"
      },
      {
        idAlternativa: 2,
        decAlternativa: "Desc Alt 2"
      },
      {
        idAlternativa: 3,
        decAlternativa: "Desc Alt 3 (Certa)"
      },
      {
        idAlternativa: 4,
        decAlternativa: "Desc Alt 4"
      }
    ]
  },
  {
    idAtividade: 2,
    descAtividade: "Descrição Atividade 2",
    alternativas: [
      {
        idAlternativa: 5,
        decAlternativa: "Desc Alt 1 (Certa)"
      },
      {
        idAlternativa: 6,
        decAlternativa: "Desc Alt 2"
      },
      {
        idAlternativa: 7,
        decAlternativa: "Desc Alt 3"
      },
      {
        idAlternativa: 8,
        decAlternativa: "Desc Alt 4"
      }
    ]
  },
  {
    idAtividade: 3,
    descAtividade: "Descrição Atividade 3",
    alternativas: [
      {
        idAlternativa: 9,
        decAlternativa: "Desc Alt 1"
      },
      {
        idAlternativa: 10,
        decAlternativa: "Desc Alt 2"
      },
      {
        idAlternativa: 11,
        decAlternativa: "Desc Alt 3"
      },
      {
        idAlternativa: 12,
        decAlternativa: "Desc Alt 4 (Certa)"
      }
    ]
  },
  {
    idAtividade: 4,
    descAtividade: "Descrição Atividade 4",
    alternativas: [
      {
        idAlternativa: 13,
        decAlternativa: "Desc Alt 1"
      },
      {
        idAlternativa: 14,
        decAlternativa: "Desc Alt 2 (Certa)"
      },
      {
        idAlternativa: 15,
        decAlternativa: "Desc Alt 3"
      },
      {
        idAlternativa: 16,
        decAlternativa: "Desc Alt 4"
      }
    ]
  },
  {
    idAtividade: 5,
    descAtividade: "Descrição Atividade 5",
    alternativas: [
      {
        idAlternativa: 17,
        decAlternativa: "Desc Alt 1"
      },
      {
        idAlternativa: 18,
        decAlternativa: "Desc Alt 2 (Certa)"
      },
      {
        idAlternativa: 19,
        decAlternativa: "Desc Alt 3"
      },
      {
        idAlternativa: 20,
        decAlternativa: "Desc Alt 4"
      }
    ]
  },
]


const respostasUsuario = [
  {
    idAtividade: -1,
    idAlternativa: -1,
  },
  {
    idAtividade: -1,
    idAlternativa: -1,
  },
  {
    idAtividade: -1,
    idAlternativa: -1,
  },
  {
    idAtividade: -1,
    idAlternativa: -1,
  },
  {
    idAtividade: -1,
    idAlternativa: -1,
  },
]

const respostasCorretas = [
  {
    idAtividade: 1,
    idAlternativa: 3,
  },
  {
    idAtividade: 2,
    idAlternativa: 5,
  },
  {
    idAtividade: 3,
    idAlternativa: 12,
  },
  {
    idAtividade: 4,
    idAlternativa: 14,
  },
  {
    idAtividade: 5,
    idAlternativa: 18,
  },
]





export default function Aluno() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAtividadeDone, setIsAtividadeDone] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams()

  const livroId = searchParams.get('livro')
  const serieId = searchParams.get('serie')

  // ---------------------------------------------------------------
  // Controles do stepper

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const finalizarAtividades = () => {
    setIsAtividadeDone(true);
  }

  // ---------------------------------------------------------------


  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const [value5, setValue5] = useState(null);


  const handleValue = () => {
    if (activeStep === 0) {
      return value1;
    }
    if (activeStep === 1) {
      return value2;
    }
    if (activeStep === 2) {
      return value3;
    }
    if (activeStep === 3) {
      return value4;
    }
    if (activeStep === 4) {
      return value5;
    }
  };

  const handleChangeValue = (event) => {
    if (activeStep === 0) {
      setValue1(event.target.value);
    }
    if (activeStep === 1) {
      setValue2(event.target.value);
    }
    if (activeStep === 2) {
      setValue3(event.target.value);
    }
    if (activeStep === 3) {
      setValue4(event.target.value);
    }
    if (activeStep === 4) {
      setValue5(event.target.value);
    }
    respostasUsuario[activeStep].idAtividade = atividadesData[activeStep].idAtividade;
    respostasUsuario[activeStep].idAlternativa = atividadesData[activeStep].alternativas[event.target.value].idAlternativa;
  };

  const finalizarAtividadeStep = () => {
    return (
      <Fragment>
        <Typography variant="h5" style={{ paddingBottom: "1.5rem", textAlign: "center" }} >
          Estas foram as suas escolhas, deseja finalizar as atividades?
        </Typography>
        <List style={{ backgroundColor: "rgb(250,250,250)", borderRadius: 20, overflow: 'hidden' }}>
          {respostasUsuario.map((element, index) => {
            console.log(element);
            const atividadeObj = atividadesData.find(x => x.idAtividade === element.idAtividade);
            const alternativaObj = atividadeObj.alternativas.find(x => x.idAlternativa === element.idAlternativa);
            const alternativaIndex = atividadeObj.alternativas.findIndex(x => x.idAlternativa === element.idAlternativa);

            const atividadeDesc = `${index + 1}) ${atividadeObj.descAtividade}`;
            const alternativaDesc = `${alternativaIndex === 0 ? 'A' : alternativaIndex === 1 ? 'B' : alternativaIndex === 2 ? 'C' : 'D'} - ${alternativaObj.decAlternativa}`
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
          })}
        </List>
      </Fragment>
    )
  };

  const calcScore = () => {
    let respostasCertasCount = 0;

    for (const element of respostasUsuario) {
      const idRespostaCerta = respostasCorretas.find(x => x.idAtividade === element.idAtividade).idAlternativa;
      if (element.idAlternativa === idRespostaCerta) {
        respostasCertasCount += 1;
      }
    }

    return `${respostasCertasCount} / 5`
  }

  return (
    <Box className={styles.main} >
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item xs={8}>
          <Card variant="outlined" style={{ borderRadius: 20 }}>

            {
              isAtividadeDone ?
                (
                  <CardContent>
                    <Typography variant="h6" style={{ paddingBottom: "1rem" }} >
                      Seu Score foi de {calcScore()}
                    </Typography>
                  </CardContent>
                ) :
                (
                  <CardContent>
                    {/* 
                    Header do stepper
                    */}
                    <Box id="stepper-header" className={styles.stepperHeader}>
                      <MobileStepper
                        variant="dots"
                        steps={5}
                        position="static"
                        activeStep={activeStep}
                      />
                    </Box>
                    <Divider />
                    {/* 
                   Body do stepper
                    */}
                    <Box id="stepper-body" className={styles.stepperBody}>
                      {activeStep === 5 ?
                        finalizarAtividadeStep() :
                        (
                          <FormControl style={{ width: "100%" }}>
                            <Typography variant="h6" style={{ paddingBottom: "1rem" }} >
                              {`${activeStep + 1}) `} {atividadesData[activeStep].descAtividade}
                            </Typography>
                            <RadioGroup
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="controlled-radio-buttons-group"
                              value={handleValue()}
                              onChange={handleChangeValue}
                            >
                              <FormControlLabel className={styles.alternativaRadio} value={0} control={<Radio />} label={`A - ${atividadesData[activeStep].alternativas[0].decAlternativa}`} />
                              <FormControlLabel className={styles.alternativaRadio} value={1} control={<Radio />} label={`B - ${atividadesData[activeStep].alternativas[1].decAlternativa}`} />
                              <FormControlLabel className={styles.alternativaRadio} value={2} control={<Radio />} label={`C - ${atividadesData[activeStep].alternativas[2].decAlternativa}`} />
                              <FormControlLabel className={styles.alternativaRadio} value={3} control={<Radio />} label={`D - ${atividadesData[activeStep].alternativas[3].decAlternativa}`} />
                            </RadioGroup>
                          </FormControl>
                        )
                      }

                    </Box>
                    <Divider />
                    {/* 
                    Footer do stepper
                    */}
                    <Box id="stepper-footer" className={styles.stepperFooter}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                          color="inherit"
                          variant="contained"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Voltar
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep === 5 ? (
                          <Button onClick={finalizarAtividades} variant="contained" >
                            Finalizar
                          </Button>
                        ) : (
                          <Button onClick={handleNext} variant="contained" disabled={respostasUsuario[activeStep].idAtividade === -1} >
                            {activeStep === 4 ? 'Confirmar' : 'Próximo'}
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                )
            }


          </Card>
        </Grid>
      </Grid>
    </Box >
  )
}