'use client'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MobileStepper from '@mui/material/MobileStepper';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';





const questionarioData = [
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
        decAlternativa: "Desc Alt 3"
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
        decAlternativa: "Desc Alt 1"
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
        decAlternativa: "Desc Alt 4"
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
        decAlternativa: "Desc Alt 2"
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
        decAlternativa: "Desc Alt 2"
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


const respostas = [
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
  const router = useRouter();


  // ---------------------------------------------------------------
  // Controles do stepper

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const confirmarDados = () => {
    console.log("Confirmar Dados");
    router.push('/aluno/questionario');
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
    respostas[activeStep].idAtividade = questionarioData[activeStep].idAtividade;
    respostas[activeStep].idAlternativa = questionarioData[activeStep].alternativas[event.target.value].idAlternativa;
  };

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
                {activeStep === 5 ? '' : (
                  <FormControl>
                    <Typography variant="h6" style={{ paddingBottom: "1rem" }} >
                      {questionarioData[activeStep].descAtividade}
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={handleValue()}
                      onChange={handleChangeValue}
                    >
                      <FormControlLabel value={0} control={<Radio />} label={questionarioData[activeStep].alternativas[0].decAlternativa} />
                      <FormControlLabel value={1} control={<Radio />} label={questionarioData[activeStep].alternativas[1].decAlternativa} />
                      <FormControlLabel value={2} control={<Radio />} label={questionarioData[activeStep].alternativas[2].decAlternativa} />
                      <FormControlLabel value={3} control={<Radio />} label={questionarioData[activeStep].alternativas[3].decAlternativa} />
                    </RadioGroup>
                  </FormControl>
                )}

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
                    <Button onClick={confirmarDados} variant="contained" >
                      Confirmar Dados
                    </Button>
                  ) : (
                    <Button onClick={handleNext} variant="contained" >
                      {activeStep === 4 ? 'Finalizar' : 'Próximo'}
                    </Button>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box >
  )
}