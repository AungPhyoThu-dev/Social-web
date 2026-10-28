import {
  Box,
  Container,
  Typography,
  Card,
  CircularProgress,
  Alert,
  Divider,
  LinearProgress,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ViewDashBoard } from "../fetchers/auth";
import { useApp } from "../ThemeApp";
import { useNavigate } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  Mode,
  People as PeopleIcon,
  Article as PostIcon,
  Comment as CommentIcon,
  ThumbUpAlt as LikeIcon,
  Security as ShieldIcon,
 NavigateNext as ArrowIcon
} from "@mui/icons-material";
export default function Dashboard() {
  const navigate=useNavigate();
  const { mode } = useApp();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => ViewDashBoard(),
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
  return (
    <Box>
      <Container>
        <Box sx={{ display: "flex", gap: 1 }}>
          <DashboardIcon sx={{ fontSize: { sm: 25, xs: 25 } }} />
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: {
                sm: 20,
                xs: 18,
              },
            }}
          >
            Admin Dashboard
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(4, minmax(0, 1fr))",
            },
            gap: {
              sm: 6,
              xs: 1,
            },
            mt: 4,
          }}
        >
          <Card
            sx={{
              width: "100%",
              height: { sm: 200, xs: 150 },
              p: 2,
              borderRadius: 3,
              bgcolor: mode === "dark" ? "#172B40" : "#5C85B8",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    sm: 17,
                    xs: 13,
                  },
                  color: "white",
                }}
              >
                Total users
              </Typography>
              <PeopleIcon sx={{ color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: { sm: 5, xs: 3 },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    sm: 25,
                    xs: 16,
                  },
                  color: "white",
                }}
              >
                {data?.totalUsers}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={((data?.totalUsers ?? 0) / 30) * 100}
              sx={{
                mt: { sm: 5, xs: 4 },
                "& .MuiLinearProgress-bar": {
                  backgroundColor: mode === "dark" ? "#2196F3" : "#1976D2",
                },
                height: { sm: 8, xs: 5 },
                borderRadius: 5,
                backgroundColor: "white",
              }}
            />
          </Card>
          <Card
            sx={{
              width: "100%",
              height: { sm: 200, xs: 150 },
              p: 2,
              borderRadius: 3,
              bgcolor: mode === "dark" ? "#3A2A1B" : "#EF6C00",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    sm: 17,
                    xs: 13,
                  },
                  color: "white",
                }}
              >
                Total posts
              </Typography>
              <PostIcon sx={{ color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: { sm: 5, xs: 3 },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    sm: 25,
                    xs: 16,
                  },
                }}
              >
                {data?.totalPosts}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={((data?.totalPosts ?? 0) / 60) * 100}
              sx={{
                mt: { sm: 5, xs: 4 },
                "& .MuiLinearProgress-bar": {
                  backgroundColor: mode === "dark" ? "#2196F3" : "#1976D2",
                },
                height: { sm: 8, xs: 5 },
                borderRadius: 5,
                backgroundColor: "white",
              }}
            />
          </Card>
          <Card
            sx={{
              width: "100%",
              height: { sm: 200, xs: 150 },
              p: 2,
              borderRadius: 3,
              bgcolor: mode === "dark" ? "#1B3326" : "#2E7D32",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    sm: 17,
                    xs: 13,
                  },
                  color: "white",
                }}
              >
                Comments
              </Typography>
              <CommentIcon sx={{ color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: { sm: 5, xs: 3 },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    sm: 25,
                    xs: 16,
                  },
                  color: "white",
                }}
              >
                {data?.totalComments}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={((data?.totalComments ?? 0) / 60) * 100}
              sx={{
                mt: { sm: 5, xs: 4 },
                "& .MuiLinearProgress-bar": {
                  backgroundColor: mode === "dark" ? "#2196F3" : "#1976D2",
                },
                height: { sm: 8, xs: 5 },
                borderRadius: 5,
                backgroundColor: "white",
              }}
            />
          </Card>
          <Card
            sx={{
              width: "100%",
              height: { sm: 200, xs: 150 },
              p: 2,
              borderRadius: 3,
              bgcolor: mode === "dark" ? "#3A202D" : "#C2185B",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    sm: 17,
                    xs: 13,
                  },
                  color: "white",
                }}
              >
                PostLikes
              </Typography>
              <LikeIcon sx={{ color: "white" }} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: { sm: 5, xs: 3 },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    sm: 25,
                    xs: 16,
                  },
                  color: "white",
                }}
              >
                {data?.totalLikes}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={((data?.totalLikes ?? 0) / 100) * 100}
              sx={{
                mt: { sm: 5, xs: 4 },
                "& .MuiLinearProgress-bar": {
                  backgroundColor: mode === "dark" ? "#2196F3" : "#1976D2",
                },
                height: { sm: 8, xs: 5 },
                borderRadius: 5,
                backgroundColor: "white",
              }}
            />
          </Card>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, minmax(0, 1fr))",
              sm: "repeat(1, minmax(0, 1fr))",
            },
            gap: 2,
            mt: {
              sm: 3,
              xs: 1,
            },
          }}
        >
          <Card sx={{ width: "100%", height: { sm: 140, xs: 120 },borderRadius:3,bgcolor:"white" ,mt:1}}>
            <Box sx={{ p: 2, ml: { sm: 6, xs: 4 } }}>
              <Typography
                sx={{
                  fontSize: {
                    sm: 15,
                    xs: 12,
                  },
                  color:"black"
                }}
              >
                Banned Accounts
              </Typography>
            </Box>
            <Box sx={{display:"flex",justifyContent:"space-between"}}>
                <Box sx={{display:"flex"}}>
              <ShieldIcon sx={{fontSize:{
                sm:35,xs:30
              },ml:2,mb:1,color: "#C62828",}} />
              <Typography sx={{ml:4,fontSize:{
                sm:25,xs:20
              },color:"black"}}>{data?.totalBannedAccounts}</Typography>

            </Box>
            {data?.totalBannedAccounts===0?(<Typography sx={{color:"white",bgcolor:"#3f7a44",p:{sm:1,xs:1.5},mr:{
              sm:2,
              xs:1
            },borderRadius:5,fontSize:{sm:15,xs:11}}}>Healthy</Typography>):(<Typography sx={{color:"white",bgcolor:"#702f29",p:{sm:1,xs:1.5},mr:{
              sm:2,
              xs:1
            },borderRadius:5,fontSize:{sm:15,xs:11}}}>unhealthy</Typography>)}
            </Box>
          
           {data?.totalBannedAccounts===0?( <Typography sx={{color:"green",ml:{
            sm:8,
            xs:6
           },fontSize:{
            sm:13,
            xs:11
           }}}>No banned accout</Typography>):( <Typography sx={{color:"red",ml:{
            sm:8,
            xs:6
           },fontSize:{
            sm:13,
            xs:12
           }}}> {data?.totalBannedAccounts} banned accounts</Typography>)}
          </Card>
        </Box>
        <Box>
          <Typography
            sx={{
              mt: 5,
              fontSize: {
                sm: 22,
                xs: 15,
              },
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Management
          </Typography>
        </Box>
        <Box>
             <Card sx={{ width: "100%", height: { sm: 230, xs: 230 },borderRadius:3,bgcolor:"white" ,mt:1}}>
              <Box sx={{p:4,display:"flex",justifyContent:"space-between"}}>
                <Box sx={{display:"flex",gap:{sm:2,xs:2},}}>
                  <PeopleIcon sx={{color:"blue",fontSize:{
                  sm:30,xs:28
                },mt:{sm:1,xs:1},}} />
                  
                  <Box sx={{display:"flex",flexDirection:"column"}}>
                    <Typography sx={{color:"black",fontSize:{sm:19}}}>Users</Typography>
                    <Typography sx={{color:"gray",fontSize:{
                      sm:12,xs:10
                    }}}>Manage accounts and permissions</Typography>
                  </Box>
                </Box>
                <ArrowIcon onClick={(e)=>{
                  e.stopPropagation();
                  navigate("/admin/useradmin")
                }} sx={{color:"gray",ml:{
                  sm:2,
                  xs:2
                },
                fontSize:{
                  sm:35
                }}}/>
              </Box>
       <Divider sx={{borderColor:'gray'}}/>
       <Box sx={{p:4,display:"flex",justifyContent:"space-between"}}>
                <Box sx={{display:"flex",gap:{sm:2,xs:2},}}>
                  <PostIcon sx={{color:"blue",fontSize:{
                  sm:30,xs:28
                },mt:{sm:1,xs:1},}} />
                  
                  <Box sx={{display:"flex",flexDirection:"column"}}>
                    <Typography sx={{color:"black",fontSize:{sm:19}}}>Posts</Typography>
                    <Typography sx={{color:"gray",fontSize:{
                      sm:12,xs:10
                    }}}>Review and manage posts</Typography>
                  </Box>
                </Box>
                <ArrowIcon onClick={(e)=>{
                  e.stopPropagation();
                  navigate("/admin/postadmin")
                }} sx={{color:"gray",ml:{
                  sm:2,
                  xs:2
                },
                fontSize:{
                  sm:35
                }}}/>
              </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
