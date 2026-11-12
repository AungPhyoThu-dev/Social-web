import { Box,Container,Typography,TextField,Button,Alert,Card,CardContent } from "@mui/material";
import{Public as LogoIcon} from "@mui/icons-material"
import { useRef,useEffect } from "react";
import { useApp } from "../ThemeApp";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { PostUser } from "../fetchers/auth";
import { useTheme, useMediaQuery } from "@mui/material";
import logo2 from "../bg/logo1.jpg";
export default function Register(){
  useEffect(() => {
  setError(null);
}, []);
 const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 const {error,setError,setGlobalMsg}=useApp();
  const navigate=useNavigate();
  const nameRef=useRef();
  const usernameRef=useRef();
  const bioRef=useRef();
  const passwordRef=useRef();
  const handleSubmit=(e)=>{
    e.preventDefault();
    const name=nameRef.current.value;
    const username=usernameRef.current.value;
    const bio=bioRef.current.value;
    const password=passwordRef.current.value;
     if(!username||!name||!password){
   setError("username,name and password is required");

   return false;
  }
  create.mutate({username,name,bio,password});

}
 const create=useMutation({
  mutationFn:async(data)=>PostUser(data),
  onError:async()=>{
    setError("Cannot create Register")
  },
  onSuccess:async()=>{
    navigate("/login");
setGlobalMsg("Register is successful")
  }
 })

  return(
    <Box>
      {isMobile?(<Box  sx={{
              minHeight: "100vh",
          backgroundImage: `url(${logo2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display:"flex",
          justifyContent:"center",
          alignItems:"flex-end",
                pb: 3,
            px: 0,
      position:'relative'
        }}>
      <Box  sx={{ width: "100%" }}> <Card   sx={{
  width:"100%",
    mx: "auto",
    
    
    
    position:"absolute",
     mb: 0,
    bgcolor:"black",
     bottom: 0,

  }}>
      <CardContent >
<Box sx={{maxWidth:500,display:"flex", mx: "auto",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>

   {error && (
     <Alert severity="warning">{error}</Alert>
   )}
   <Typography

  sx={{
    fontWeight: 700,
    mb: 1,
    color: "#2196F3",
    textAlign: "center",
    letterSpacing: 1,
  }}
>
  Create Account
</Typography>
    <form onSubmit={handleSubmit}  style={{width:"100%"}} >
      <Box sx={{display:"flex",flexDirection:"column"}}>
        <Typography  sx={{mt:1,fontWeight:"bold",color:"white"}} variant="caption">Username</Typography>
        <TextField  sx={{
    mb: 1,
    "& .MuiInputBase-input": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#777",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#bbb",
      opacity: 1,
    },
  }}  fullWidth placeholder="Username" inputRef={usernameRef} autoComplete="off"/>
           <Typography sx={{mt:2,color:"white"}} variant="caption">Name</Typography>
        <TextField   sx={{
    mb: 1,
    "& .MuiInputBase-input": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#777",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#bbb",
      opacity: 1,
    },
  }} fullWidth placeholder="Name" inputRef={nameRef} />
           <Typography sx={{mt:2,color:"white"}} variant="caption">Bio</Typography>
        <TextField   sx={{
    mb: 1,
    "& .MuiInputBase-input": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#777",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#bbb",
      opacity: 1,
    },
  }} fullWidth placeholder="Bio" inputRef={bioRef} />
           <Typography sx={{mt:2,color:"white"}} variant="caption">Password</Typography>
        <TextField  sx={{
    mb: 1,
    "& .MuiInputBase-input": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#777",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#bbb",
      opacity: 1,
    },
  }} fullWidth placeholder="Password" name="password" type="password" inputRef={passwordRef} autoComplete="new-password" />
        <Button type="submit" variant="contained" sx={{mt:3,  bgcolor: "#2196F3"}} >SUBMIT</Button>
      </Box>
    </form>
  </Box>
      </CardContent>
    </Card></Box>
    </Box>):( <Box sx={{display:"flex",
      justifyContent:"center",
      alignItems:"center",
         minHeight: "100vh",
    }}>
       <Card  sx={{
   width:600,
    alignItems:"center",
    mx: "auto",
   
    borderRadius: 3,
    boxShadow: 3,
  }}>
      <CardContent >
<Box sx={{maxWidth:500,display:"flex", mx: "auto",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
  <LogoIcon sx={{color:"blue",fontSize:40,mb:1}}/>
    <Typography  sx={{fontWeight:"bold",fontSize:26}}>Register</Typography>
   {error && (
     <Alert severity="warning">{error}</Alert>
   )}
    <form onSubmit={handleSubmit}  style={{width:"100%"}} >
      <Box sx={{display:"flex",flexDirection:"column"}}>
        <Typography sx={{mt:1,fontWeight:"bold"}} variant="caption">Username</Typography>
        <TextField   fullWidth placeholder="Username" inputRef={usernameRef} autoComplete="off"/>
           <Typography sx={{mt:2}} variant="caption">Name</Typography>
        <TextField   fullWidth placeholder="Name" inputRef={nameRef} />
           <Typography sx={{mt:2}} variant="caption">Bio</Typography>
        <TextField   fullWidth placeholder="Bio" inputRef={bioRef} />
           <Typography sx={{mt:2}} variant="caption">Password</Typography>
        <TextField   fullWidth placeholder="Password" name="password" type="password" inputRef={passwordRef} autoComplete="new-password" />
        <Button type="submit" variant="contained" sx={{mt:3,  bgcolor: "#2196F3"}} >SUBMIT</Button>
      </Box>
    </form>
  </Box>
      </CardContent>
    </Card>
    </Box>)}
    </Box>
   
   
  
  )
}