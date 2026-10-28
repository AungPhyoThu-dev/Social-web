import { Skeleton,Box,Card } from "@mui/material";

export  function PostSkeleton() {
  return (
    <Box>
      <Card
        sx={{
          maxWidth: "100%",
          mx: "auto",
          mb: 2,
          
          height: "auto",
          width: {
            sm: 600,
            xs: "100%",
          },
        }}
      >
        <Box sx={{display:"flex",
          alignItems:"center",
          gap:1,
          mt:2
        }}>
<Skeleton variant="circular" width={40} height={40}/>
<Box>
  <Skeleton variant="text" width={120} height={20}/>
  <Skeleton variant="text" width={60} height={15}/>
</Box>
        </Box>
       <Skeleton variant="text" width="90%" height={20} />
       <Skeleton variant="text" width="70%" height={20}/>
       <Skeleton variant="rectangular" width="100%" sx={{mt:1,height:{
        xs:300,
        ms:400
       }}}/>
       <Box sx={{display:"flex",gap:2,mt:2}}>
<Skeleton variant="text" width={60}/>
<Skeleton variant="text" width={60}/>
       </Box>
      </Card>
    </Box>
  );
}
