import { Fragment } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Image from 'next/image';


export default function LivrosStep({ livro, setLivro, livrosData }) {

  const handleChange = (event, newLivroId) => {
    if (newLivroId !== null) {
      setLivro(newLivroId);
    }
  };

  return (
    <Fragment>
      <Typography variant="h5" style={{ paddingBottom: "1.5rem" }} >
        Qual livro você está cursando?
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={livro}
        exclusive
        onChange={handleChange}
        aria-label="Livro"
      >
        {livrosData.map((element, index) => {
          return (
            <ToggleButton key={element.value} value={element.value}>
              <Image
                src={element.img !== '' ? element.img : '/icone-mundo.png'}
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
}