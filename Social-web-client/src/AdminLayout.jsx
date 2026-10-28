import { Outlet } from "react-router-dom";
import{Box,Container,Snackbar} from "@mui/material";
import { useApp } from "./ThemeApp";
import AppDrawer from "./components/AppDrawer";
import Header from "./components/Header";
export default function AdminLayout(){
    const {globalMsg,setGlobalMsg}=useApp();
    return (
      <Box sx={{width:"100%",height:"100vh"}}>
   <Header/>
      <AppDrawer/>
       <Box sx={{width:"100%",mt:0}}>
        <Outlet/>
       </Box>
          
        
        <Snackbar anchorOrigin={{
          horizontal:"center",
          vertical:"center",
          alignItem:"center"
        }} open={Boolean(globalMsg)}  autoHideDuration={5000} onClose={()=>setGlobalMsg(null)} message={globalMsg}></Snackbar>
      </Box>
    )
}