import * as React from 'react';
import { styled } from '@mui/material/styles';
import { 
  Typography,
  Container,
  Grid, 
  Card, 
  CardContent,
  Button, 
  CircularProgress 
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
       
       <Grid container spacing={1} flexDirection="row" sx={{mt:2}} >
        <Grid item lg={6} >
          <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container flexDirection="column" sx={{width: "50%"}} spacing={2} gap={2}>
            <Typography variant="h6" sx={{fontWeight:"bold", mb: 2}}>Import CSV</Typography>
            <Button
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
        <Grid item lg={6}>
          <Card>
          <CardContent>
          <Typography variant="h6" sx={{fontWeight:"bold"}}>Export to CSV</Typography>
          </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
    );
}