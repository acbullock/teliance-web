import React from "react";
import { Typography, Container, Tabs, Tab,Box } from '@mui/material'; 
import AddPhoneNumber from "./AddPhoneNumber"
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
export default function Admin(props) {
const [currentTab, setCurrentTab] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
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
          <Tabs variant="scrollable" value={currentTab} onChange={handleChangeTab} aria-label="admin tabs">
            <Tab label="Add Number" {...a11yProps(0)} />
            <Tab label="Edit Number" {...a11yProps(1)} />
            <Tab label="CSV Import" {...a11yProps(2)} />
            <Tab label="RingBoost" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={currentTab} index={0}>
          <AddPhoneNumber appStates={props.appStates} appSetters={props.appSetters}/>
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={1}>
          Edit Number..
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={2}>
          CSV Import..
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={3}>
          RingBoost..
        </CustomTabPanel>
      </Box>
    </Container>
    );
}