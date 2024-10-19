import * as React from 'react';
import { 
  Typography, 
  Container, 
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Slider,
} from '@mui/material'; 
import Box from '@mui/material/Box';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Filters(props) {
  const handleChangePrice = (event, newValue) => {
    props.homeSetters.setPrice(newValue)
  }
  const handleChangeDoubleAreaCode = (event) => {
    props.homeSetters.setDoubleAreaCode(!props.homeState.doubleAreaCode)
  };
  const handleChangeTripleAreaCode = (event) => {
    props.homeSetters.setTripleAreaCode(!props.homeState.tripleAreaCode)
  };
  const handleChangeAscending = (event) => {
    props.homeSetters.setAscending(!props.homeState.ascending)
  };
  const handleChangeDescending = (event) => {
    props.homeSetters.setDescending(!props.homeState.descending)
  };
  const handleChangeRepeater = (event) => {
    props.homeSetters.setRepeater(!props.homeState.repeater)
  };
  const handleChangeX0X0 = (event) => {
    props.homeSetters.setX0X0(!props.homeState.x0x0)
  };
  const handleChangeXXXX = (event) => {
    props.homeSetters.setXXXX(!props.homeState.xxxx)
  };
  const handleChangeXXXXXXY = (event) => {
    props.homeSetters.setXXXXXXY(!props.homeState.xxxxxxy)
  }
  const handleChangeXYXXXXX = (event) => {
    props.homeSetters.setXYXXXXX(!props.homeState.xyxxxxx)
  }
  const handleChangeX00Y000 = (event) => {
    props.homeSetters.setX00Y000(!props.homeState.x00y000)
  };
  const handleChangeX00X000 = (event) => {
    props.homeSetters.setX00X000(!props.homeState.x00x000)
  };
  const handleChangeXYXYXY = (event) => {
    props.homeSetters.setXYXYXY(!props.homeState.xyxyxy)
  };
  const handleChangeXYYYYYY = (event) => {
    props.homeSetters.setXYYYYYY(!props.homeState.xyyyyyy)
  };
  const handleChangeXY00000 = (event) => {
    props.homeSetters.setXY00000(!props.homeState.xy00000)
  };
  const handleChangeMillion = (event) => {
    props.homeSetters.setMillion(!props.homeState.million)
  };
  const handleChangeXXXXX = (event) => {
    props.homeSetters.setXXXXX(!props.homeState.xxxxx)
  };
  const handleChangeXXXYYYY = (event) => {
    props.homeSetters.setXXXYYYY(!props.homeState.xxxyyyy)
  };
  const handleChangeXY00 = (event) => {
    props.homeSetters.setXY00(!props.homeState.xy00)
  };
  const handleChangeThousand = (event) => {
    props.homeSetters.setThousand(!props.homeState.thousand)
  };
  const handleReset = (event) => {
    props.homeSetters.setAscending(false)
    props.homeSetters.setDescending(false)
    props.homeSetters.setMillion(false)
    props.homeSetters.setXXXX(false)
    props.homeSetters.setXXXXX(false)
    props.homeSetters.setXYXYXY(false)
    props.homeSetters.setX00Y000(false)
    props.homeSetters.setXXXYYYY(false)
    props.homeSetters.setXYYYYYY(false)
    props.homeSetters.setXXXXXXY(false)
    props.homeSetters.setXYXXXXX(false)
    props.homeSetters.setXY00000(false)
    props.homeSetters.setXY00(false)
    props.homeSetters.setX0X0(false)
    props.homeSetters.setX00X000(false)
    props.homeSetters.setRepeater(false)
    props.homeSetters.setThousand(false)
    props.homeSetters.setDoubleAreaCode(false)
    props.homeSetters.setTripleAreaCode(false)
  };
  const handleResetPrice = (event) => {
    props.homeSetters.setPrice([0, 75000])
  }
  // React.useEffect(()=>{
  //   handleFilter()
  // })
  return (
    <Container maxWidth={false}>
    <Box spacing={2} >
     <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Filters</Typography>
     <Accordion > 
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography variant="h6">Patterns</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{mt:5}}>
          <Grid container spacing={2} direction="row">
            <Grid item  md={6}>
            <Box component="section" 
            justifyContent="center"
            alignItems="center"
            maxWidth="md"
            style={{ height: '80%',  width: '100%' }}>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={props.homeState.repeater} onChange={handleChangeRepeater}/> } label="Repeater" />
                <FormControlLabel control={<Checkbox checked={props.homeState.tripleAreaCode} onChange={handleChangeTripleAreaCode}/>} label="Triple Area Code" />
                <FormControlLabel control={<Checkbox checked={props.homeState.descending} onChange={handleChangeDescending}/>} label="Descending" />
                <FormControlLabel control={<Checkbox checked={props.homeState.thousand} onChange={handleChangeThousand}/>} label="Thousand" />
                <FormControlLabel control={<Checkbox checked={props.homeState.xyyyyyy} onChange={handleChangeXYYYYYY}/>} label="XYY-YYYY" />
                <FormControlLabel control={<Checkbox checked={props.homeState.xy00000} onChange={handleChangeXY00000}/>} label="XY0-0000" />
                <FormControlLabel control={<Checkbox checked={props.homeState.x00y000} onChange={handleChangeX00Y000}/>} label="X00-Y000" />
                <FormControlLabel control={<Checkbox checked={props.homeState.xyxyxy} onChange={handleChangeXYXYXY}/>} label="XYXYXY" />
                <FormControlLabel control={<Checkbox checked={props.homeState.xxxx} onChange={handleChangeXXXX}/>} label="XXXX" />
                <FormControlLabel control={<Checkbox checked={props.homeState.xy00} onChange={handleChangeXY00}/>} label="XY00" />
              </FormGroup>
            </Box>
          </Grid>
          <Grid item  md={6}>
            <Box component="section" 
            justifyContent="center"
            alignItems="center"
            maxWidth="md"
            style={{ height: '80%',  width: '100%' }}>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={props.homeState.doubleAreaCode} onChange={handleChangeDoubleAreaCode}/>} label="Double Area Code" />
                <FormControlLabel control={<Checkbox checked={props.homeState.ascending} onChange={handleChangeAscending}/>} label="Ascending" />
                <FormControlLabel control={<Checkbox checked={props.homeState.million} onChange={handleChangeMillion}/>} label="Million" />
                <FormControlLabel control={<Checkbox checked={props.homeState.xxxxxxy} onChange={handleChangeXXXXXXY}/>} label="XXX-XXXY" />
                <FormControlLabel control={<Checkbox checked={props.homeState.xyxxxxx} onChange={handleChangeXYXXXXX} />} label="XYX-XXXX" />
                <FormControlLabel control={<Checkbox checked={props.homeState.x00x000} onChange={handleChangeX00X000}/>} label="X00-X000" />
                <FormControlLabel control={<Checkbox checked={props.homeState.xxxyyyy} onChange={handleChangeXXXYYYY}/>} label="XXX-YYYY" />
                <FormControlLabel control={<Checkbox checked={props.homeState.xxxxx} onChange={handleChangeXXXXX}/>} label="XXXXX" />
                <FormControlLabel control={<Checkbox checked={props.homeState.x0x0} onChange={handleChangeX0X0}/>} label="X0X0" />
              </FormGroup>
              
            </Box>
          </Grid>
          <Grid item md={12} lg={12} >
          <Box component="section" 
            justifyContent="center"
            alignItems="center"
            maxWidth="md"
            style={{ height: '80%',  width: '100%' }}>
            <Button variant="text" color="secondary" onClick={handleReset}><Typography variant="h6">Reset</Typography></Button>
            
            <Button variant="outlined" onClick={props.filter}><Typography variant="h6">Update</Typography></Button>
            </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography variant="h6">Price</Typography>
          
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6">
            {`$${props.homeState.price[0]} - $${props.homeState.price[1]}`}
          </Typography>
          <Box sx={{ width: 300 }}>
            <Slider
            color="info"
              min={0}
              max={75000}
              step={50}
              getAriaLabel={() => 'Price range'}
              value={props.homeState.price}
              onChange={handleChangePrice}
              valueLabelDisplay="auto"
              getAriaValueText={(e) => `$${e}`}
            />
          </Box>
          <Box component="section" 
            justifyContent="center"
            alignItems="center"
            maxWidth="md"
            style={{ height: '80%',  width: '100%' }}>
            <Button variant="text" color="secondary" onClick={handleResetPrice}><Typography variant="h6">Reset</Typography></Button>
            
            <Button variant="outlined" onClick={props.filter}><Typography variant="h6">Update</Typography></Button>
            </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography variant="h6">Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6">
            Coming Soon
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Box>
    </Container>
    );
}