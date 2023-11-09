'use client'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useState, useEffect } from 'react';
import styles from './page.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchWrapper } from '../utils/fetch';




export default function Aluno() {
  const [nome, setNome] = useState("")
  const [livro, setLivro] = useState(0)
  const [serie, setSerie] = useState(0)
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setLoading] = useState(true)
  const [livrosData, setLivrosData] = useState([]);
  const [seriesData, setSeriesData] = useState([])

  const router = useRouter();
  const steps = ['Nome', 'Livro', 'Série'];

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/livros`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setLivrosData(data.results);
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/series`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setSeriesData(data.results);
            setLoading(false)
          }).catch((err) => console.log(err))
      }).catch((err) => console.log(err))
  }, [])


  // ---------------------------------------------------------------
  // Handles

  const handleLivroChange = (event, newLivroId) => {
    if (newLivroId !== null) {
      setLivro(newLivroId);
    }
  };

  const handleSerieChange = (event) => {
    setSerie(event.target.value);
  };

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

  // ---------------------------------------------------------------
  // Components

  // Step 1 \\\\--\\\\ activeStep === 0
  const nomeStep = () => {
    return (
      <Fragment>
        <Typography variant="h5" style={{ paddingBottom: "1.5rem" }} >
          Gostariamos de saber seu nome:
        </Typography>
        <TextField
          id="outlined-controlled"
          label="Nome"
          value={nome}
          onChange={(event) => {
            setNome(event.target.value);
          }}
        />
      </Fragment>
    )
  };

  // Step 2 \\\\--\\\\ activeStep === 1
  const livroStep = () => {
    return (
      <Fragment>
        <Typography variant="h5" style={{ paddingBottom: "1.5rem" }} >
          Qual livro você está cursando?
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={livro}
          exclusive
          onChange={handleLivroChange}
          aria-label="Livro"
        >
          {livrosData.map((element, index) => {
            return (
              <ToggleButton key={element.value} value={element.value}>
                <Image
                  src={element.img}
                  alt=""
                  width={40}
                  height={40}
                  priority
                  style={{ marginRight: 5 }}
                />
                {element.label}
              </ToggleButton>
            );
          })}

        </ToggleButtonGroup>
      </Fragment>
    )
  };

  // Step 3 \\\\--\\\\ activeStep === 2
  const serieStep = () => {
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
            onChange={handleSerieChange}
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
  };

  // Step 3 \\\\--\\\\ activeStep === 3
  // Stepe adicional apenas para confirmar os dados dos steps anteriores
  const confirmarDadosStep = () => {
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
            Livro: {livrosData.find(x => x.value === livro).label}
          </Typography>
        ) : ""}
        {serie !== 0 ? (
          <Typography sx={{ mt: 2, mb: 1 }}>
            Série: {seriesData.find(x => x.value === serie).label}
          </Typography>
        ) : ""}
      </Fragment>
    )
  };
  // ---------------------------------------------------------------


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
            Olá, precisamos de algumas informações antes de proseguir!
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
                    // Step Nome 
                    nomeStep()
                  ) : (activeStep === 1 ? (
                    // Step Livro
                    livroStep()
                  ) : (activeStep === 2 ? (
                    // Step Série
                    serieStep()
                  ) : (
                    // Confirmar dados Step
                    confirmarDadosStep()
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