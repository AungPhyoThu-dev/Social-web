import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Card,
  useMediaQuery,
  useTheme,
  TextField,
  InputAdornment,
  Grid,
  Avatar,
  Button
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Friends,AddFriend,RemoveFriend,RemoveFollowing } from "../fetchers/auth";
import { useApp, queryClient } from "../ThemeApp";
import { useNavigate } from "react-router-dom";
import{Following} from "../fetchers/auth";
import {
  AccountCircle as ProfileIcon,
  ArrowBack as BackIcon,
  Group as FriendIcon,
  GroupAdd as FollowingIcon,
  PersonAdd as FollowerIcon,
  Search as SearchIcon,
  SentimentVeryDissatisfied as SadIcon,
  Person as MyFriendIcon
} from "@mui/icons-material";
import { fr } from "date-fns/locale";
export default function Friend() {
  const navigate=useNavigate();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { mode, storeFriendPage, setStoreFriendPage,auth ,setGlobalMsg,storeFriendUsername,setStoreFriendUsername,} = useApp();
  const removeFriendMutation=useMutation({
    mutationKey:["removeFriend"],
    mutationFn:async(id)=>{
      return RemoveFriend(id)
    },
     onSuccess:async()=>{
      await queryClient.invalidateQueries({
        queryKey:["friends"],
      
      });
      setGlobalMsg("Friend remove successfully!")
    },
    onError:(error)=>{
      console.log(error)
    }
  })
  const removeFollowingMutation=useMutation({
    mutationKey:["removeFollowing"],
    mutationFn:async(id)=>{
      return RemoveFollowing(id)
    },
      onSuccess:async()=>{
      await queryClient.invalidateQueries({
        queryKey:["friends"],
      
      });
      setGlobalMsg("Remove following successfully!")
    },
    onError:(error)=>{
      console.log(error)
    }
  })
  const addFriendMutation=useMutation({
    mutationKey:["addFriend"],
    mutationFn:async(id)=>{
      return AddFriend(id)
    },
    onSuccess:async()=>{
      await queryClient.invalidateQueries({
        queryKey:["friends"],
      
      });
      setGlobalMsg("Friend added successfully!")
    },
    onError:(error)=>{
      console.log(error)
    }
  })

const followingMutation=useMutation({
  mutationKey:["following"],
  mutationFn:async(id)=>{
    return Following(id)
  },
  onSuccess:async()=>{
    await queryClient.invalidateQueries({
      queryKey:["friends"]
    }),
  setGlobalMsg("Following successfully!")
  },
  onError:(error)=>{
    console.log(error)
  }
})


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => Friends(),
  });
  
  const friendsData=data?.data||[];

 const myfriendsData=data?.myFriends.map((myfriend)=>{
 return myfriend.userFriendId===auth.id ?{...myfriend.friendUser,friendShipId:myfriend.id}:{...myfriend.userFriend,friendShipId:myfriend.id}
 })||[];

  const followerData=friendsData.filter((followerFriends)=>{
 const isMyFriend=myfriendsData.some((myfriend)=>myfriend.id===followerFriends.id)
 return !isMyFriend &&     (followerFriends.followers||[]).length>0
    

  })
      const followFollowingData=friendsData.filter((followfollwing)=>{
      const isMyFriend=myfriendsData.some((myfriend)=>myfriend.id===followfollwing.id)
        return !isMyFriend;
      })
    
  const displayData=storeFriendPage===1?followFollowingData:storeFriendPage===2?followerData:myfriendsData;

  const filterFriendData=displayData.filter((friend)=>{
    
      const searchValue=storeFriendUsername.toLowerCase().trim();;
      const search=friend.username?.toLowerCase().includes(searchValue) || false;
      return search;

    
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

  return (
    <Box >
      <Container disableGutters maxWidth="md" >
        <Card sx={{ width: "100%", minHeight: "auto", userSelect: "none" }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                mt: 3,
                ml: { sm: 3, xs: 1 },
                gap: { sm: 2, xs: 2 },
              }}
            >
              <Box onClick={(e)=>{
                e.stopPropagation();
                navigate("/")
              }}
                sx={{
                  borderRadius: 50,
                  border: "1px solid transparent",
                  width: { sm: 30, xs: 25 },
                  height: { sm: 30, xs: 25 },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: { xs: 1, sm: 1.6 },
              
                }}
              >
                <BackIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </Box>
              <Box>
                <Typography
                  sx={{
                    mt: { xs: 0.5 },
                    fontSize: { sm: 30, xs: 22 },
                    fontWeight: "bold",
                  }}
                >
                  Friends
                </Typography>
                <Typography variant="caption" sx={{ color: "gray" }}>
                  All your frineds in one place
                </Typography>
              </Box>
            </Box>
            <Card
              sx={{
                width: "100%",
                minHeight: "auto",
                bgcolor: "transparent",
                mt: 3,
              }}
            >
              <Box>
                <Box sx={{ mt: 3, mx: { sm: 3, xs: 1 } }}>
                  <TextField
                  value={storeFriendUsername}
                  onChange={(e)=>setStoreFriendUsername(e.target.value)}
                    placeholder="Search Friends by username"
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                      },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent:"center",
                    mt: {sm:5,xs:3},
                    ml: { sm: 3 },
                    gap: {sm:2,xs:1},
                    cursor: "pointer",
                    mx:"1",
                    mb:{sm:6,xs:4},
                    WebkitTapHighlightColor: "transparent",
userSelect: "none"
                  }}
                >
                  <Box
                    onClick={() => {
                      setStoreFriendPage(1);
                    }}
                    sx={{
                      width:{sm:200,xs:80},
            
                      minWidth: 0,
                      height: { xs: 40, sm: 50 },
                      bgcolor:
                        storeFriendPage === 1
                          ? "#2196F3"
                          : mode === "dark"
                            ? "gray"
                            : "black",
                      px: { xs: 0.5, sm: 2 },
                      py: { xs: 1.5, sm: 2 },
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      borderRadius: 30,
                      gap: 1,
                      color:"white"
                    }}
                  >
                    <>
                      {!isMobile && <FriendIcon />}
                      {!isMobile ? (
                        <Typography>
                          Friends 
                        </Typography>
                      ) : (
                        <Typography sx={{ fontSize: { xs: 12 } }}>
                        Friends
                        </Typography>
                      )}
                    </>
                  </Box>
                  <Box
                    onClick={() => {
                      setStoreFriendPage(2);
                    }}
                    sx={{
                         width:{sm:200,xs:80},
                      minWidth: 0,
                      height: { xs: 40, sm: 50 },
                      bgcolor:
                        storeFriendPage === 2
                          ? "#2196F3"
                          : mode==="dark"?"gray":"black",
                      px: { xs: 0.5, sm: 2 },
                      py: { xs: 1.5, sm: 2 },
                      color:"white",
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      borderRadius: 30,
                      gap: 1,
                    }}
                  >
                    <>
                      {!isMobile && <FollowingIcon />}
                      {!isMobile ? (
                        <Typography>
                          Followers 
                        </Typography>
                      ) : (
                        <Typography sx={{ fontSize: { xs: 12 } }}>
                          Followers
                        </Typography>
                      )}
                    </>
                  </Box>
                  <Box
                    onClick={() => {
                      setStoreFriendPage(3);
                    }}
                    sx={{
                        width:{sm:200,xs:80},
                      minWidth: 0,
                      height: { xs: 40, sm: 50 },
                      bgcolor:
                        storeFriendPage === 3
                          ? "#2196F3"
                          : mode === "dark"
                            ? "gray"
                            : "black",
                      px: { xs: 0.5, sm: 2 },
                      py: { xs: 1.5, sm: 2 },
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      borderRadius: 30,
                      gap: 1,
                      color:"white"
                    }}
                  >
                    <></>
                    {!isMobile && <MyFriendIcon />}
                    {!isMobile ? (
                      <Typography>
                        My Friends 
                      </Typography>
                    ) : (
                      <Typography sx={{ fontSize: { xs: 12 } }}>
                         My Friends
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
              {filterFriendData.length===0?(<Card    sx={{
      height: "60vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
         gap: 1,
    bgcolor: "transparent",
    boxShadow: "none",
    }}>
      <Box sx={{display:"flex",gap:1}}>
             <Typography color="text.secondary" sx={{fontSize:{xs:13,xs:16},fontWeight:"bold"}}>
      {storeFriendPage === 1
        ? "No friends found"
        : storeFriendPage === 2
          ? "You don't have any followers yet"
          : "You have no friends"}
    </Typography>
    
       <SadIcon sx={{color:"red"}}/>

   
      </Box>
             
              </Card>):(<Box  sx={{display:"grid",gridTemplateColumns:{
                   xs: "repeat(1, minmax(0, 1fr))",
      sm: "repeat(2, minmax(0, 1fr))",
                    },gap:1,mx: { sm: 3, xs: 1 } }}>
                   
    {filterFriendData.map((friend) => {
  
              return (
                
                <Box key={friend.id}>
                  
<Card sx={{  p: 2,
          borderRadius: 3,
          minWidth: 0,
          minHeight:130,
          boxShadow: 2,bgcolor:"transparent",mb:{sm:2,xs:1}}}>
<Box sx={{display:"flex"}}>
  {friend.image?(<Box sx={{mt:{sm:2},ml:{sm:4,xs:1}}}>
    <Avatar sx={{width:{sm:70,xs:60},height:{sm:70,xs:60},mt:{xs:1,sm:0},}} src={friend.image}/>
  </Box>):(<Box sx={{mt:{sm:2},ml:{sm:4,xs:1}}}><Avatar  sx={{width:{sm:70,xs:60},height:{sm:70,xs:60},mt:{xs:1,sm:0},}}><ProfileIcon sx={{fontSize:{sm:50,xs:30}}}/></Avatar></Box>)}
  <Box sx={{mt:{sm:2,xs:1},ml:{sm:3,xs:2},display:"flex",flexDirection:"column"}}>
    <Typography sx={{mb:1,fontWeight:"bold"}}>{friend.username}</Typography>
    <Box  sx={{gap:{sm:1,xs:1},display:'flex'}}>
      {storeFriendPage===3 ?(<Button onClick={(e)=>{
        e.stopPropagation();
        removeFriendMutation.mutate(friend.friendShipId)
      }} variant="contained"  sx={{
    fontSize: { xs: 11, sm: 14 },
    bgcolor: "red",
  
    textTransform: "none",
    borderRadius: 2,
  }}>Unfollow</Button>):storeFriendPage===2 ||(friend.followers||[]).length>0  ?(     <Button  onClick={(e)=>{
      e.stopPropagation();
      addFriendMutation.mutate(friend.id)
    }}  variant="contained"  sx={{
    fontSize: { xs: 9, sm: 14 },
    bgcolor: "#7E57C2",
  
    textTransform: "none",
    borderRadius: 2,
  }}>Follow Back</Button>):((friend.following||[]).length>0?
      (     <Button onClick={(e)=>{
        e.stopPropagation();
        removeFollowingMutation.mutate(friend.following[0].id)
      }} variant="contained"  sx={{
    fontSize: { xs: 11, sm: 14 },
    bgcolor: "green",
  
    textTransform: "none",
    borderRadius: 2,
  }}>Following</Button>):(     <Button onClick={(e)=>{
    e.stopPropagation();
    followingMutation.mutate(friend.id)
  }} variant="contained"  sx={{
    fontSize: { xs: 11, sm: 14 },
    bgcolor: "#2196F3",
    "&:hover": {
      bgcolor: "#1976D2",
    },
    textTransform: "none",
    borderRadius: 2,
  }}>Follow</Button>))}
 
      
       <Button onClick={(e)=>{
        e.stopPropagation();
       navigate(`/profile/${friend.id}`)
       }} variant="contained"  sx={{
    fontSize: { xs: 11, sm: 14 },
    bgcolor: "#2196F3",
    "&:hover": {
      bgcolor: "#1976D2",
    },
    textTransform: "none",
    borderRadius: 2,
  }}>View Profile</Button>
    </Box>
   
  </Box>

</Box>
</Card>          
                    

                    
                  
                </Box>
              )
            })}
</Box>)}
             
    
            </Card>

          
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
