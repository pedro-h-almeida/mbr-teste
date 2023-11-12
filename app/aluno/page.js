'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

import ConfirmarDadosStep from './components/ConfirmarDadosStep';
import LivrosStep from './components/LivrosStep';
import NomeStep from './components/NomeStep';
import SeriesStep from './components/SeriesStep';




export default function Aluno() {
  const [nome, setNome] = useState("")
  const [livro, setLivro] = useState(0)
  const [serie, setSerie] = useState(0)
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setLoading] = useState(true)
  const [livrosData, setLivrosData] = useState([
    {
      "value": 1,
      "label": "Português",
      "img": "/brasil.png"
    },
    {
      "value": 2,
      "label": "Inglês",
      "img": "/estados-unidos.png"
    },
    {
      "value": 3,
      "label": "Espanhol",
      "img": "/espanha.png"
    }
  ]);
  const [seriesData, setSeriesData] = useState([
    {
      "value": 1,
      "label": "1ª Serie"
    },
    {
      "value": 2,
      "label": "2ª Serie"
    },
    {
      "value": 3,
      "label": "3ª Serie"
    },
    {
      "value": 4,
      "label": "4ª Serie"
    },
    {
      "value": 5,
      "label": "5ª Serie"
    }
  ])

  const router = useRouter();
  const steps = ['Nome', 'Livro', 'Série'];

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/livros`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        if (data.results.length > 0) {
          setLivrosData(data.results);
        }
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/series`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.results.length > 0) {
              setSeriesData(data.results);
            }
            setLoading(false)
          }).catch((err) => {
            console.log(err)
            setLoading(false)
          })
      }).catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [])


  // ---------------------------------------------------------------
  // Handles

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // ---------------------------------------------------------------

  const checkStepDone = () => {
    if (activeStep === 0) {
      if (nome !== "") {
        return false
      }
    }
    if (activeStep === 1) {
      if (livro !== 0) {
        return false
      }
    }
    if (activeStep === 2) {
      if (serie !== 0) {
        return false;
      }
    }
    return true
  }

  const confirmarDados = () => {
    localStorage.setItem("nome", nome)
    router.push(`/aluno/atividades?livro=${livro}&serie=${serie}`);
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
        <Grid item xs={10} style={{ marginTop: "5rem" }}>
          <Typography style={{ textAlign: 'center' }} variant="h4">
            Olá, precisamos de algumas informações antes de prosseguir!
          </Typography>
        </Grid>
        <Grid item xs={8}>
          {isLoading ? (
            <Box style={{ placeContent: "center", display: "flex" }} >
              <CircularProgress style={{ width: "7rem", height: "7rem" }} />
            </Box>
          ) : (
            <Card variant="outlined" style={{ borderRadius: 20 }}>
              <CardContent>
                {/* 
                  Header do stepper
                */}
                <Box id="stepper-header" className={styles.stepperHeader}>
                  <Stepper activeStep={activeStep} >
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};

                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </Box>
                <Divider />
                {/* 
                  Body do stepper
                */}
                <Box id="stepper-body" className={styles.stepperBody}>
                  {activeStep === 0 ? (
                    // Step 1 - Nome  \\\\--\\\\ activeStep === 0
                    <NomeStep nome={nome} setNome={setNome} />
                  ) : (activeStep === 1 ? (
                    // Step 2 - Livro \\\\--\\\\ activeStep === 1
                    <LivrosStep livro={livro} setLivro={setLivro} livrosData={livrosData} />
                  ) : (activeStep === 2 ? (
                    // Step 3 - Série \\\\--\\\\ activeStep === 2
                    <SeriesStep serie={serie} setSerie={setSerie} seriesData={seriesData} />
                  ) : (
                    // Step 4 - Confirmar Dados \\\\--\\\\ activeStep === 3
                    // Step adicional apenas para confirmar os dados dos steps anteriores
                    <ConfirmarDadosStep nome={nome} livro={livrosData.find(x => x.value === livro).label} serie={seriesData.find(x => x.value === serie).label} />
                  )))}
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
                    {activeStep === steps.length ? (
                      <Button onClick={confirmarDados} variant="contained" >
                        Confirmar Dados
                      </Button>
                    ) : (
                      <Button onClick={handleNext} variant="contained" disabled={checkStepDone()}>
                        {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                      </Button>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box >
  )
}