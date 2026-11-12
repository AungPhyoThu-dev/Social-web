import { Box, TextField, Typography, Alert, Button,Card,CardContent } from "@mui/material";
import { useRef } from "react";
import { useApp } from "../ThemeApp";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../fetchers/auth";
import { useMutation } from "@tanstack/react-query";
import{Public as LogoIcon} from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";
import logo2 from "../bg/logo2.jpg";
import{Link} from "react-router-dom";
export default function Login() {
   const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { setGlobalMsg, setError, error ,setAuth,auth} = useApp();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (!username || !password) {
      setError("Username and Password is required");
      return false;
    }
     login.mutate({ username, password });
  };
 
  const login = useMutation({
    mutationFn: (data) => LoginUser(data),
    onError:(err)=>{
      setError(err?.message)
    },
    onSuccess:async result=>{
      localStorage.setItem("token",result.token);
      setAuth(result.user);
      navigate("/");
      setGlobalMsg("Login Success")
    }
  });
console.log(auth);
 return(
  <Box  sx={{
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

  }}>
    {isMobile?(   <Box sx={{ width: "100%" }}>
      <Card  sx={{
  width:"100%",
    mx: "auto",
    
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    boxShadow: 3,
    height:"auto",
    mb:{xs:-3.2}
  }}>
      <CardContent  sx={{ p: 2}}>
        <Box sx={{maxWidth:500,display:"flex", mx: "auto",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
         
     
      {error && <Alert sx={{mb:2}} severity="warning">{error}</Alert>}
      <form onSubmit={ handleSubmit} style={{width:"100%"}}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption" sx={{mb:1}}>Username</Typography>
          <TextField
            onChange={() =>setError(null)}
          sx={{mb:1}}
            placeholder="Username"
            name="username"
            autoComplete="off"
            fullWidth 
            inputRef={usernameRef}
          />
          <Typography variant="caption" sx={{ mt: 2,mb:1 }}>
            Password
          </Typography>
          <TextField
            onChange={() => setError(null)}
          sx={{mb:1}}
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            inputRef={passwordRef}
            fullWidth
            
          />

          <Button type="submit" variant="contained" sx={{ mt: 2,mb:2 }}>
            Submit
          </Button>
          <Box  sx={{display:"flex",justifyContent:"center"}}>
              <Typography>
        Don't have account?{" "}
        <Link to="/register" >
        Register
        </Link>
       </Typography>
          </Box>
     
        </Box>
      </form>
    </Box>
      </CardContent>
    </Card>
    </Box> ):(    <Card  sx={{
    maxWidth: 500,
    
    mx: "auto",
    
    borderRadius: 3,
    boxShadow: 3,
  }}>
      <CardContent  sx={{ p: 4 }}>
        <Box sx={{maxWidth:500,display:"flex", mx: "auto",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
           <LogoIcon sx={{color:"blue",fontSize:40,mb:1}}/>
      <Typography  sx={{ mb: 2,fontSize:26 }}>
        Login
      </Typography>
      {error && <Alert sx={{mb:2}} severity="warning">{error}</Alert>}
      <form onSubmit={ handleSubmit} style={{width:"100%"}}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption" sx={{mb:1}}>Username</Typography>
          <TextField
            onChange={() =>setError(null)}
          sx={{mb:1}}
            placeholder="Username"
            name="username"
            autoComplete="off"
            fullWidth 
            inputRef={usernameRef}
          />
          <Typography variant="caption" sx={{ mt: 2,mb:1 }}>
            Password
          </Typography>
          <TextField
            onChange={() => setError(null)}
          sx={{mb:1}}
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            inputRef={passwordRef}
            fullWidth
            
          />

          <Button type="submit" variant="contained" sx={{ mt: 2,mb:2 }}>
            Submit
          </Button>
          <Box  sx={{display:"flex",justifyContent:"center"}}>
              <Typography>
        Don't have account?{" "}
        <Link to="/register" >
        Register
        </Link>
       </Typography>
          </Box>
     
        </Box>
      </form>
    </Box>
      </CardContent>
    </Card>)}
  </Box>

  )
}
