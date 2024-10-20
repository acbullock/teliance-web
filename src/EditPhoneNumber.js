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
  Collapse,Alert
} from '@mui/material'; 

const ariaLabel = { 'aria-label': 'description' };


export default function EditPhoneNumber() {
  const [search, setSearch] = React.useState("")
  const [searchError, setSearchError] = React.useState(false)
  const [results, setResults] = React.useState([])
  const [selected, setSelected] = React.useState("")

  //edit vals
  const [numberError, setNumberError] = React.useState(false)
  const [number, setNumber]= React.useState("")
  const [priceError, setPriceError] = React.useState(false)
  const [price, setPrice] = React.useState('')
  const [available, setAvailable] = React.useState(false)

  const [successAlert, setSuccessAlert] = React.useState(false)

  const handleUpdate= async ()=>{
    if (isNaN(parseInt(number)) || number.length !== 10) {
      setNumberError(true)
      return;
    }
    if (isNaN(parseFloat(price))) {
      setPriceError(true)
      return;
    }
    setSuccessAlert(true)

  }
  const handleNumberChange = (event)=>{
    let value = event.target.value;
    setNumber(value)
  }

  const handlePriceChange = (event)=>{
    let value = event.target.value;
    setPrice(value)
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
                 Number already exists in system.
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
          <Card elevation={4} sx={{height: 516}}>
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
                    <Box sx={{mb:2}}>
                    <Button variant="contained"><Typography variant="h6" onClick={handleUpdate}>Update</Typography></Button>
                    </Box>
                    


            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}