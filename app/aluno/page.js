'use client'

import { useState, Fragment } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Image from 'next/image'

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import styles from './page.module.css';


const steps = ['Nome', 'Livro', 'Série'];

const seriesData = [
  {
    value: 1,
    label: "1ª Serie"
  },
  {
    value: 2,
    label: "2ª Serie"
  },
  {
    value: 3,
    label: "3ª Serie"
  },
  {
    value: 4,
    label: "4ª Serie"
  },
  {
    value: 5,
    label: "5ª Serie"
  }
]


export default function Aluno() {
  const [nome, setNome] = useState("")
  const [livro, setLivro] = useState(0)
  const [serie, setSerie] = useState(0)

  const handleLivroChange = (event, newLivroId) => {
    if (newLivroId !== null) {
      setLivro(newLivroId);
    }
  };

  const handleSerieChange = (event) => {
    setSerie(event.target.value);
  };






  const [activeStep, setActiveStep] = useState(0);




  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setNome("");
    setLivro(0);
    setSerie(0);
    setActiveStep(0);
  };

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
    console.log("Confirmar Dados");
  }


  const nomeStep = (
    <Fragment>
      <TextField
        id="outlined-controlled"
        label="Nome"
        value={nome}
        onChange={(event) => {
          setNome(event.target.value);
        }}
      />
    </Fragment>
  );


  const livroStep = (
    <Fragment>
      <ToggleButtonGroup
        color="primary"
        value={livro}
        exclusive
        onChange={handleLivroChange}
        aria-label="Livro"
      >
        <ToggleButton value="1">
          <Image
            src="/brasil.png"
            alt=""
            width={40}
            height={40}
            priority
            style={{ marginRight: 5 }}
          />
          Português
        </ToggleButton>
        <ToggleButton value="2">
          <Image
            src="/estados-unidos.png"
            alt=""
            width={40}
            height={40}
            priority
            style={{ marginRight: 5 }}
          />
          Inglês
        </ToggleButton>
        <ToggleButton value="3">
          <Image
            src="/espanha.png"
            alt=""
            width={40}
            height={40}
            priority
            style={{ marginRight: 5 }}
          />
          Espanhol
        </ToggleButton>
      </ToggleButtonGroup>
    </Fragment>
  );

  const serieStep = (
    <Fragment>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Série</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={serie}
          label="Série"
          onChange={handleSerieChange}
        >
          {seriesData.map((element, index) => {
            return (
              <MenuItem key={element.value} value={element.value}>{element.label}</MenuItem>
            );
          })}
          {/* <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </Fragment>
  );


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
          <Typography style={{ textAlign: 'center' }} variant="h5">
            Olá, precisamos de algumas informações antes de proseguir!
          </Typography>
        </Grid>
        <Grid item xs={8}>


          <Card variant="outlined" style={{ borderRadius: 20 }}>
            <CardContent>
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

              <Box className={styles.stepperBox}>

                {activeStep === 0 ? (
                  // Step Nome 
                  nomeStep
                ) : (activeStep === 1 ? (
                  // Step Livro
                  livroStep
                ) : (activeStep === 2 ? (
                  // Step Série
                  serieStep
                ) : (
                  // Stepper Finalizado
                  <Fragment>
                  </Fragment>
                )))}

              </Box>

              {activeStep === steps.length ? (
                <Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Nome: {nome}
                  </Typography>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Livro: {livro}
                  </Typography>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Série: {serie}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button onClick={handleReset}>Reset</Button>

                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button
                      color="inherit"
                      variant="contained"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Voltar
                    </Button>
                    <Button onClick={confirmarDados} variant="contained" >
                      Confirmar Dados
                    </Button>
                  </Box>
                  {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box> */}
                </Fragment>
              ) : (
                <Fragment>
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
                    <Button onClick={handleNext} variant="contained" disabled={checkStepDone()}>
                      {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                    </Button>
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