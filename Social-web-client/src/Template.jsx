import { useApp } from "./ThemeApp";
import {Box,Container,Snackbar} from   "@mui/material";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import AppDrawer from "./components/AppDrawer";
export default function Template(){
  const {globalMsg,setGlobalMsg}=useApp();
  return (
    <Box>
      <Header/>
      <AppDrawer/>
      <Container maxWidth="md" sx={{ mt: 4,}}>
        <Outlet/>
      </Container>
      <Snackbar anchorOrigin={{
        horizontal:"center",
        vertical:"center",
        alignItem:"center"
      }} open={Boolean(globalMsg)}  autoHideDuration={5000} onClose={()=>setGlobalMsg(null)} message={globalMsg}></Snackbar>
    </Box>
  )
}