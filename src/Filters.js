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
  Button
} from '@mui/material'; 
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('light', {
    backgroundColor: '#1A2027',
  }),
}));

export default function Filters(props) {
  
  const handleFilter = () => {
    props.search().then(results=>{
      if (!results)return
      if(props.homeState.doubleAreaCode){
        let reg = new RegExp(/^(\d\d\d)(\1)\d\d\d\d$/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if(props.homeState.tripleAreaCode){
        let reg = new RegExp(/^(\d\d\d)(\1)(\1)\d$/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if(props.homeState.ascending){
        let reg = new RegExp(/(012|123|234|345|456|567|678|789|890)/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if(props.homeState.descending){
        let reg = new RegExp(/(098|987|876|765|654|543|432|321|210)/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if(props.homeState.repeater){
        let reg = new RegExp(/(\d)\1\1\1\1\1\1/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if (props.homeState.xxxx) {
        let reg = new RegExp(/^\d\d\d(\d)*(\d)\2\2\2/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if (props.homeState.xxxxx) {
        let reg = new RegExp(/^\d\d\d(\d)*(\d)\2\2\2\2/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if (props.homeState.x0x0) {
        let reg = new RegExp(/^\d\d\d(\d)*(\d)(0)\2(0)/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if(props.homeState.xy00) {
        let reg = new RegExp(/\d\d\d(\d)*([1-9])(?!\2)([1-9])00/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(props.homeState.xxxxxxy) {
        let reg = new RegExp(/\d\d\d(\d)\1\1\1\1\1(?!\1)(\d)/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if (props.homeState.xyyyyyy) {
        let reg = new RegExp(/^(\d\d\d)(\d)((?!\1)(\d))\3\3\3\3\3$/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if (props.homeState.xy00000) {
        let reg = new RegExp(/^(\d\d\d)([1-9])((?!\1)([1-9]))(00000)$/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(props.homeState.xyxyxy){
        let reg = new RegExp(/\d\d\d(\d)(?!\1)(\d)\1\2\1\2/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(props.homeState.xxxyyyy){
        let reg = new RegExp(/^\d\d\d(\d)\1\1(?!\1)(\d)\2\2\2$/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(props.homeState.x00y000){
        let reg = new RegExp(/^\d\d\d([1-9])(00)(?!\1)([1-9])(000)$/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(props.homeState.x00x000){
        let reg = new RegExp(/^\d\d\d([1-9])(00)(\1)(000)$/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(props.homeState.thousand){
        let reg = new RegExp(/\d\d\d(\d)*(\d)000/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(props.homeState.million){
        let reg = new RegExp(/\d\d\d(\d)*(\d)000000/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(props.homeState.xyxxxxx){
        let reg = new RegExp(/(\d)(?!\1)(\d)\1\1\1\1\1$/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      props.updateResults(results)
    })
    

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
  // React.useEffect(()=>{
  //   handleFilter()
  // })
  return (
    <Container maxWidth={false}>
    <Box spacing={2} >
     <Typography variant="h4">Filters</Typography>
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
            
            <Button variant="outlined" onClick={handleFilter}><Typography variant="h6">Update</Typography></Button>
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
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </Box>
    </Container>
    );
}