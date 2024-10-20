import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { 
  // Link, 
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
import { Switch, Stack } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const darkTheme = createTheme({
    palette: {
       mode: "dark",
    },
  });
const lightTheme = createTheme({
      palette: {
      mode: "light",
      primary2: {main:"#ffffff"}
    }
  });
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function App() {
  
  const [darkMode, setDarkMode] = React.useState(true)
  const [acRegions, setAcRegions] = React.useState(false)
  const [states, setStates] = React.useState([])
  const [areaCodes, setAreaCodes] = React.useState([])

  const appStates = {
    states,
    acRegions,
    areaCodes
  }
  const appSetters = {
    setAreaCodes,
    setStates,
    setAcRegions
  }
  const toggleDark = ()=>{
    setDarkMode(!darkMode)
  }
  // Similar to componentDidMount and componentDidUpdate:
  React.useEffect(() => {
    // Update the document title using the browser API
    document.title = `Exclusive Digits - Phone Number Search`;
    //get area codes..
    if (!acRegions){
      fetch("https://eddb.teliance.com/api/phone-numbers/areaCodeWithRegions").then(result=>{
      result.json().then(data => {
        setAcRegions(data);
        let states = data.map(d=>d.region);
        states = Array.from(new Set(states)).sort((a,b)=>a-b)
        setStates(states);
        let areaCodes = data.map(d=>d.area_code);
        areaCodes = Array.from(new Set(areaCodes)).sort((a,b)=>a-b)
        setAreaCodes(areaCodes);
      })
      
    })
    }
    


  });
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    <CssBaseline />
    <Router  basename="/teliance-web">
      <Container maxWidth={false}>
      <Box sx={{p:2}}>
        <AppBar>
        <Toolbar>
        <Stack direction="row" spacing={2} gap={1}>
         <Switch {...label} checked={!darkMode} onChange={toggleDark} color="alernate"/>
        <Link to="/" style={{ textDecoration: 'none', color: 'primary' }}>
              <Typography variant="h5" sx={{color: !darkMode? "primary2.main": "primary.main"}}>Home</Typography>
        </Link>
        <Link to="/search" style={{ textDecoration: 'none' , color: "primary" }}>
          <Typography variant="h5"sx={{color: !darkMode? "primary2.main": "primary.main"}}>Search</Typography>
        </Link>
        
        <Link to="/admin" style={{ textDecoration: 'none', color: 'primary' }}>
          <Typography variant="h5" sx={{color: !darkMode? "primary2.main": "primary.main"}}>Admin</Typography>
        </Link>
        </Stack> 
        </Toolbar>
        </AppBar>
        <Routes>
          <Route exact path="/" element={<Home appSetters={appSetters} appStates={appStates}/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/admin" element={<Admin appSetters={appSetters} appStates={appStates}/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Box>
      </Container>
    </Router>
    </ThemeProvider>
  );
}

