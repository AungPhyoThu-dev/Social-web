import { Box,Container,Typography,CircularProgress,Alert,Card } from "@mui/material"
import { useMutation, useQuery } from "@tanstack/react-query";
import { Friends } from "../fetchers/auth";

import{  AccountCircle as ProfileIcon,ArrowBack as BackIcon}from "@mui/icons-material"
export default function Home(){

  const{data,isLoading,isError,error}=useQuery({
queryKey:["friends"],
queryFn:async()=>Friends(),
  })
    if (isLoading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
    if (isError) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      );
    }
    console.log(data)
  return(
<Box >
  <Container maxWidth="md">
<Card sx={{width:"100%",height:600,}}>
  <Box>
    <Box sx={{display:'flex',mt:3,ml:{sm:3,xs:1},gap:{sm:2,xs:2}}}>
      <Box sx={{borderRadius:50,border:"1px solid transparent",   width: {sm:30,xs:25},
      height: {sm:30,xs:25},display:'flex',alignItems:"center",justifyContent:'center',mt:{xs:1,sm:1.6},bgcolor:"gray"}}>
        <BackIcon sx={{fontSize:{xs:18,sm:20}}}/>
      </Box>
<Box>
      <Typography sx={{mt:{xs:0.5},fontSize:{sm:30,xs:22},fontWeight:"bold"}}>Friends</Typography>
      <Typography variant="caption" sx={{color:'gray'}}>All your frineds in one place</Typography>
</Box>
  
      
    </Box>
    <Card sx={{width:"100%",height:400,bgcolor:"transparent",mt:3}}>
      <Box >

      </Box>
    </Card>
    
{data?.map((friend)=>{
  return(
    <Box>
      
      </Box>
  )
})}
  </Box>
</Card>
  </Container>
</Box>
  )
}