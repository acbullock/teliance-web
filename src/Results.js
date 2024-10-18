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
  { field: 'number', headerName: 'Phone Number', width: 200, flex:1, align: "center", headerAlign: 'center', headerClassName: "primary" },
  // { field: 'region', headerName: 'State', width: 150 , flex:1, align: "center", headerAlign: 'center',},
  { field: 'price', headerName: 'Price', width: 150, flex:1, align: "center", headerAlign: 'center',renderCell: (params)=>{
    return <Button variant="outlined">{params.value}</Button>

  }},
];
const paginationModel = { page: 0, pageSize: 5 };

export default function Results(props) {

  return (
    <Container maxWidth={false} sx={{mt:15,}}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box component="section" 
          display={props.results.length > 0 ? "flex" : "none"}
          justifyContent="center"
          alignItems="center"
          maxWidth="md"
          style={{ height: '80%',  width: '100%' }}>
            <Filters />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box  component="section" 
          display={props.results.length > 0 ? "flex" : "none"}
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