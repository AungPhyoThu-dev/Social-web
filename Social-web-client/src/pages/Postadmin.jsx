import { Box,Container,Typography, } from "@mui/material"
import { Article as PostIcon, Favorite as LikeIcon,Comment as CommentIcon, } from "@mui/icons-material"
import{useTheme,useMediaQuery}from "@mui/material"

export default function  Postadmin(){
  const theme=useTheme();
  const isMobile=useMediaQuery(theme.breakpoints.down("sm"));
  return(
<Box>
  <Container  maxWidth="lg">
    <Box sx={{display:'flex',flexDirection:isMobile?"column":"row",justifyContent:"space-between"}}>
        <Box sx={{display:"flex",gap:2}}>
<PostIcon sx={{fontSize:{sm:45,xs:35}}}/>
<Box sx={{display:"flex",flexDirection:"column"}}>
  <Typography sx={{fontSize:{sm:20,xs:15}}}>Post Admin</Typography>
  <Typography  sx={{fontSize:{xs:11},color:"gray"}}>Manage and moderate all posts from user</Typography>
</Box>

  </Box>
  <Box   sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(2, minmax(0, 1fr))",
        sm: "repeat(3, minmax(0, 1fr))",
      },
      gap: 2,
      mb: 3,
    }}>
     <Box sx={{width:180,height:80,borderRadius:3,bgcolor: "#28223F",
    border: "1px solid #51436F",    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 6px 20px rgba(179,157,219,0.15)",
    },cursor:"pointer"}}>
    <Box sx={{p:3,display:'flex',gap:2}} >
      <PostIcon sx={{fontSize:{sm:40}}}/>
      <Box>
           <Typography sx={{fontSize:{sm:14}}}>Total Posts</Typography>
           <Typography>11</Typography>
      </Box>
   
    </Box>

  </Box>
  <Box sx={{width:180,height:80,borderRadius:3,bgcolor: "#382333",
border: "1px solid #684052",    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 6px 20px rgba(179,157,219,0.15)",
    },cursor:"pointer"}}>
    <Box sx={{p:3,display:'flex',gap:2}} >
      <LikeIcon sx={{fontSize:{sm:40}}}/>
      <Box>
           <Typography sx={{fontSize:{sm:14}}}>Total Likes</Typography>
           <Typography>11</Typography>
      </Box>
   
    </Box>

  </Box>
  <Box sx={{width:180,height:80,borderRadius:3,bgcolor: "#382333",
border: "1px solid #684052",    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 6px 20px rgba(179,157,219,0.15)",
    },cursor:"pointer"}}>
    <Box sx={{p:3,display:'flex',gap:2}} >
      <CommentIcon sx={{fontSize:{sm:40}}}/>
      <Box>
           <Typography sx={{fontSize:{sm:14}}}> Comments</Typography>
           <Typography>11</Typography>
      </Box>
   
    </Box>

  </Box>
  </Box>
 
    </Box>

        
  </Container>
</Box>
  )
}