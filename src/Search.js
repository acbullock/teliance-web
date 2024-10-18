import { Typography, Container } from '@mui/material'; 
export default function Search() {
  return (
    <Container maxWidth={false} sx={{mt:15}}>
      <Typography variant="h2">Find Your Number!</Typography>
      <Typography variant="h6">Pricing for Every Business</Typography>
    </Container>
    );
}