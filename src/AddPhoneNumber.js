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
  Button
} from '@mui/material'; 
export default function AddPhoneNumber() {
  const [error, setError] = React.useState(false)
  const [states, setStates] = React.useState([])
  const [price, setPrice] = React.useState("")
  const handlePriceChange = (event) =>{
    let {value} = event.target;
    setPrice(value.replace(/[^0-9]+/g, "").substring(0,8));
  }
  return (
    <Container maxWidth={false} sx={{mt:1}}  align="center">
      <Box display="flex" flexDirection="row"  gap={2} justifyContent="center" >
        <Card elevation={3} sx={{width:'50%'}} >
        <CardContent >
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb:3 }}>Add Phone Number</Typography>
          <Box  sx={{mb:2}}>
          <FormControl>
            <FormLabel>Number</FormLabel>
            <Input />
            <FormHelperText>10 digits, no symbols</FormHelperText>
          </FormControl>
          </Box>
          <Box  sx={{mb:2}}>
          <FormControl sx={{ mb:3}} onChange={handlePriceChange} >
            <FormLabel>Price</FormLabel>
            <Input value={price}/>
          </FormControl>
          </Box>
          <Box  sx={{mb:2}}>
          <FormControl  >
            <Autocomplete
              disablePortal
              options={states}
              value={""}
              id="state"
              onChange={()=>{}}
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
          </CardContent>
          </Card>
        </Box>
        

      
           
    </Container>
    );
}