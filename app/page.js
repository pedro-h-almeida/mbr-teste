'use client'

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';


const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));


export default function Home() {
  const router = useRouter();

  const images = [
    {
      url: 'https://cdn.e-konomista.pt/uploads/2018/09/aproveitamento-escolar-aula.jpg',
      btnText: 'Aluno',
      onClick: () => router.push('/aluno')
    },
  ];

  return (
    <Box className={styles.main} >
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.btnText}
          className={styles.imageButton}
          onClick={image.onClick}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image alt="">
            <Typography
              className={styles.imageText}
              component="span"
              variant="subtitle1"
              // color="inherit"
              color="yellow"
              sx={{
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.btnText}
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}