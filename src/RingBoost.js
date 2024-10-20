import React from 'react'
import { 
  Typography,
  Container,
  Button,
  Box,
  CircularProgress,
  Collapse,
  Alert
} from '@mui/material'; 
export default function RingBoost() {
  const [loading, setLoading] = React.useState(false)
  const [successAlert, setSuccessAlert] = React.useState(false)
  const [errorAlert, setErrorAlert] = React.useState(false)
  const handleImport = async () => {
    setLoading(true)
    setErrorAlert(false)
    setSuccessAlert(false)
    let found = await fetch(`https://eddb.teliance.com/api/phone-numbers/ringBoostImport`)
    if(found.ok) {
      setLoading(false)
      setSuccessAlert(true)
    }
    else{
      setLoading(false)
      setErrorAlert(true)
    }
    


  }




  return (
    <Container maxWidth={false} sx={{mt:2, display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50%"}}>
      <Box sx={{display:"flex", flexDirection: "column"}} spacing={2} gap={2}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" sx={{fontWeight:"bold"}}>Ringboost Import</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box display={loading?"flex" : "none"} sx={{alignX: "center", justifyContent: "center"}}>
          <CircularProgress color="warning"/>
          
          </Box>
          <Collapse in={successAlert} >
               <Alert onClose={()=>setSuccessAlert(false)} severity="success" sx={{m: 3}}>
                 Import Complete!
               </Alert>
            </Collapse>
            <Collapse in={errorAlert} >
            <Alert onClose={()=>setErrorAlert(false)} severity="error" sx={{m: 3}}>
                 Error importing..
               </Alert>
               </Collapse>
          <Button disabled={loading} variant="contained" color="info" onClick={handleImport}><Typography variant="h3">Import</Typography></Button>
        </Box>
      </Box>
    </Container>
    );
}