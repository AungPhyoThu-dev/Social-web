import { Box,Container,Typography,CircularProgress,Alert,Card,useMediaQuery,useTheme } from "@mui/material"
import { useMutation, useQuery } from "@tanstack/react-query";
import { Friends } from "../fetchers/auth";
import { useApp, queryClient } from "../ThemeApp";
import{  AccountCircle as ProfileIcon,ArrowBack as BackIcon,Group as FriendIcon,GroupAdd as FollowingIcon,PersonAdd as FollowerIcon}from "@mui/icons-material"
export default function Home(){
const theme=useTheme();
const isMobile=useMediaQuery(theme.breakpoints.down("sm"))
const {mode,storeFriendPage,setStoreFriendPage}=useApp();
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
<Card sx={{width:"100%",height:600,userSelect:"none"}}>
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
<Box sx={{display:'flex',mt:3,ml:{sm:3,},gap:2,cursor:"pointer"}}>
<Box onClick={()=>{
  setStoreFriendPage(1)
}} sx={{ flex: 1,
      minWidth: 0,
      height: { xs: 40, sm: 50 },bgcolor: storeFriendPage === 1
  ? "#2196F3"
  : mode === "dark" ? "gray" : "black",px: { xs: 0.5, sm: 2 },
py: { xs: 0.5, sm: 2 },display:"flex",textAlign:"center",justifyContent:"center",borderRadius:30,gap:1}}>
    <>
       {!isMobile&& (<FriendIcon/>)}
{!isMobile?(<Typography>Total Friends ({data?.totalFriends})</Typography>):(<Typography sx={{fontSize:{xs:12}}}>Total Friends</Typography>)}
    </>
 

</Box>
<Box onClick={()=>{
  setStoreFriendPage(2)
}} sx={{ flex: 1,
      minWidth: 0,
      height: { xs: 40, sm: 50 },bgcolor: storeFriendPage === 2
  ? "#2196F3"
  : mode === "dark" ? "gray" : "black",px: { xs: 0.5, sm: 2 },
py: { xs: 1.5, sm: 2 },display:"flex",textAlign:"center",justifyContent:"center",borderRadius:30,gap:1}}>
  <>
     {!isMobile && (<FollowingIcon/>)}
     {!isMobile?(<Typography>Followings ({data?.totalFollowings})</Typography>):(<Typography sx={{fontSize:{xs:12}}}>Followings</Typography>)}
  </>
 


</Box>
<Box onClick={()=>{
  setStoreFriendPage(3)
}} sx={ {flex: 1,
      minWidth: 0,
      height: { xs: 40, sm: 50 },bgcolor: storeFriendPage === 3
  ? "#2196F3"
  : mode === "dark" ? "gray" : "black",px: { xs: 0.5, sm: 2 },
py: { xs: 1.5, sm: 2 },display:"flex",textAlign:"center",justifyContent:"center",borderRadius:30,gap:1}}>
  <></>
{!isMobile && <FollowingIcon/>}
{!isMobile?(<Typography>Followers ({data?.totalfollowers})</Typography>):(<Typography sx={{fontSize:{xs:12}}}>Followers</Typography>)}

</Box>
</Box>
      </Box>
    </Card>
    
{data?.data?.map((friend)=>{
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