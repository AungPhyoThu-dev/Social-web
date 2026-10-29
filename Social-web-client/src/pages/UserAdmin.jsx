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
import { SwapCalls, People as UsersIcon } from "@mui/icons-material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserAdmin } from "../fetchers/auth";
import { useApp } from "../ThemeApp";
import { DataGrid } from "@mui/x-data-grid";
import{useTheme,useMediaQuery}from "@mui/material"
export default function Useradmin() {
  const AdminSelectMutation=useMutation({
    mutationKey:["isBan"],
    mutationFn:
  })
  const{formControlValue,setFormControlValue,userSearch,setUserSearch,adminSelect,setAdminSelect}=useApp();
  const theme=useTheme();
  const isMobile=useMediaQuery(theme.breakpoints.down("sm"));
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      flex: 1,
       width: isMobile ? 150 : 170,
      renderCell: (params) => {
        console.log(params);
        console.log("First user:", data?.user?.[0]);
        return(
  <Box sx={{ display: "flex", alignItems: "center", gap: {sm:3,xs:2} ,mt:isMobile?1.6:1}}>
           
          <Avatar src={params.row.image || ""} sx={{ width: {sm:35,xs:25}, height: {sm:35,xs:25} }}>
            {params.row.user?.[0]?.toUpperCase()}
          </Avatar>
          {!isMobile?(<Typography>{params.row.user}</Typography>):(<Typography sx={{fontSize:11}}>{params.row.user}</Typography>)}
          
        </Box>
      
        )
      }
        
      
    },
     { field: "username", headerName: "UserName",flex:1,},
   

    { field: "role", headerName: "Role",  flex:isMobile?0:1,    width: isMobile ? 90 : 100,renderCell:(params)=>(
      <Typography sx={{  pl: isMobile ? 3  : 2,
        fontSize: { xs: 12, sm: 14 },mt:2}}>
          {params.value}
      </Typography>
    ) },
    {
      field: "isBanned",
      headerName: "Status",
      flex:isMobile?0.8:0.5, 
      width: isMobile ? 80 : 70,
      renderCell: (params) => (
        <Box sx={{display:"flex",gap:{sm:4,xs:1}}}>
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
        <FormControl size="small" sx={{width:isMobile?80:30,mt:{sm:1,xs:1.4}}}>
          <Select  displayEmpty   renderValue={() => ""} value={adminSelect} onChange={(e)=>{
            const isBanned=e.target.value==="ban";
            setAdminSelect(e.target.value)
          }} sx={{  height: isMobile ? 30 : 36,
          
            "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
          "& .MuiSelect-select": {
            py: 0.5,
            px: 1,
            
          },}}>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="ban">Ban</MenuItem>
          </Select>
        </FormControl>
        </Box>
     
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
  const formControlFilter=data?.user?.filter((user)=>{
    const matchStatus=formControlValue==="all"||(formControlValue==="active"&& user.isBanned===false)||(formControlValue==="banned"&& user.isBanned===true);
    const search=userSearch.toLowerCase();
    const matchSearch=user.username?.toLowerCase().includes(search);
    return matchStatus&& matchSearch;
     
  })
  const rows = formControlFilter.map((user) => ({
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
            <TextField  value={userSearch} onChange={(e)=>setUserSearch(e.target.value)}
              placeholder="Search username"
              size="small"
              sx={{
                width: { xs: 170, sm: 220 },
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
              <Select value={formControlValue} onChange={(e)=>{setFormControlValue(e.target.value)}}  sx={{ height: { xs: 30, sm: 30 } }}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="banned">Banned</MenuItem>
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
            localeText={{
              noRowsLabel:userSearch?"No user found":formControlValue==="banned"&& "No banned users here"
        
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Box>
      </Container>
    </Box>
  );
}
