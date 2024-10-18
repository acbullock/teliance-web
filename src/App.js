import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import { 
  Link, 
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography
} from '@mui/material'; 
import Home from "./Home"
import Search from "./Search"
import Admin from "./Admin"
import NotFound from "./404"
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Router  basename="/teliance-web">
      <Container maxWidth={false}>
      <Box sx={{p:2}}>
        <AppBar>
        <Toolbar>
        <Stack direction="row" spacing={2}>
        <Link href="/" underline="none"><Typography variant="h5">Home</Typography></Link>
        <Link href="/search" underline="none"><Typography variant="h5">Search</Typography></Link>
        <Typography variant="h5"><Link href="/admin" underline="none" color="secondary">Admin</Link></Typography>
          </Stack> 
        </Toolbar>
        </AppBar>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Box>
      </Container>
    </Router>
    </ThemeProvider>
  );
}

