import { AppBar,Toolbar,IconButton,Typography,Box ,Slide,useScrollTrigger,useTheme,useMediaQuery,Avatar} from "@mui/material";
import {Public as LogIcon,
  Add as AddIcon,
  LightMode as LightModeIcon,
  AccountCircle as ProfileIcon,
  DarkMode as DarkModeIcon,
  Menu as MenuIcon
} from "@mui/icons-material";

import { useApp } from "../ThemeApp";
import { useNavigate } from "react-router-dom";

export default function Header(){
  const navigate=useNavigate();
  const theme=useTheme();
  const isMobile=useMediaQuery(theme.breakpoints.down("sm"));

  const trigger=useScrollTrigger();
  const {mode,setMode,showDrawer,setShowDrawer,auth}=useApp();
  
  const moveTrigger=isMobile?trigger:false;
  
  return (
    <Box sx={{mb:10, }}>
      <Slide appear={false} direction="down" in={!moveTrigger} >
         <AppBar position="fixed" sx={{zIndex: 1200}} >
<Toolbar >
  <IconButton onClick={()=>{
    setShowDrawer(!showDrawer)
  }}>
    <MenuIcon  color="inherit"/>
  </IconButton>
  <Typography sx={{color:mode==="dark"?"blue":"#F5F5F5",fontSize:"18px",fontWeight:"bold",ml:1}}>SOCIAL</Typography>
<Box sx={{flexGrow:1} }/>
  <IconButton  onClick={()=>{
            navigate(`/addpost`)
          }}>
    <AddIcon color="inherit" sx={{color:"banner"}} />
  </IconButton>

  {mode==="dark"?(<IconButton onClick={()=>{
    setMode("light")
  }}>
    <LightModeIcon sx={{color:"banner"}}/>
  </IconButton>):(<IconButton onClick={()=>{
    setMode("dark")
  }}>
    <DarkModeIcon  sx={{color:"banner"}}/>
  </IconButton>)}
<IconButton onClick={(e)=>{
  e.stopPropagation();
navigate(`/profile/${auth.id}`)

}}>
  {auth?(<Avatar sx={{ width: {
    sm:40,
    xs:30
  },
      height: {
    sm:40,
    xs:30
  },}} src={auth.image}/>):(  <ProfileIcon sx={{color:"banner"}}/>)}

</IconButton>
</Toolbar>
      </AppBar>
      </Slide>
     
    </Box>
  )
}