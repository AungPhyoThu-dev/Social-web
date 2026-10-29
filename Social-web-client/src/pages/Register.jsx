import { Box,Container,Typography,TextField,Button,Alert,Card,CardContent } from "@mui/material";
import{Public as LogoIcon} from "@mui/icons-material"
import { useRef } from "react";
import { useApp } from "../ThemeApp";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { PostUser } from "../fetchers/auth";
export default function Register(){
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
    <Card  sx={{
    maxWidth: 500,
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
        <Button type="submit" variant="contained" sx={{mt:3}} >SUBMIT</Button>
      </Box>
    </form>
  </Box>
      </CardContent>
    </Card>
  
  )
}