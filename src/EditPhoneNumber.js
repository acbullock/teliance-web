import React from 'react'
import { 
  Typography, 
  Container, 
  Grid , 
  Card, 
  CardContent,
  FormControl, OutlinedInput,
  FormLabel,
  Button,
  Autocomplete,
  TextField,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  Collapse,
  CircularProgress,
  Alert
} from '@mui/material'; 

const ariaLabel = { 'aria-label': 'description' };


export default function EditPhoneNumber(props) {
  const [search, setSearch] = React.useState("")
  const [searchError, setSearchError] = React.useState(false)
  const [results, setResults] = React.useState([])
  const [selected, setSelected] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  //edit vals
  const [numberError, setNumberError] = React.useState(false)
  const [number, setNumber]= React.useState("")
  const [priceError, setPriceError] = React.useState(false)
  const [price, setPrice] = React.useState('')
  const [available, setAvailable] = React.useState(false)

  const [successAlert, setSuccessAlert] = React.useState(false)

  const handleUpdate= async ()=>{
    setLoading(true)
    if(!selected) {
      setLoading(false)
      return
    }
    setNumberError(false)
    setPriceError(false)
    
    let phoneRegex = new RegExp(/^\d\d\d\d\d\d\d\d\d\d$/)
    if (!phoneRegex.test(number)) {
      setNumberError(true)
      return;
    }
    if (isNaN(parseFloat(price)) || !parseFloat(price)){
      setPriceError(true)
      setLoading(false)
      return;
    }

    //get number we are updating..
    let found = await fetch(`https://eddb.teliance.com/api/phone-numbers/filter?areaCode=${selected.substring(0,3)}&searchString=${selected.substring(3)}`)
    found = await found.json()
    found = found[0]
    
    let updateId = found.id;
    let updateRegion = props.appStates.acRegions.find(ac=>ac.area_code === number.substring(0,3)).region
    let updateNumber = number;
    let updatePrice = price;
    let updateAvailable = available === "available" ? 1: 0;
    let newAreaCode = number.substring(0,3)
    let update={
      id: updateId,
      available: updateAvailable,
      price: updatePrice,
      number: updateNumber,
      area_code: newAreaCode,
      region: updateRegion

    }
    try{
      const response = await fetch("https://eddb.teliance.com/api/phone-numbers/updatePhoneNumber", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"  // Set the content type to application/json
        },
        body: JSON.stringify(update)  // Stringify your object
      });
      if(response.ok) {
        setSuccessAlert(true)
      }
      let results = await response.json()
      console.log(results)
      setNumber("")
      setPrice("")
      setAvailable("available")
      setSelected("")
      setResults([])
      setLoading(false)
      return;

    }
    catch(e){
      console.log(e)
    }
    setLoading(false)
    return
    
    

  }
  const handleNumberChange = (event)=>{
    let value = event.target.value;
    value = value.replace(/[^0-9]+/g, "").substring(0,10)
    setNumber(value)
  }

  const handlePriceChange = (event)=>{
    let value = event.target.value;
    setPrice(value.replace(/[^\d.]|(?<=\..*)\./, "").substring(0,8));
  }

  const handleAvailableChange = (event)=>{
    let value = event.target.value;
    setAvailable(value)
  }
  const handleChangeSearch = (event)=>{
    let {value} = event.target;
    setSearch(value.replace(/[^0-9]+/g, "").substring(0,10))
  }
  const handleSelectedChange = async (event)=>{
    setNumberError(false)
    setPriceError(false)
    let value = event.target.innerText;
    setSelected(value)
    setNumber(value)
    let found = await fetch(`https://eddb.teliance.com/api/phone-numbers/filter?searchString=${value.substring(3)}`)
    found = await found.json()
    setPrice(found[0].price)
    setAvailable(found[0].available === 1 ? "available" : "unavailable")
  }
  const handleSearch = async () => {
    setSelected()
    if (search.length < 5){
      setSearchError(true)
      return;
    }
    setSearchError(false)
    try{
      let found = await fetch(`https://eddb.teliance.com/api/phone-numbers/filter?searchString=${search}`)
      if(found.ok) {
        found = await found.json()
        setSearch("")
        setResults(found.map(f=>f.number))
        console.log(found.map(f=>f.number), "!@#")
        return
      }
      
    }
    catch(e){
      console.log("number not currently in system")
    }
    

    setResults([])
  }
  return (
    <Container maxWidth={false} sx={{mt:10}}>
    <Collapse in={successAlert} >
               <Alert onClose={()=>setSuccessAlert(false)} severity="success" sx={{m: 3}}>
                 Update Successful!
               </Alert>
            
             
            </Collapse>

      <Grid container direction="row" spacing={2} justifyContent="center">
        <Grid item md={6} align="center">
          <Grid container direction="column" spacing={2}>
            <Grid item align="center">
                <Card elevation={4} sx={{height: 300, width: "100%"}}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Select Phone Number</Typography>
                    <Typography >Find a phone number to edit:</Typography>
                    <Grid container sx={{mt:2}} justifyContent="center" flexDirection="column" spacing={2}>
                      <Grid item >
                        <FormControl sx={{width: "80%"}} error={searchError}>
                        <FormLabel>Phone Number</FormLabel>
                          <OutlinedInput placeholder="Search" value={search} inputProps={ariaLabel} onChange={handleChangeSearch}/>
                        </FormControl>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" onClick={handleSearch}>Search</Button>
                        <Typography color="success">{results.length} results</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
            </Grid>
            <Grid item align="center">
                <Card elevation={4} sx={{height: 200, overflow: "visible"}}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Results</Typography>
                    <FormControl sx={{width:"80%", mt: 2}} >
                      <Autocomplete
                        disablePortal
                        options={results}
                        value={selected}
                        id="selected"
                        onChange={handleSelectedChange}
                        label="State"
                        defaultValue=""
                        renderInput={(params) => <TextField {...params} label="Selected" />}
                      />
                    </FormControl>
                  </CardContent>
                </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} align="center" >
          <Card elevation={4} sx={{height: 516}} >
            <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Edit Phone Number</Typography>
                    <Box  sx={{m: 2}}>
                      <FormControl sx={{width: "50%"}} error={numberError}>
                        <FormLabel>Phone Number</FormLabel>
                        <OutlinedInput placeholder="Number" value={number} inputProps={ariaLabel} onChange={handleNumberChange}/>
                      </FormControl>
                    </Box>
                    <Box  sx={{mb:2}}>
                      <FormControl sx={{width: "50%"}} error={priceError}>
                        <FormLabel>Price</FormLabel>
                        <OutlinedInput placeholder="Price" value={price} inputProps={ariaLabel} onChange={handlePriceChange}/>
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
                        <FormControlLabel value="unavailable" control={<Radio />} label="Unavailable" />
                      </RadioGroup>
                    </FormControl>
                    </Box>
                    <Box sx={{mb:2}} display={loading ? "inhert" : "none"} >
                    <CircularProgress color="inherit" />
              
                    </Box>
                    
                    <Box sx={{mb:2}}>
                    
                    <Button variant="contained" disabled={loading}><Typography variant="h6" onClick={handleUpdate}>Update</Typography></Button>
                    </Box>
                    


            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}