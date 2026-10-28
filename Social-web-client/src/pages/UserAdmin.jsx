import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Card,
  Avatar,
} from "@mui/material";
import { People as UsersIcon } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserAdmin } from "../fetchers/auth";
import { useApp } from "../ThemeApp";
import { DataGrid } from "@mui/x-data-grid";
import{useTheme,useMediaQuery}from "@mui/material"
export default function Useradmin() {
  const theme=useTheme();
  const isMobile=useMediaQuery(theme.breakpoints.down("sm"));
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      flex: 1,
       width: isMobile ? 150 : 180,
      renderCell: (params) => {
        console.log(params);
        console.log("First user:", data?.user?.[0]);
        return(
  <Box sx={{ display: "flex", alignItems: "center", gap: {sm:3,xs:2} ,mt:isMobile?1.6:2}}>
           
          <Avatar src={params.row.image || ""} sx={{ width: {sm:35,xs:25}, height: {sm:35,xs:25} }}>
            {params.row.user?.[0]?.toUpperCase()}
          </Avatar>
          {!isMobile?(<Typography>{params.row.user}</Typography>):(<Typography sx={{fontSize:11}}>{params.row.username}</Typography>)}
          
        </Box>
      
        )
      }
        
      
    },
     { field: "username", headerName: "UserName", flex: 1 },
   

    { field: "role", headerName: "Role",  width: isMobile ? 80 : 70,renderCell:(params)=>(
      <Typography sx={{  pl: isMobile ? 1 : 2,
        fontSize: { xs: 12, sm: 14 },mt:2}}>
          {params.value}
      </Typography>
    ) },
    {
      field: "isBanned",
      headerName: "Status",
      width: isMobile ? 90 : 70,
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: { xs: 12, sm: 14 },
            fontWeight: 600,
            mt:2,
            color: params.row.isBanned === true ? "red" : "green",
          }}
        >
          {params.row.isBanned === true ? "Banned" : "Active"}
        </Typography>
      ),
    },
  ];

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["useradmin"],
    queryFn: async () => UserAdmin(),
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
  const rows = data.user.map((user) => ({
    id: user.id,
    image: user.image,
    username: user.username,

    role: user.role,
    isBanned: user.isBanned,
    user: user.name,
  }));
  return (
    <Box>
      <Container>
        <Box sx={{ display: "flex", gap: 1 }}>
          <UsersIcon sx={{ fontSize: { sm: 25, xs: 25 } }} />
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: {
                sm: 20,
                xs: 18,
              },
            }}
          >
            Users Management
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 6,
            display: { sm: "flex" },
            justifyContent: { sm: "space-between" },
          }}
        >
          <Typography sx={{ fontSize: { sm: 20, xs: 13 } }}>
            Total Users ({data?.totalUser}){" "}
          </Typography>
          <Box>
            <TextField
              placeholder="Search"
              size="small"
              sx={{
                width: { xs: 200, sm: 220 },
                "& .MuiInputBase-root": {
                  height: 30,
                  mt: { xs: 3 },
                },
                "&::placeholder": {
                  fontSize: "11px",
                  opacity: 1,
                },
              }}
            />
            <FormControl
              size="small"
              sx={{ minWidth: { xs: 80, sm: 120 }, mt: { xs: 3 }, ml: 1 }}
            >
              <Select defaultValue="all" sx={{ height: { xs: 30, sm: 30 } }}>
                <MenuItem>Active</MenuItem>
                <MenuItem>Banned</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box sx={{mt:2}}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            columnVisibilityModel={{
              id:!isMobile,
              username: !isMobile,

            }}
            initialState={{
              pagination:{
                paginationModel:{
                  page:0,
                  pageSize:10
                }
              }
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Box>
      </Container>
    </Box>
  );
}
