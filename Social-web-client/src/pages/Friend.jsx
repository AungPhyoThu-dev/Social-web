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
import { Friends } from "../fetchers/auth";
import { useApp, queryClient } from "../ThemeApp";
import {
  AccountCircle as ProfileIcon,
  ArrowBack as BackIcon,
  Group as FriendIcon,
  GroupAdd as FollowingIcon,
  PersonAdd as FollowerIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { mode, storeFriendPage, setStoreFriendPage } = useApp();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => Friends(),
  });
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
  console.log(data);
  return (
    <Box>
      <Container disableGutters maxWidth="md" >
        <Card sx={{ width: "100%", minHeight: 600, userSelect: "none" }}>
          <Box>
            <Box
              sx={{
                display: "flex",
                mt: 3,
                ml: { sm: 3, xs: 1 },
                gap: { sm: 2, xs: 2 },
              }}
            >
              <Box
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
                    mb:{sm:6,xs:2}
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
                    }}
                  >
                    <>
                      {!isMobile && <FriendIcon />}
                      {!isMobile ? (
                        <Typography>
                          Friends ({data?.totalFriends})
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
                    }}
                  >
                    <>
                      {!isMobile && <FollowingIcon />}
                      {!isMobile ? (
                        <Typography>
                          Followings ({data?.totalFollowings})
                        </Typography>
                      ) : (
                        <Typography sx={{ fontSize: { xs: 12 } }}>
                          Followings
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
                    }}
                  >
                    <></>
                    {!isMobile && <FollowingIcon />}
                    {!isMobile ? (
                      <Typography>
                        Followers ({data?.totalfollowers})
                      </Typography>
                    ) : (
                      <Typography sx={{ fontSize: { xs: 12 } }}>
                        Followers
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
              <Box  sx={{display:"grid",gridTemplateColumns:{
                   xs: "repeat(1, minmax(0, 1fr))",
      sm: "repeat(2, minmax(0, 1fr))",
                    },gap:1,mx: { sm: 3, xs: 1 } }}>
    {data?.data?.map((friend) => {
      
              return (
                
                <Box key={friend.id}>
                  
                  {storeFriendPage===1 &&(
                    
<Card sx={{  p: 2,
          borderRadius: 3,
          minWidth: 0,
          minHeight: 130,
          boxShadow: 2,bgcolor:"transparent"}}>
<Box sx={{display:"flex"}}>
  {friend.image?(<Box sx={{mt:{sm:2},ml:4}}>
    <Avatar sx={{width:{sm:70},height:{sm:70}}} src={friend.image}/>
  </Box>):(<Box><Avatar ><ProfileIcon sx={{fontSize:{sm:30}}}/></Avatar></Box>)}
  <Box sx={{mt:{sm:2},ml:{sm:3},display:"flex",flexDirection:"column"}}>
    <Typography sx={{mb:1,fontWeight:"bold"}}>{friend.username}</Typography>
    <Box sx={{gap:{sm:1},display:'flex'}}>
       <Button variant="contained"  sx={{
    fontSize: { xs: 11, sm: 14 },
    bgcolor: "#2196F3",
    "&:hover": {
      bgcolor: "#1976D2",
    },
    textTransform: "none",
    borderRadius: 2,
  }}>Follow</Button>
       <Button variant="contained"  sx={{
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
                    
                  )}
                </Box>
              )
            })}
</Box>
            </Card>

          
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
