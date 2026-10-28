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
export default function Useradmin() {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar src={params.row.image || ""} sx={{ width: 35, height: 35 }}>
            {params.row.user?.[0]?.toUpperCase()}
          </Avatar>
          <Typography>{params.row.user}</Typography>
        </Box>
      ),
    },
    { field: "username", headerName: "UserName", flex: 1 },

    { field: "role", headerName: "Role", width: 70 },
    {
      field: "isBanned",
      headerName: "Status",
      renderCell: (params) => (
        <Typography
          sx={{
            fontSize: { xs: 12, sm: 14 },
            fontWeight: 600,
            color: params.value === true ? "green" : "red",
          }}
        >
          {params.value === true ? "Banned" : "Active"}
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
    isBanned: user.isBanned ? "Banned" : "Active",
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

        <Box>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            pageSizeOptions={[5, 10, 25]}
          />
        </Box>
      </Container>
    </Box>
  );
}
