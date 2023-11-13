'use client'
import { useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import styles from './page.module.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import MobileStepper from '@mui/material/MobileStepper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

import ErroConexao from './components/ErroConexao';
import FinalizarAtividadeStep from './components/FinalizarAtividadeStep';
import ShowScore from './components/ShowScore';


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


export default function Aluno() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAtividadeDone, setIsAtividadeDone] = useState(false);
  const [isLoading, setLoading] = useState(true)
  const [connectionError, setConnectionError] = useState(false);
  const [atividadesData, setAtividadesData] = useState([]);
  const [respostasCorretas, setRespostasCorretas] = useState([]);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [value4, setValue4] = useState(null);
  const [value5, setValue5] = useState(null);

  const searchParams = useSearchParams()

  const livroId = searchParams.get('livro')
  const serieId = searchParams.get('serie')

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/atividades/${livroId}/${serieId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAtividadesData(data.data);
        setRespostasCorretas(data.respostasCorretas);
        setLoading(false)
        setConnectionError(false)
      }).catch((err) => {
        console.log(err)
        setLoading(false)
        setConnectionError(true)
      })
  }, [livroId, serieId])

  // ---------------------------------------------------------------
  // Handles

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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
  // ---------------------------------------------------------------


  const finalizarAtividades = () => {
    setIsAtividadeDone(true);
  }

  const calcScore = () => {
    let respostasCertasCount = 0;

    for (const element of respostasUsuario) {
      const respostaCorretaObj = respostasCorretas.find(x => x.idAtividade === element.idAtividade)
      if (respostaCorretaObj) {
        if (element.idAlternativa === respostaCorretaObj.idAlternativa) {
          respostasCertasCount += 1;
        }
      }
    }

    return `${respostasCertasCount} / ${atividadesData.length}`
  }

  if (isLoading) return (
    <Box className={styles.main} style={{ placeContent: "center" }} >
      <CircularProgress style={{ width: "7rem", height: "7rem" }} />
    </Box>
  )
  if (atividadesData.length === 0) return (
    <ErroConexao connectionError={connectionError} />
  )

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

            <CardContent>
              {isAtividadeDone ? (
                <ShowScore score={calcScore()} />
              ) : (
                <Fragment>
                  {/* 
                    Header do stepper
                  */}
                  <Box id="stepper-header" className={styles.stepperHeader}>
                    <MobileStepper
                      variant="dots"
                      steps={atividadesData.length}
                      position="static"
                      activeStep={activeStep}
                    />
                  </Box>
                  <Divider />
                  {/* 
                   Body do stepper
                  */}
                  <Box id="stepper-body" className={styles.stepperBody}>
                    {activeStep === atividadesData.length ?
                      <FinalizarAtividadeStep respostasUsuario={respostasUsuario} atividadesData={atividadesData} /> :
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
                            <FormControlLabel className={styles.alternativaRadio} value={0} control={<Radio />} label={`A - ${atividadesData[activeStep].alternativas[0].descAlternativa}`} />
                            <FormControlLabel className={styles.alternativaRadio} value={1} control={<Radio />} label={`B - ${atividadesData[activeStep].alternativas[1].descAlternativa}`} />
                            <FormControlLabel className={styles.alternativaRadio} value={2} control={<Radio />} label={`C - ${atividadesData[activeStep].alternativas[2].descAlternativa}`} />
                            <FormControlLabel className={styles.alternativaRadio} value={3} control={<Radio />} label={`D - ${atividadesData[activeStep].alternativas[3].descAlternativa}`} />
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
                      {activeStep === atividadesData.length ? (
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
                </Fragment>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box >
  )
}