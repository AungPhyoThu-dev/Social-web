import { useApp } from "./ThemeApp";
import {Box,Container,Snackbar,Typography} from   "@mui/material";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import AppDrawer from "./components/AppDrawer";
export default function Template(){
  const {globalMsg,setGlobalMsg}=useApp();
  return (
    <Box sx={{ minHeight: "100vh", width: "100%" }}>
      <Header/>
      <AppDrawer/>
      <Container maxWidth="lg"   sx={{
    mt: 0,
    p: 0,
  }} disableGutters>
       
        <Outlet/>
      </Container>
      <Snackbar anchorOrigin={{
        horizontal:"center",
        vertical:"center",
        alignItem:"center"
      }} open={Boolean(globalMsg)}  autoHideDuration={5000} onClose={()=>setGlobalMsg(null)} message={globalMsg}  slotProps={{
  content: {
    sx: {
      justifyContent: "center",
      textAlign: "center",
    },
  },
}}></Snackbar>
    </Box>
  )
}