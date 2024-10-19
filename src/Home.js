import * as React from 'react';
import { 
  Typography,
  Container,
  Box,
  FormControl,
  OutlinedInput,
  Button,
  Stack,
  Autocomplete,
  TextField,
  Card,
  CardContent,
  // List,
  // ListItem,
  // IconButton,
  // ListItemAvatar,
  // Avatar,
  // ListItemText,
  // FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,

} from '@mui/material'; 
// import DeleteIcon from '@mui/icons-material/Delete';
// import FolderIcon from '@mui/icons-material/Folder';
import Results from "./Results"
const ariaLabel = { 'aria-label': 'description' };








export default function Home() {
  const [error, setError] = React.useState(false);
  const [type, setType] = React.useState("contains");
  const [acRegions, setAcRegions] = React.useState('');
  const [states, setStates] = React.useState([]);
  const [areaCodes, setAreaCodes] = React.useState([]);
  const [state, setState] = React.useState('');
  const [areaCode, setAreaCode] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState([]);

  //filters
  const [repeater, setRepeater] = React.useState(false);
  const [xxxx, setXXXX] = React.useState(false);
  const [x0x0, setX0X0] = React.useState(false);
  const [million, setMillion] = React.useState(false)
  const [ascending, setAscending] = React.useState(false)
  const [descending, setDescending] = React.useState(false)
  const [xy00, setXY00] = React.useState(false);
  const [xxxxx, setXXXXX] = React.useState(false);
  const [xxxxxxy, setXXXXXXY] = React.useState(false)
  const [xyyyyyy, setXYYYYYY] = React.useState(false)
  const [xy00000, setXY00000] = React.useState(false)
  const [xyxyxy, setXYXYXY] = React.useState(false)
  const [xxxyyyy, setXXXYYYY] = React.useState(false)
  const [x00y000, setX00Y000] = React.useState(false)
  const [x00x000, setX00X000] = React.useState(false)
  const [thousand, setThousand] = React.useState(false)
  const [xyxxxxx, setXYXXXXX] = React.useState(false)
  const [doubleAreaCode, setDoubleAreaCode] = React.useState(false)
  const [tripleAreaCode, setTripleAreaCode] = React.useState(false)
  const [price, setPrice] = React.useState([0,75000])
  const stateVals = {
    repeater,
    xxxx,
    x0x0,
    ascending,
    descending,
    million,
    xy00,
    xxxxx,
    xxxxxxy,
    xyyyyyy,
    xy00000,
    xyxyxy,
    xxxyyyy,
    x00y000,
    x00x000,
    thousand,
    xyxxxxx,
    doubleAreaCode,
    tripleAreaCode,
    price
  };
  const setters = {
    setRepeater,
    setXXXX,
    setX0X0,
    setAscending,
    setDescending,
    setMillion,
    setXY00,
    setXXXXX,
    setXXXXXXY,
    setXYYYYYY,
    setXY00000,
    setXYXYXY,
    setXXXYYYY,
    setX00Y000,
    setX00X000,
    setThousand,
    setXYXXXXX,
    setDoubleAreaCode,
    setTripleAreaCode,
    setPrice
  }

  const wordToNumbers = (str) => {
    let keyPad = {
      "A": "2", "B": "2", "C": "2",
      "D": "3", "E": "3", "F": "3",
      "G": "4", "H": "4", "I": "4",
      "J": "5", "K": "5", "L": "5",
      "M": "6", "N": "6", "O": "6",
      "P": "7", "Q": "7", "R": "7", "S": "7",
      "T": "8", "U": "8", "V": "8",
      "W": "9", "X": "9", "Y": "9", "Z": "9",
    }
    return str.split("").map(c=>isNaN(parseInt(c)) ? keyPad[c.toUpperCase()]: c).join("")

  }
  const clearAll = () => {
    setAreaCode("")
    setState("")
    setSearch("")
    setType("contains")
    setResults([])
    setPrice([0,75000])
    setRepeater(false)
    setXXXX(false)
    setX0X0(false)
    setAscending(false)
    setDescending(false)
    setMillion(false)
    setXY00(false)
    setXXXXX(false)
    setXXXXXXY(false)
    setXYYYYYY(false)
    setXY00000(false)
    setXYXYXY(false)
    setXXXYYYY(false)
    setX00Y000(false)
    setX00X000(false)
    setThousand(false)
    setXYXXXXX(false)
    setDoubleAreaCode(false)
    setTripleAreaCode(false)
  }
  const handleFilter = () => {
    handleSearch().then(results=>{
      if (!results)return
      if(doubleAreaCode){
        let reg = new RegExp(/^(\d\d\d)(\1)\d\d\d\d$/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if(tripleAreaCode){
        let reg = new RegExp(/^(\d\d\d)(\1)(\1)/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if(ascending){
        let reg = new RegExp(/(012|123|234|345|456|567|678|789|890)/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if(descending){
        let reg = new RegExp(/(098|987|876|765|654|543|432|321|210)/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if(repeater){
        let reg = new RegExp(/(\d)\1\1\1\1\1\1/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if (xxxx) {
        let reg = new RegExp(/^\d\d\d(\d)*(\d)\2\2\2/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if (xxxxx) {
        let reg = new RegExp(/^\d\d\d(\d)*(\d)\2\2\2\2/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if (x0x0) {
        let reg = new RegExp(/^\d\d\d(\d)*(\d)(0)\2(0)/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if(xy00) {
        let reg = new RegExp(/\d\d\d(\d)*([1-9])(?!\2)([1-9])00/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(xxxxxxy) {
        let reg = new RegExp(/\d\d\d(\d)\1\1\1\1\1(?!\1)(\d)/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if (xyyyyyy) {
        let reg = new RegExp(/^(\d\d\d)(\d)((?!\1)(\d))\3\3\3\3\3$/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
      }
      if (xy00000) {
        let reg = new RegExp(/^(\d\d\d)([1-9])((?!\1)([1-9]))(00000)$/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(xyxyxy){
        let reg = new RegExp(/\d\d\d(\d)(?!\1)(\d)\1\2\1\2/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(xxxyyyy){
        let reg = new RegExp(/^\d\d\d(\d)\1\1(?!\1)(\d)\2\2\2$/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(x00y000){
        let reg = new RegExp(/^\d\d\d([1-9])(00)(?!\1)([1-9])(000)$/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(x00x000){
        let reg = new RegExp(/^\d\d\d([1-9])(00)(\1)(000)$/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(thousand){
        let reg = new RegExp(/\d\d\d(\d)*(\d)000/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(million){
        let reg = new RegExp(/\d\d\d(\d)*(\d)000000/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      if(xyxxxxx){
        let reg = new RegExp(/(\d)(?!\1)(\d)\1\1\1\1\1$/)
        results = results.filter(r=>reg.test(r.number.replace(/[^0-9]+/g, "")))
        
      }
      //console.log(price[0], results[0].price.replace(/[^0-9]+/g, ""))
      results = results.filter(r=>parseFloat(r.price.replace("$", "")) >= price[0])
      results = results.filter(r=>parseFloat(r.price.replace("$", "")) <= price[1])
      setResults(results)
    })
  }
  const handleSearch = async () => {
    let query = ""
    if (!state && !areaCode && !search) {
      console.log("returning early..")
      setResults([])
      setError(true)
      return;
    }
    setError(false)
    if(type && search.trim()) {
      query += `searchType=${type}&`
    }
    if(areaCode) {
      query += `areaCode=${areaCode}&`
    }
    if(state) {
      query += `region=${state}&`
    }
    if(search.trim()) {
      query += `searchString=${wordToNumbers(search.trim())}&`
    }

    let data = await fetch("https://eddb.teliance.com/api/phone-numbers/filter?" + query)
    if (data.status !== 404){
      data = await data.json();
      data = data.filter(d=>d.price > 0)
      data = data.map(d=>{
        d.number = d.number.replace(wordToNumbers(search.trim()), search.trim().toUpperCase())
        return d;
      })
      data = data.map(d=>{
        d.number = `(${d.number.substring(0,3)}) ${d.number.substring(3,6)} - ${d.number.substring(6)}`
        d.price = "$" + d.price
        //d.buyNow = <Button>Buy Now</Button>
        return d;
      })
    }
    else{
      data = []
    }
    console.log("results", data)
    setResults(data)
    return data

  }
  const handleChangeAreaCode = (event) => {
    let value = (event.target.innerText && event.target.innerText.substring(0,3)) || ""
    if (value.length === 3) {
      let ar = acRegions.find((ac)=>ac.area_code === value)|| {area_code: value, region: "NA"}
      setState(ar.region)
    }
    setAreaCode(value);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleChangeSearch = (event) => {
    setSearch(event.target.value.substring(0, 7));
  };
  const handleChangeState = (event) => {
      let value = event.target.innerText
      setState(value);
      if (value){
        let filteredAreaCodes = acRegions.filter(ac=>ac.region === value).map(a=>a.area_code).sort((a,b)=>a-b)
        setAreaCodes(filteredAreaCodes)
      }
      else{
        let areaCodes = acRegions.map(d=>d.area_code);
        areaCodes = Array.from(new Set(areaCodes)).sort((a,b)=>a-b)
        setAreaCodes(areaCodes);
      }
      
    };
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

    <Container maxWidth={false} sx={{mt:15}} align='center'>
     
      <Box sx={{p:2}} >
        <img
          srcSet={`https://cdn.prod.website-files.com/66a2d277a142a2f6c9a60ac7/66b04bc985377ea6bfbc1a54_ed256.png?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
          src={`https://cdn.prod.website-files.com/66a2d277a142a2f6c9a60ac7/66b04bc985377ea6bfbc1a54_ed256.png?w=164&h=164&fit=crop&auto=format`}
          alt="Exclusive Digits"
          loading="lazy"
        />
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Exclusive Digits</Typography>
        <Typography variant="h6">Pricing for Every Business</Typography>
      </Box>
       <Card elevation={3} sx={{width: "50%", overflow: 'visible'}}>
      <CardContent>
      <Box
      component="form"
      sx={{  '& > :not(style)': { m: 1 }}}
      noValidate
      autoComplete="off" 
      >
      <FormControl sx={{width: "15ch"}} >
        <Autocomplete
          disablePortal
          options={states}
          value={state}
          id="state"
          onChange={handleChangeState}
          label="State"
          defaultValue=""
          renderInput={(params) => <TextField error={error} {...params} label="State" />}
        />
      </FormControl>
      <FormControl sx={{width: "15ch"}} >
        <Autocomplete
          disablePortal
          options={areaCodes}
          value={areaCode}
          id="areaCode"
          onChange={handleChangeAreaCode}
          label="Area Code"
          defaultValue=""
          renderInput={(params) => <TextField error={error} {...params} label="Area Code" />}
        />
      </FormControl>
      
      <FormControl sx={{width: "20ch"}} error={error}>
      <OutlinedInput placeholder="Search" value={search.trim()} inputProps={ariaLabel} onChange={handleChangeSearch}/>
      </FormControl>
      <br/>
      <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        defaultValue="contains"
        value={type}
        onChange={handleChangeType}
      >
        <FormControlLabel value="contains" control={<Radio />} label="Contains" />
        <FormControlLabel value="startsWith" control={<Radio />} label="Starts With" />
        <FormControlLabel value="endsWith" control={<Radio />} label="Ends With" />
      </RadioGroup>
    </FormControl>

    </Box>

    <Box  component="section" 
    display="flex"
    justifyContent="center"
    alignItems="center"

    >
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" onClick={clearAll} color="secondary">Clear All</Button>
      <Button variant="contained"  color="primary" onClick={handleFilter}>Search</Button>
    </Stack>
    </Box>
    </CardContent>
      </Card>

    {/*Results*/}
    <Results results={results || []} filter={handleFilter} updateResults={setResults} search={handleSearch} homeState={stateVals} homeSetters = {setters}/>
    </Container>
    );
}