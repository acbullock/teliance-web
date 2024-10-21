import * as React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Typography,
  Container,
  Grid, 
  Card, 
  CardContent,
  Button, 
  CircularProgress,
  Autocomplete,
  FormControl,
  TextField,
  Box,
  Collapse,
  Alert
} from '@mui/material'; 
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


export default function CSVImport(props) {
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const [raw, setRaw] = React.useState('')

  //export vals
  const [exportAreaCode, setExportAreaCode] = React.useState('')
  const [exportRegion, setExportRegion] = React.useState('')
  const [exportAvailable, setExportAvailable] = React.useState('')
  const [exportSource, setExportSource] = React.useState("")
  const [results, setResults] = React.useState([])
  const [resultsAlert, setResultsAlert] = React.useState(false)

  let handleExport = async () => {
    setResultsAlert(false)
    let available = exportAvailable === "" ? "" : exportAvailable === "Available" ?  1 : 0;
    let region = exportRegion;
    let area_code = exportAreaCode
    let source = exportSource;
    let query = '?'
    
    // build query.
    if (available !== ""){
      if (query !== "?") {
        query += "&"
      }
      query += `available=${available}`
    }
    if (region !== ""){
      if (query !== "?") {
        query += "&"
      }
      query += `region=${region}`
    }
    if (area_code !== ""){
      if (query !== "?") {
        query += "&"
      }
      query += `areaCode=${area_code}`
    }
    if (source !== ""){
      if (query !== "?") {
        query += "&"
      }
      query += `source=${source}`
    }
    let url = `https://eddb.teliance.com/api/phone-numbers/filter${query}`
    console.log(url)
    let results = await fetch(url)
    //to do: alert feedback: error
    if (!results.ok){
      console.log("error")
      setResults([])
      setResultsAlert(true)
      return
    }
    else {
      console.log("success")

      results = await results.json()
      setResults(results)
      setResultsAlert(true)

      //build CSV
      let csv = "Number,Price,State,NPA,Available,Source\n"
      for(let r of results) {
        csv += `${r.number},${r.price},${r.region},${r.area_code},${r.available},${r.source}\n`
      }
      
      // Get the current timestamp
      let timestamp = new Date().toISOString().replace(/[:\-T.]/g, '_').slice(0, -1);

      // Create a Blob from the CSV data
      let blob = new Blob([csv], { type: 'text/csv' });
      
      // Create a link element
      let a = document.createElement('a');

      // Create a URL for the Blob and set it as the href for the anchor
      let urlObject = URL.createObjectURL(blob);
      a.href = urlObject;
      
      // Set the download attribute to specify the file name
      a.download = `export_${timestamp}.csv`;
      
      // Append the link to the body (required for Firefox)
      document.body.appendChild(a);
      
      // Programmatically click the link to trigger the download
      a.click();

      // Remove the link from the document
      document.body.removeChild(a);

      // Clean up the URL object
      URL.revokeObjectURL(urlObject);
    }


  }

// $("#exportButton").click(async ()=>{

    

    
//     // Remove the link from the document
//     document.body.removeChild(a);

//     // Clean up the URL object
//     URL.revokeObjectURL(urlObject);
     
    
    
//   })













  const parseCSV = async (csvContent) => {
    let rows = csvContent.split('\n');
    let rowArr = []
    let headers = rows[0].split(',').map(h=>h.toLowerCase())
    let required = ["number", "new sale price"]
    for(let r of required){
      if (!headers.includes(r)){
        console.log("field required and not found", r)
        //break;
      }
    }
    for(let i = 1; i < rows.length; i++){
      //console.log(rows[i], "rowcur")
      const cols = rows[i].split(',')
      let obj = {}
      //console.log(cols, "cols")
      for(let j = 0; j < cols.length; j++){
        obj[headers[j]] = cols[j].trim()
      }
      rowArr.push(obj)
    }
    console.log(rowArr, "!@#!@#!@#!@#")





    let total = rowArr.length
    let current = 1;
    for(let i = 0; i < rowArr.length; i++){
      let r = rowArr[i]
      if (!r.number || !r["new sale price"]) continue
      let found = await fetch(`https://eddb.teliance.com/api/phone-numbers/filter?areaCode=${r.number.substring(0,3)}&searchString=${r.number.substring(3)}`)
      let notFound = !found.ok
      if (found.ok){
        found = await found.json()
        found = found[0]

      }
      
      let region = props.appStates.acRegions.find((a)=>a.area_code === r.number.substring(0,3))
      region = (region && region.region) || "NA"
      // see if it's a new entry, or if the price changed if it already exists...
      if(notFound || parseFloat(found.price) !== parseFloat(r["new sale price"])) {
        console.log(found, r["new sale price"],parseFloat(found.price) !== parseFloat(r["new sale price"]))
        //create new object..
        let newObj = {
          number: r.number,
          area_code: r.number.substring(0,3),
          region,
          available: 1,
          source: "teliance",
          price: r["new sale price"]
        }
        console.log("new obj", newObj)
        //call upsert...
        const response = await fetch("https://eddb.teliance.com/api/phone-numbers/upsert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"  // Set the content type to application/json
          },
          body: JSON.stringify(newObj)  // Stringify your object
        });
        let data = await response.data
        console.log(data, "upserted resp")
        //update progress..
        current++;
        setUploadProgress(Math.floor(current/total))

      } 
    }
    setUploadProgress(0)
    return csvContent

  }

  const handleBegin = async () => {
        await parseCSV(raw); // Call the manual parser
        //show success..
  }


  // Handle file change
  const handleFileChange =async (event) => {
    
    const selectedFile = event.target.files[0];  // Capture file input (event.target.files returns a FileList)
    if (selectedFile) {
      const reader = new FileReader();

      // Read the file as text
      reader.onload = async (e) => {
        const text = e.target.result;
        console.log(text)
        setRaw(text)
        
        // setCsvData(parsedData);
      };

      reader.readAsText(selectedFile);
    }
  };
  return (
    <Container maxWidth={false} sx={{mt:15}}>
       <Typography variant="h4" sx={{fontWeight:"bold"}}>CSV Import/Export</Typography>
       
       <Grid container spacing={2} flexDirection="row" sx={{mt:2}} >
        <Grid item lg={6} >
          <Card >
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container flexDirection="column" sx={{width: "50%"}} spacing={2} gap={2}>
            <Typography variant="h6" sx={{fontWeight:"bold", mb: 2}}>Import CSV</Typography>
            <Button
            color="info"
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
            <Typography>
              Upload Csv
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                multiple
                accept="text/csv"
              />
              </Typography>
            </Button>
            <Button variant="contained" disabled={!raw} onClick={handleBegin}>Begin</Button>
            <CircularProgress variant="determinate" value={uploadProgress} />
            </Grid>
          </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6} >
          <Card elevation={3} sx={{overflow:'visible'}}>
          <CardContent >
          <Typography variant="h6" sx={{fontWeight:"bold"}}>Export to CSV</Typography>
          <Typography  sx={{fontWeight:"bold"}}>Filters:</Typography>
          <FormControl sx={{width:"80%", mt: 2}} >
            <Autocomplete
              disablePortal
              options={Array.from(new Set(props.appStates.acRegions.map(a=>a.area_code))).sort((a,b)=>a-b)}
              value={exportAreaCode}
              id="areaCode"
              onChange={(e)=>setExportAreaCode(e.target.innerText)}
              label="Area Code"
              defaultValue=""
              renderInput={(params) => <TextField {...params} label="Area Code" />}
            />
          </FormControl>
          <FormControl sx={{width:"80%", mt: 2}} >
            <Autocomplete
              disablePortal
              options={Array.from(new Set(props.appStates.acRegions.map(a=>a.region))).sort((a,b)=>a-b)}
              value={exportRegion}
              id="region"
              onChange={(e)=>setExportRegion(e.target.innerText)}
              label="Region"
              defaultValue=""
              renderInput={(params) => <TextField {...params} label="Region" />}
            />
          </FormControl>
          <FormControl sx={{width:"80%", mt: 2}} >
            <Autocomplete
              disablePortal
              options={["ringboost", "teliance"]}
              value={exportSource}
              id="source"
              onChange={(e)=>setExportSource(e.target.innerText)}
              label="Source"
              defaultValue=""
              renderInput={(params) => <TextField {...params} label="Source" />}
            />
          </FormControl>
          <FormControl sx={{width:"80%", mt: 2}} >
            <Autocomplete
              disablePortal
              options={["Available", "Unavailable"]}
              value={exportAvailable}
              id="available"
              onChange={(e)=>setExportAvailable(e.target.innerText)}
              label="Available"
              defaultValue=""
              renderInput={(params) => <TextField {...params} label="Available/unavailable" />}
            />
          </FormControl>
          <Box sx={{mt:2}}>
          <Button variant="contained" color="info" onClick={handleExport}>Export</Button>
          <Collapse in={resultsAlert} >
            <Alert onClose={()=>setResultsAlert(false)} severity="info" sx={{m: 3}}>
              {results.length} Results.
            </Alert>
          </Collapse>
            </Box>
          </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    );
}