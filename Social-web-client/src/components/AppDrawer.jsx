import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  ListItem,
  Box,
  Drawer,
  Avatar,
  CssBaseline,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery,
  Collapse
  
} from "@mui/material";

import { queryClient, useApp } from "../ThemeApp";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import{Logout}from "../fetchers/auth"
import {
  HomeOutlined as HomeIcon,
  PersonAdd as RegisterIcon,
  Login as LoginIcon,
 
  AccountCircle as ProfileIcon,
  GroupAdd as FriendIcon,
  Public as LogoIcon,
  
  Logout as LogoutIcon,
  WavingHand as WelcomeIcon,
  Dashboard as DashboardIcon,
  LocalPolice as AdminIcon,
   ExpandLess as ExpandIcon,
} from "@mui/icons-material";

export default function AppDrawer() {
  const theme=useTheme();
  const isMobile=useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet=useMediaQuery(theme.breakpoints.between("sm","lg"))
  const { auth, showDrawer, setShowDrawer, mode,setAuth,adminOpen,setAdminOpen,setGlobalMsg } = useApp();
  const openDrawer=isMobile||isTablet?showDrawer:true;
  const navigate = useNavigate();
  console.log(auth);
 const logoutMutation=useMutation({
  mutationKey:["logout"],
  mutationFn:async()=>{
    return Logout();
  },
 onSuccess:async()=>{
  await queryClient.invalidateQueries();
  setAuth(null);
  setShowDrawer(false);
  navigate("/login"),
  setGlobalMsg("Logout successful")
 },
 onError:(error)=>{
  console.log(error)
 }
 })

  return (
    <Drawer
      open={openDrawer}
      variant={isMobile||isTablet?"temporary":"permanent"}

      onClose={() => {
        setShowDrawer(false);
      }}
      
    >
      <Box
        sx={{
          width: { xs: 180, sm: 230 },
 zIndex: 1300,
          position: "static",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
       <Box
  sx={{
    width: "100%",
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.5,
  }}
>
  <LogoIcon sx={{ fontSize: 35, color: "blue" }} />

  <Typography
    sx={{
      fontWeight: 800,
      fontFamily: "Arial, sans-serif",
      fontSize: "1.2rem",
    }}
  >
    Social
  </Typography>
</Box>
       <Box sx={{display:"flex",alignItems:"center",gap:1.2,mb:4,}}>
<Typography  variant="body2"
      
      sx={{ lineHeight: 1.2,color:mode==="dark"?"white":"black" ,fontWeight:"bold",fontSize:{
        sm:17
      }}}>Welcome back</Typography>
      <WelcomeIcon sx={{fontSize:18,color:"blue"}}/>
       </Box>
        <Divider sx={{ width: "100%" }} />
        <List
          sx={{
            p: 0,
            width: "100%",
            color: mode === "dark" ? "white" : "black",
          }}
        >
          <ListItem>
            <ListItemButton
              disableRipple
              onClick={() => {
                navigate("/");
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
          {!auth ? (
            <>
              <ListItem>
                <ListItemButton
                  disableRipple
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  <ListItemIcon>
                    <RegisterIcon />
                  </ListItemIcon>
                  <ListItemText>Register</ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton
                  disableRipple
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText>Login</ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ) : (
            <>
              <ListItem>
                <ListItemButton
                  disableRipple
                  onClick={() => {
                    navigate(`/profile/${auth.id}`);
                    console.log(auth.id)
                  }}
                >
                  <ListItemIcon>
                    <ProfileIcon />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemButton
                  disableRipple
                  onClick={() => {
                    navigate("/friends");
                  }}
                >
                  <ListItemIcon>
                    <FriendIcon />
                  </ListItemIcon>
                  <ListItemText>Friends</ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          )}
          {auth?.role==="admin"&&(
            <>
            <ListItem>
               <Box sx={{ display: "flex", gap: 1 }}>
                              <AdminIcon
                                sx={{ color: "gary", fontSize: 25, flexShrink: 0,ml:2 }}
                              />
                              <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Typography
                                  sx={{
                                     color: mode === "dark" ? "white" : "black",
                                    fontWeight: 600,
                                    mt:0.2,
                                    fontSize: {
                                      sm: 15,
                                      xs: 14,
                                    },
                                    fontFamily: '"Inter", sans-serif',
                                  }}
                                >
                                  Admin
                                </Typography>
            
                            
                              </Box>
                            </Box>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                setAdminOpen(!adminOpen);
                              }}
                            >
                              <ExpandIcon
                                sx={{ color: mode === "dark" ? "white" : "black", fontSize: 30, cursor: "pointer",  transform: adminOpen ? "rotate(180deg)" : "rotate(0deg)", }}
                              />
                            </IconButton>
                          
            </ListItem>
           {adminOpen && (
            <Collapse in={adminOpen} timeout={300} unmountOnExit>
              
                <ListItem sx={{mt:-2}}>
                <ListItemButton
                  disableRipple
                  onClick={() => {
                    navigate(`/admin`);
                   
                  }}
                >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText>Dashboard</ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider/>
                   <ListItem sx={{mt:0.5,mb:0.5}}>
                <ListItemButton
                  disableRipple
                  onClick={() => {
                    navigate(`/admin/useradmin`);
                   
                  }}
                >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText>Users</ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider/>
                   <ListItem sx={{mt:0.5,mb:0.5}}>
                <ListItemButton
                  disableRipple
                  onClick={() => {
                    navigate(`/admin/postadmin`);
                   
                  }}
                >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText>Posts</ListItemText>
                </ListItemButton>
              </ListItem>
              <Divider/>
            </Collapse>
           )}
            </>
          )}
        
        </List>
         <Divider  sx={{
    borderColor: "grey.400",
    width: "100%",
    mt: "auto",
  }}/>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",

            bgcolor: "linear-gradient(135deg, #6a1b9a, #9c27b0)",
            width: "100%",
            height: 150,
            color: mode === "dark" ? "white" : "black",
            mt: "auto",
          }}
        >
 
         

          {auth ? (
            <>
             <Box sx={{display:"flex",flexDirection:"column"}} onClick={()=>{
              navigate(`/profile/${auth.id}`)
             }}>
            
                    <Typography
              sx={{  fontWeight: "bold", fontSize:16,ml:1}}>

              {auth?.username}
            </Typography>
              
          
            
            <Typography  sx={{color: "text.secondary",fontSize:12}}>{auth?.bio}</Typography>
            
            </Box>
            <Box sx={{
mb:2
            }}>
              <IconButton onClick={(e)=>{
              e.stopPropagation();
              logoutMutation.mutate()
              }}>
              <LogoutIcon sx={{color:"error.main","&:hover":{
                color:"error.light"
              }}}/>
            </IconButton>
            </Box>
            
            </>
           
           
          
          ) : (
            <Typography
              sx={{ ml: 2, fontWeight: "bold", textTransform: "capitalize" }}
            >
              GUEST
            </Typography>
          )}
        </Box>
      </Box>
    </Drawer> 
  );
}
