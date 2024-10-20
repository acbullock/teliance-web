import { Typography, Container, Grid, Button, Card, CardContent } from '@mui/material'; 
import Box from '@mui/material/Box';
import Filters from "./Filters"
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'number',  headerName: 'Phone Number', width: 200, flex:1, align: "center", headerAlign: 'center', headerClassName: "primary" , renderCell: (params)=>{
    return <Typography variant="h6" sx={{mt: 1}}>{params.value}</Typography>
  }},
   { field: 'region', headerName: 'State', width: 150 , flex:1, align: "center", headerAlign: 'center', renderCell: (params)=>{
    return <Typography variant="h6" sx={{mt: 1}}>{params.value}</Typography>
   }},
  { field: 'price', headerName: 'Price', width: 50, flex:1, align: "center", headerAlign: 'center',sortComparator: (v1, v2) => parseFloat(v1.replace("$", "")) - parseFloat(v2.replace("$", "")), renderCell: (params)=>{
    return <Button variant="outlined"><Typography variant="h6">{params.value}</Typography></Button>

  }},
];
const paginationModel = { page: 0, pageSize: 10 };

export default function Results(props) {

  return (
    <Container maxWidth={false} sx={{mt:5}}>
      <Grid container spacing={2} >
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
          <CardContent>
          <Box component="section" 
          justifyContent="center"
          alignItems="center"
          maxWidth="md"
          style={{ height: '80%',  width: '100%' }}>
            <Filters filter={props.filter} results={props.results} updateResults={props.updateResults} search={props.search} homeState={props.homeState} homeSetters={props.homeSetters}/>
          </Box>
          </CardContent>
          </Card>
        </Grid>

        <Grid item  xs={12} md={8}>
        
          <Box  component="section" 
          justifyContent="center"
          alignItems="center"
          style={{ height: '60%',  width: '100%' }}
           maxWidth="md"
          >
          <Card elevation={3}>
          <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Results</Typography>
           <DataGrid
            autoHeight
            rows={props.results.length > 0 ? props.results : []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 25, 50]}
            

        />
        </CardContent>
          </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
    );
}