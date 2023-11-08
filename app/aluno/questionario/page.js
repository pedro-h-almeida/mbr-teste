'use client'

import { useState, Fragment } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Image from 'next/image'

import { useRouter } from 'next/navigation';

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

import Divider from '@mui/material/Divider';

import styles from './page.module.css';


const steps = ['Nome', 'Livro', 'Série'];

const livrosData = [
  {
    value: 1,
    label: "Português",
    img: "/brasil.png"
  },
  {
    value: 2,
    label: "Inglês",
    img: "/estados-unidos.png"
  },
  {
    value: 3,
    label: "Espanhol",
    img: "/espanha.png"
  },
]

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
  const [activeStep, setActiveStep] = useState(0);

  const router = useRouter();


  const handleLivroChange = (event, newLivroId) => {
    if (newLivroId !== null) {
      setLivro(newLivroId);
    }
  };

  const handleSerieChange = (event) => {
    setSerie(event.target.value);
  };


  // ---------------------------------------------------------------
  // Controles do stepper

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
  // ---------------------------------------------------------------

  // ---------------------------------------------------------------
  // Elementos do body do stepper

  // Step 1 \\\\--\\\\ activeStep === 0
  const nomeStep = (
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
  );

  // Step 2 \\\\--\\\\ activeStep === 1
  const livroStep = (
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
  );

  // Step 3 \\\\--\\\\ activeStep === 2
  const serieStep = (
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
  );

  // Step 3 \\\\--\\\\ activeStep === 3
  // Stepe adicional apenas para confirmar os dados dos steps anteriores
  const confirmarDadosStep = (
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
          Série: {seriesData.find(x => x.value === serie).label}
        </Typography>
      ) : ""}
    </Fragment>
  );
  // ---------------------------------------------------------------

  const confirmarDados = () => {
    console.log("Confirmar Dados");
    router.push('/aluno/questionario');
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
            Olá, precisamos de algumas informações antes de proseguir!
          </Typography>
        </Grid>
        <Grid item xs={8}>
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
                  nomeStep
                ) : (activeStep === 1 ? (
                  // Step Livro
                  livroStep
                ) : (activeStep === 2 ? (
                  // Step Série
                  serieStep
                ) : (
                  // Confirmar dados Step
                  confirmarDadosStep
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
        </Grid>
      </Grid>
    </Box >
  )
}