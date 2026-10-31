import{Box,Typography,Container} from "@mui/material"
import{Flag as ReportIcon} from "@mui/icons-material"
export default function Report(){
    return(
        <Box>
           <Container maxWidth="lg">
            <Box>
                <Box sx={{display:"flex",gap:{sm:2,xs:1},alignItems:"center"}}>
                     <ReportIcon sx={{ fontSize: { sm: 40, xs: 35 },color:'red' }} />
                     <Box sx={{display:'flex',flexDirection:"column"}}>
                         <Typography sx={{ fontSize: { sm: 20, xs: 16 } }}>Reported Users</Typography>
                         <Typography>Review and take action on reported accounts</Typography>
                     </Box>
                    
                </Box>
               
            </Box>
           </Container>
        </Box>
    )
}