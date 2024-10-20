import React from "react";
import { Typography, Container, Tabs, Tab,Box } from '@mui/material'; 
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
export default function Admin() {
const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
  return (
    <Container maxWidth={false} sx={{mt:15}}>
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Manage Phone Numbers</Typography>
        
      <Box sx={{ width: '100%', mt: 5 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Add Number" {...a11yProps(0)} />
            <Tab label="Edit Number" {...a11yProps(1)} />
            <Tab label="CSV Import" {...a11yProps(2)} />
            <Tab label="RingBoost" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          Add Number..
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Edit Number..
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          RingBoost..
        </CustomTabPanel>
      </Box>
    </Container>
    );
}