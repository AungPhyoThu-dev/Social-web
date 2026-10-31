import {
  Box,
  Container,
  Typography,
  Card,
  TextField,
  FormControl,
  MenuItem,
  Select,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Article as PostIcon,
  Favorite as LikeIcon,
  Comment as CommentIcon,
  CalendarMonth as TodayPostIcon,
} from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { PostAdmin } from "../fetchers/auth";
import { queryClient, useApp } from "../ThemeApp";
import { useMutation, useQuery } from "@tanstack/react-query";
export default function Postadmin() {
  const { mode } = useApp();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["postadmin"],
    queryFn: async () => PostAdmin(),
  });
  console.log(data);
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
  const rows = data?.posts?.map((post) => ({
    id: post.id,
    content: post.content,
    images: post.images,
    user:post.user,
    comment:post._count.comments,
    like:post._count.postLikes
  }));
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "posts",
      headerName: "Posts",
  
      flex: 1,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex",alignItems:"center" ,gap:1}}>
            <Box
              sx={{
                width: { sm: 50, xs: 40 },
                mt: 1.5,
                height: { sm: 50, xs: 40 },
                            objectFit: "cover",
            borderRadius: 2,
            flexShrink: 0,

              }}
              component="img"
              src={params.row.images?.[0]?.url}
            ></Box>
{!isMobile&&(  <Typography sx={{display:"-webkit-box",WebkitBoxOrient:"vertical",WebkitLineClamp:2,overflow:"hidden",whiteSpace:"normal",textOverflow:"ellipsis",fontSize:{sm:12,}}}>{params.row.content}</Typography>)}
          
          </Box>
        );
      },
    },
    {field:"user",headerName:"User" ,flex:!isMobile && 1,renderCell:(params)=>(<Box>
      <Typography sx={{mt:{sm:2,xs:3},fontSize:{sm:13,xs:11}}}>{params.row?.user?.username}</Typography>
    </Box>) },
    {field:"comment",headerName:"Comments",flex:1,renderCell:(params)=>(
      <Box>
        <Typography>{params.row?.comment}</Typography>
      </Box>
    )},
    {field:"like",headerName:"PostLikes",flex:1,renderCell:(params)=>(
      <Box>
        <Typography>{params.row?.like}</Typography>
      </Box>
    )},
    {field:"action",headerName:"Actions",flex:!isMobile && 1,  }
  ];

  return (
    <Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile || isTablet ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile || isTablet ? "center" : "flex-start",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <PostIcon sx={{ fontSize: { sm: 45, xs: 35 } }} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontSize: { sm: 20, xs: 15 } }}>
                Post Admin
              </Typography>
              <Typography sx={{ fontSize: { xs: 11 }, color: "gray" }}>
                Manage and moderate all posts from user
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              width: "100%",
              maxWidth: isMobile ? 400 : "none",
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                sm: "repeat(4, minmax(0, 1fr))",
              },
              gap: 2,
              mb: isMobile || isTablet ? 3 : 8,
              mt: isMobile || isTablet ? 4 : 0,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 80,
                borderRadius: 3,
                bgcolor: "#28223F",
                border: "1px solid #51436F",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 20px rgba(179,157,219,0.15)",
                },
                cursor: "pointer",
              }}
            >
              <Box sx={{ p: 3, display: "flex", gap: 1 }}>
                <PostIcon
                  sx={{ fontSize: { sm: 40, xs: 30 }, color: "#D6C2FF" }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: 11, sm: 14 },
                      color: "white",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Total Posts
                  </Typography>
                  <Typography sx={{ fontSize: { xs: 13 }, color: "white" }}>
                    {data?.totalPosts}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: 80,
                borderRadius: 3,
                bgcolor: "#382333",
                border: "1px solid #684052",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 20px rgba(179,157,219,0.15)",
                },
                cursor: "pointer",
              }}
            >
              <Box sx={{ p: 3, display: "flex", gap: 1 }}>
                <LikeIcon
                  sx={{ fontSize: { sm: 40, xs: 30 }, color: "#FFB0CB" }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: 11, sm: 14 },
                      color: "white",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Total Likes
                  </Typography>
                  <Typography sx={{ fontSize: { xs: 13 }, color: "white" }}>
                    {data?.totalLikes}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: 80,
                borderRadius: 3,
                bgcolor: "#203532",
                border: "1px solid #41665D",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 20px rgba(179,157,219,0.15)",
                },
                cursor: "pointer",
              }}
            >
              <Box sx={{ p: 3, display: "flex", gap: 2 }}>
                <CommentIcon
                  sx={{ fontSize: { sm: 40, xs: 30 }, color: "#80CBC4" }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: 11, sm: 14 },
                      color: "white",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {" "}
                    Comments
                  </Typography>
                  <Typography sx={{ fontSize: { xs: 13 }, color: "white" }}>
                    {data?.totalComments}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: 80,
                borderRadius: 3,
                bgcolor: "#253447",
                border: "1px solid #405A78",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 20px rgba(179,157,219,0.15)",
                },
                cursor: "pointer",
              }}
            >
              <Box sx={{ p: 3, display: "flex", gap: 1 }}>
                <TodayPostIcon
                  sx={{ fontSize: { sm: 40, xs: 30 }, color: "#90CAF9" }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: 11, sm: 14 },
                      color: "white",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Today Posts
                  </Typography>
                  <Typography sx={{ fontSize: { xs: 13 }, color: "white" }}>
                    {data?.todayPost}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <Card
            sx={{
              width: "100%",
              height: "auto",
              bgcolor: mode === "dark" ? "#252A36" : "white",
              border: "1px solid #3B4355",
              borderRadius: 3,
              color: mode === "dark" ? "white" : "black",
            }}
          >
            <Box>
              <Box sx={{ display: "flex", gap: isMobile || isTablet ? 1 : 5 }}>
                <TextField
                  size="small"
                  placeholder="Search posts by username"
                  sx={{
                    width: { xs: 200, sm: 900 },
                    "& .MuiInputBase-root": {
                      height: { sm: 40, xs: 30 },
                      mt: { xs: 3 },
                      ml: { sm: 3, xs: 1 },
                      color: mode === "dark" ? "white" : "black",
                    },
                    "&::placeholder": {
                      fontSize: { sm: 11, xs: 9 },
                      opacity: 1,
                    },
                    "& .MuiInputBase-input": {
                      fontSize: { xs: 11, sm: 14 },
                    },
                  }}
                />
                <FormControl
                  sx={{ minWidth: { xs: 70, sm: 160 }, mt: { xs: 3 } }}
                >
                  <Select
                    defaultValue="All Users"
                    sx={{ height: { xs: 30, sm: 40 } }}
                  >
                    <MenuItem value="users">All Users</MenuItem>
                    <MenuItem value="banusers">Banned</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <DataGrid
           
                rows={rows}
                rowHeight={70}
                columns={columns}
                columnVisibilityModel={
                  {
                    id:!isMobile,
                    comment:!isMobile,
                    like:!isMobile,

                  }
                }
                sx={{ bgcolor: mode === "dark" ? "#252A36" : "white",   width:"100%", }}
                pageSizeOptions={[5, 10, 25]}
                initialState={{
                  pagination: {
                    paginationModel: {
                      page: 0,
                      pageSize: 10,
                    },
                  },
                }}
              />
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
