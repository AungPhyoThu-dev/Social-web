import { Box,Container,Typography,Card, TextField, FormControl, MenuItem ,Select} from "@mui/material"
import { Article as PostIcon, Favorite as LikeIcon,Comment as CommentIcon,CalendarMonth as TodayPostIcon } from "@mui/icons-material"
import{useTheme,useMediaQuery}from "@mui/material"
import { queryClient, useApp } from "../ThemeApp";
export default function  Postadmin(){
  const{mode}=useApp();
  const theme=useTheme();
  const isMobile=useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  return(
<Box>
  <Container  maxWidth="lg">
    <Box sx={{display:'flex',flexDirection:isMobile||isTablet?"column":"row",justifyContent:"space-between",alignItems: isMobile||isTablet ? "center" : "flex-start",}}>
        <Box sx={{display:"flex",gap:2}}>
<PostIcon sx={{fontSize:{sm:45,xs:35}}}/>
<Box sx={{display:"flex",flexDirection:"column"}}>
  <Typography sx={{fontSize:{sm:20,xs:15}}}>Post Admin</Typography>
  <Typography  sx={{fontSize:{xs:11},color:"gray"}}>Manage and moderate all posts from user</Typography>
</Box>

  </Box>
  <Box   sx={{
      display: "grid",
      width:"100%",
        maxWidth: isMobile ? 400 : "none",
      gridTemplateColumns: {
        xs: "repeat(2, minmax(0, 1fr))",
        sm: "repeat(4, minmax(0, 1fr))",
      },
      gap: 2,
      mb: (isMobile||isTablet)?3:8,
      mt: (isMobile || isTablet) ? 4 : 0,
    
    }}>
     <Box sx={{width:"100%",height:80,borderRadius:3,bgcolor: "#28223F",
    border: "1px solid #51436F",    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 6px 20px rgba(179,157,219,0.15)",
    },cursor:"pointer"}}>
    <Box sx={{p:3,display:'flex',gap:1}} >
      <PostIcon sx={{fontSize:{sm:40,xs:30},color:"#D6C2FF"}}/>
      <Box>
           <Typography  sx={{
    fontSize: { xs: 11, sm: 14 },
    color: "white",
    fontWeight: 500,
    whiteSpace: "nowrap",
  }}>Total Posts</Typography>
           <Typography sx={{fontSize:{xs:13},color:"white"}}>11</Typography>
      </Box>
   
    </Box>

  </Box>
  <Box sx={{width:"100%",height:80,borderRadius:3,bgcolor: "#382333",
border: "1px solid #684052",    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 6px 20px rgba(179,157,219,0.15)",
    },cursor:"pointer"}}>
    <Box sx={{p:3,display:'flex',gap:1}} >
      <LikeIcon sx={{fontSize:{sm:40},color:"#FFB0CB"}}/>
      <Box>
           <Typography  sx={{
    fontSize: { xs: 11, sm: 14 },
    color: "white",
    fontWeight: 500,
    whiteSpace: "nowrap",
  }}>Total Likes</Typography>
           <Typography sx={{fontSize:{xs:13},color:"white"}}>11</Typography>
      </Box>
   
    </Box>

  </Box>
  <Box sx={{width:"100%",height:80,borderRadius:3,bgcolor: "#203532",
border: "1px solid #41665D" ,   transition: "0.3s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 6px 20px rgba(179,157,219,0.15)",
    },cursor:"pointer"}}>
    <Box sx={{p:3,display:'flex',gap:1}} >
      <CommentIcon sx={{fontSize:{sm:40,},color: "#80CBC4"}}/>
      <Box>
           <Typography  sx={{
    fontSize: { xs: 11, sm: 14 },
    color: "white",
    fontWeight: 500,
    whiteSpace: "nowrap",
  }}> Comments</Typography>
           <Typography  sx={{fontSize:{xs:13},color:"white"}}>11</Typography>
      </Box>
   
    </Box>

  </Box>
   <Box sx={{width:"100%",height:80,borderRadius:3,bgcolor:"#253447" ,
border: "1px solid #405A78",    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 6px 20px rgba(179,157,219,0.15)",
    },cursor:"pointer"}}>
    <Box sx={{p:3,display:'flex',gap:1}} >
      <TodayPostIcon sx={{fontSize:{sm:40},color:"#90CAF9",}}/>
      <Box>
           <Typography  sx={{
    fontSize: { xs: 11, sm: 14 },
    color: "white",
    fontWeight: 500,
    whiteSpace: "nowrap",
  }}>Today Posts</Typography>
           <Typography  sx={{fontSize:{xs:13},color:"white"}}>11</Typography>
      </Box>
   
    </Box>

  </Box>
  </Box>
 
    </Box>
<Box>
<Card sx={{width:"100%",height:500,bgcolor: mode==="dark"?"#252A36":"white",
border: "1px solid #3B4355",
borderRadius: 3,color:mode==="dark"?"white":"black"}}>
<Box>
  <Box sx={{display:'flex',gap:(isMobile||isTablet)?1:5}}>
     <TextField size="small" placeholder="Search posts by username" sx={{width:{xs:200,sm:900}, "& .MuiInputBase-root": {
                  height: {sm:40,xs:30},
                  mt: { xs: 3 },
                  ml:{sm:3,xs:1},
                 color:mode==="dark"?"white":"black"
                  
                },
                "&::placeholder": {
                  fontSize: {sm:11,xs:9},
                  opacity: 1,
                },   "& .MuiInputBase-input": {
      fontSize: { xs: 11, sm: 14 },
    },
}}/>
     <FormControl sx={{ minWidth: { xs: 70, sm: 160 }, mt: { xs: 3 }}}>
      <Select sx={{ height: { xs: 30, sm: 40 } }}>
        <MenuItem>All Users</MenuItem>
        <MenuItem>Banned Users</MenuItem>
      </Select>
     </FormControl>
  </Box>
 
</Box>
<Box>
  
</Box>
</Card>
</Box>
        
  </Container>
</Box>
  )
}