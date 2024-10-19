import { Typography, Container, Grid, Stack, Button } from '@mui/material'; 
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Filters from "./Filters"
import { DataGrid } from '@mui/x-data-grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));
const columns = [
  { field: 'number', headerName: 'Phone Number', width: 200, flex:1, align: "center", headerAlign: 'center', headerClassName: "primary" , renderCell: (params)=>{
    return <Typography variant="h6">{params.value}</Typography>
  }},
   { field: 'region', headerName: 'State', width: 150 , flex:1, align: "center", headerAlign: 'center', renderCell: (params)=>{
    return <Typography variant="h6">{params.value}</Typography>
   }},
  { field: 'price', headerName: 'Price', width: 50, flex:1, align: "center", headerAlign: 'center',renderCell: (params)=>{
    return <Button variant="outlined"><Typography variant="h6">{params.value}</Typography></Button>

  }},
];
const paginationModel = { page: 0, pageSize: 10 };

export default function Results(props) {

  return (
    <Container maxWidth={false} sx={{mt:5,}}>
      <Grid container spacing={2}>
        <Grid item md={12} lg={4}>
          <Box component="section" 
          justifyContent="center"
          alignItems="center"
          maxWidth="md"
          style={{ height: '80%',  width: '100%' }}>
            <Filters results={props.results} updateResults={props.updateResults} search={props.search} homeState={props.homeState} homeSetters={props.homeSetters}/>
          </Box>
        </Grid>

        <Grid item md={12} lg={8}>
          <Box  component="section" 
          justifyContent="center"
          alignItems="center"
          maxWidth="md"

          style={{ height: '80%',  width: '100%' }}
          >
           <DataGrid

            rows={props.results.length > 0 ? props.results : []}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            sx={{ mt: 10 }}

        />
          </Box>
        </Grid>
      </Grid>
    </Container>
    );
}