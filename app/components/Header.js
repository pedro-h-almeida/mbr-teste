'use client'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Typography from '@mui/material/Typography';


export default function MenuAppBar() {

  const paths = usePathname()
  const pathNames = paths.split('/').filter(path => path)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Breadcrumbs aria-label="breadcrumb">
            <Link href="/">
              <Typography variant="h6" color="white">
                Página Inicial
              </Typography>
            </Link>
            {
              pathNames.map((element, index) => {
                return (
                  <Link key={index} href={`/${pathNames.slice(0, index + 1).join('/')}`}>
                    <Typography variant="h6" color="white">
                      {element[0].toUpperCase() + element.slice(1, element.length)}
                    </Typography>
                  </Link>
                )
              })
            }
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
