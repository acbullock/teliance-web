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
  Alert,
  Collapse,
} from '@mui/material'; 
export default function AddPhoneNumber(props) {
  const [numberError, setNumberError] = React.useState(false)
  const [priceError, setPriceError] = React.useState(false)
  const [number, setNumber] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [state, setState] = React.useState("")
  const [available, setAvailable] = React.useState("available")
  const [openAlreadyThereAlert, setOpenAlreadyThereAlert] = React.useState(false)
  const [openErrorAlert, setOpenErrorAlert] = React.useState(false)
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false)

  const handleSubmit = async () => {
    if (isNaN(parseFloat(price))){
      setPriceError(true)
      return
    }
    else{
      setPriceError(false)
    }
    if( number.length !== 10 || isNaN(parseInt(number))){
      setNumberError(true)
      return;
    }
    setNumberError(false)
    let numberObj = {
      area_code: number.substring(0,3),
      region: state,
      number: number,
      price: price,
      available: available === "available" ? 1 : 0,
      source: "teliance"
    }
    console.log(numberObj)
    //see if number exists..
    try{
      let found = await fetch(`https://eddb.teliance.com/api/phone-numbers/filter?areaCode=${number.substring(0,3)}&searchString=${number.substring(3)}`)
      if(found.ok) {
        found = await found.json()
        console.log(found, "really found")
        setOpenAlreadyThereAlert(true)
        setNumber("")
        setPrice("")
        setState("")
        setAvailable("available")
        return
      }
      
    }
    catch(e){
      console.log("number not currently in system")
    }
    console.log("adding number now..")
    //add number..
    try{
      const response = await fetch("https://eddb.teliance.com/api/phone-numbers/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"  // Set the content type to application/json
        },
        body: JSON.stringify(numberObj)  // Stringify your object
      });

      if (!response.ok) {
        // Handle errors
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();  // Parse the JSON response
      console.log(data);  // Log the response or do something with it
      setOpenSuccessAlert(true)
      setNumber("")
      setPrice("")
      setState("")
      setAvailable("available")
      
    }
    catch(e){
      setOpenErrorAlert(true)
    }
  }

  const findStateFromAreaCode=(npa)=>props.appStates.acRegions.find(ac=>ac.area_code === npa.substring(0,3))?.region || "NA"
  const handleAvailableChange = (event) => {
    let {value} = event.target;
    setAvailable(value)
  }
  const handleNumberChange = (event) => {
    
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
    setPrice(value.replace(/[^\d.]|(?<=\..*)\./, "").substring(0,8));
  }
  
  return (
    <Container maxWidth={false} sx={{mt:1}}  align="center">
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Card elevation={5} sx={{
          overflow: 'visible',
          width: {
            sm: '100%',  // 75% width on small screens
            md: '80%',  // 50% width on medium screens
            lg: '70%',  // 40% width on large screens
            xl: '60%',  // 30% width on extra-large screens
          },
          mx: 'auto', // Center horizontally
          mt: 2, // Add margin on top
        }}>
          <CardContent>
            <Box display="flex" flexDirection="column"  gap={2} justifyContent="center" sx={{width:'100%'}}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb:3 }}>Add Phone Number</Typography>
              <Box sx={{mb:2}}>
                <FormControl onChange={handleNumberChange} error={numberError}>
                  <FormLabel>Number</FormLabel>
                  <Input value={number}/>
                  <FormHelperText>10 digits, no symbols</FormHelperText>
                </FormControl>
              </Box>
              <Box  sx={{mb:2}}>
                <FormControl onChange={handlePriceChange}error={priceError}>
                  <FormLabel>Price</FormLabel>
                  <Input value={price} />
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
                renderInput={(params) => <TextField {...params}  label="State" />}
              />
            </FormControl>
            </Box>
            <Box  sx={{mb:2}}>
            <FormControl value={available}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="available"
                name="radio-buttons-group"
                onChange={handleAvailableChange}
              >
                <FormControlLabel value="available" control={<Radio />} label="Available" />
                <FormControlLabel value="Unavailable" control={<Radio />} label="Unavailable" />
              </RadioGroup>
            </FormControl>
            </Box>
            <Box  sx={{mb:2}}>
            <Button variant="contained" onClick={handleSubmit}>Add Number</Button>
            <Collapse in={openAlreadyThereAlert} >
               <Alert onClose={()=>{setOpenAlreadyThereAlert(false)}} severity="warning" sx={{mt: 3}}>
                 Number already exists in system.
               </Alert>
             </Collapse>
             <Collapse in={openErrorAlert} >
              <Alert onClose={()=>{setOpenErrorAlert(false)}} severity="error" sx={{mt: 3}}>
                Something went wrong.
              </Alert>
            </Collapse>
            <Collapse in={openSuccessAlert} >
              <Alert onClose={()=>{setOpenSuccessAlert(false)}} severity="success" sx={{mt: 3}}>
                Number Added Successfully!
              </Alert>
            </Collapse>
           </Box>
        </Box>
          </CardContent>
        </Card>
      </Grid>  
      </Grid>
      
           
    </Container>
    );
}