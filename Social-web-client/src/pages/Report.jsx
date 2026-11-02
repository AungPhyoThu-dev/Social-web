import{Box,Typography,Container,CircularProgress,Alert,Avatar,useMediaQuery,useTheme} from "@mui/material"
import{Flag as ReportIcon,ArrowBack as BackArrowIcon} from "@mui/icons-material";

import { DataGrid } from "@mui/x-data-grid";
import{useMutation,useQuery}from "@tanstack/react-query";
import { ReportPost } from "../fetchers/auth";
import { useParams,useNavigate } from "react-router-dom";

export default function Report(){
    const navigate=useNavigate();
   const {postId}=useParams();
      const theme=useTheme();
        const isMobile=useMediaQuery(theme.breakpoints.down("sm"))
    const {data,isLoading,isError,error}=useQuery({
        queryKey:["report",postId],
        queryFn:async()=>ReportPost(postId)
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

        const rows=data?.reports.map((report)=>({
            id:report.id,
            image:report.user?.image,
            username:report.user?.username,
            reason:report.reason,
            user:report.user?.name
        }))
        const columns=[
            {field:"user",headerName:"Profile",flex:1,  renderCell: (params) => {
                
                    return(
              <Box sx={{ display: "flex", alignItems: "center", gap: {sm:3,xs:2} ,mt:isMobile?3:3,ml:isMobile?2:2}}>
                       
                      <Avatar src={params.row.image || ""} sx={{ width: {sm:50,xs:40}, height: {sm:50,xs:40} }}>
                        {params.row.user?.[0]?.toUpperCase()}
                      </Avatar>
                      {!isMobile&&(<Typography sx={{fontSize:13}}>{params.row.user}</Typography>)}
                      
                    </Box>
                  
                    )
                  }},
            {field:"username",headerName:"Username",flex:1,renderCell:(params)=>{
                return(
                    <Box sx={{mt:{sm:5,xs:5,},}}>
                        <Typography sx={{fontSize:isMobile?12:13}}>{params.row.username}</Typography>
                    </Box>
                )
            }},
            {field:"reason",headerName:"Reason",flex:1,renderCell:(params)=>{
                return(
                    <Box sx={{mt:{sm:5,xs:5,},ml:1}}>
                        <Typography sx={{fontSize:isMobile?11:13}}>{params.row.reason}</Typography>
                    </Box>
                )
            }}
        ];
     
    return(
        <Box>
           
           <Container maxWidth="lg">
                 <Box onClick={(e)=>{
                    e.stopPropagation();
                    navigate(-1)
                  }}   sx={{
                       display: "inline-flex",
                    
                        alignItems: "center",
                gap: 0.8,
                cursor: "pointer",
                color: "text.secondary",
               
                p: 1,
              mb:1
               
                    }}>
            <BackArrowIcon sx={{  color: "text.primary",fontSize:{sm:16,xs:18}}}/>
            <Typography sx={{fontSize:{sm:16,xs:13}}}>Back</Typography>
                  </Box>
            <Box>
                <Box sx={{display:"flex",gap:{sm:2,xs:1},alignItems:"center"}}>
                     <ReportIcon sx={{ fontSize: { sm: 40, xs: 35 },color:'red' }} />
                 
                         <Typography sx={{ fontSize: { sm: 20, xs: 16 } }}>Reported Users</Typography>
                        
                 
                    
                </Box>
                 <Typography variant="caption" sx={{fontSize:{sm:15,xs:11},color:"gray",}}>Review and take action on reported accounts</Typography>
               
            </Box>

<Box sx={{mt:3}}>
    <DataGrid rows={rows} columns={columns} rowHeight={90} />
</Box>
           </Container>
        </Box>
    )
}