import React from "react";
import { 
  Typography,
  Container,
  Card,
  CardContent,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  Box,
  Radio,
  RadioGroup,
  Autocomplete,
  TextField,
  FormControlLabel,
  Button,
  Grid,
} from '@mui/material'; 
export default function AddPhoneNumber(props) {
  const [error, setError] = React.useState(false)
  const [number, setNumber] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [state, setState] = React.useState("")

  const findStateFromAreaCode=(npa)=>props.appStates.acRegions.find(ac=>ac.area_code === npa.substring(0,3))?.region || "NA"

  const handleNumberChange = (event) => {
    // setError(true)
    let {value} = event.target
    value = value.replace(/[^0-9]+/g, "").substring(0,10)
    setNumber(value)
    if (value.length >= 3) {
      setState(findStateFromAreaCode(value))
    }
    else{
      setState("")
    }
  }
  const handleStateChange = (event) => {
    let {value} = event.target
    setState(value)
  }
  const handlePriceChange = (event) =>{
    let {value} = event.target;
    setPrice(value.replace(/[^0-9]+/g, "").substring(0,8));
  }
  
  return (
    <Container maxWidth={false} sx={{mt:1}}  align="center">
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Card elevation={2} sx={{ overflow: 'visible'}}>
          <CardContent>
            <Box display="flex" flexDirection="column"  gap={2} justifyContent="center" sx={{width:'100%'}}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb:3 }}>Add Phone Number</Typography>
              <Box  sx={{mb:2}}>
                <FormControl onChange={handleNumberChange}>
                  <FormLabel>Number</FormLabel>
                  <Input value={number}/>
                  <FormHelperText>10 digits, no symbols</FormHelperText>
                </FormControl>
              </Box>
              <Box  sx={{mb:2}}>
                <FormControl onChange={handlePriceChange} >
                  <FormLabel>Price</FormLabel>
                  <Input value={price}/>
                </FormControl>
              </Box>
          <Box  sx={{mb:2}}>
          <FormControl  >
            <Autocomplete
            disabled
              disablePortal
              options={props.appStates.states}
              value={state}
              id="state"
              onChange={handleStateChange}
              label="State"
              defaultValue=""
              renderInput={(params) => <TextField error={error} {...params} label="State" />}
            />
          </FormControl>
          </Box>
          <Box  sx={{mb:2}}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="available" control={<Radio />} label="Available" />
              <FormControlLabel value="Unavailable" control={<Radio />} label="Unavailable" />
            </RadioGroup>
          </FormControl>
          </Box>
           <Box  sx={{mb:2}}>
           <Button variant="contained">Add Number</Button>
           </Box>
        </Box>
          </CardContent>
        </Card>
      </Grid>  
      </Grid>
      
           
    </Container>
    );
}