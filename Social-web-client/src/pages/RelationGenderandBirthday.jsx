import { Typography, Card, Box, IconButton, Button,FormControl,Select,InputLabel,MenuItem } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EditBirthday,EditRelation,EditGender, } from "../fetchers/auth";
import { useApp, queryClient } from "../ThemeApp";
import { useNavigate } from "react-router-dom";
import { Close as BackIcon,
  CalendarMonth as CalenderIcon,
   Transgender as GenderIcon,
   ArrowDropDown as DorpDownIcon,
    VolunteerActivism as RelationShipIcon
 } from "@mui/icons-material";


export default function RelationandGenderBirthday() {

  const theme=useTheme();
  const smallScreen=useMediaQuery(theme.breakpoints.down("sm"))
   const navigate = useNavigate();
  const{editField,openDropDown,setOpenDropDown,changeBirthday,
    setChangeBirthday,setEditField,setGlobalMsg,auth,changeRelation,setChangeRelation,changeGender,setChangeGender}=useApp()
   const NewBirthday=useMutation({
      mutationKey:["birthday"],
      mutationFn:async(newbirthday)=>{
        return EditBirthday(newbirthday)
      },
      onSuccess:async()=>{
        await queryClient.invalidateQueries({
          queryKey:["editProfile",auth?.id]
        })
        setChangeBirthday("");
        setEditField(null);
        setGlobalMsg("Country updated successfull")
          navigate("/editprofile");
        
      }
    })
     const NewRelation=useMutation({
      mutationKey:["relation"],
      mutationFn:async(newrelation)=>{
        return EditRelation(newrelation)
      },
      onSuccess:async()=>{
        await queryClient.invalidateQueries({
          queryKey:["editProfile",auth?.id]
        })
        setChangeRelation("");
        setEditField(null);
        setGlobalMsg("Relation updated successful")
          navigate("/editprofile");
        
      }
    })
    const NewGender=useMutation({
      mutationKey:["gender"],
      mutationFn:async(newgender)=>{
        return EditGender(newgender)
      },
      onSuccess:async()=>{
        await queryClient.invalidateQueries({
          queryKey:["editProfile",auth.id]
        })
        setChangeGender(""),
        setEditField(null);
        setGlobalMsg("Gender updated successful")
         navigate("/editprofile");
      }
    })
  return (
    <Box sx={{mt:3}}>
      <Card
        sx={{ width: { sm: 700, xs: "100%" }, bgcolor: "white", height: "100vh" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1,
            py: 1.5,
            borderBottom: "1px solid #E5E7EB",
            position:'relative'
          }}
        >
          <IconButton onClick={(e)=>{
            e.stopPropagation();
           navigate(-1)
           setEditField(null)
          }}>
            <BackIcon
              sx={{ color: "black", }}
            />
          </IconButton>
        {editField==="birthday"?(  <Typography sx={{ color:"black", position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",fontWeight:500,fontSize:16 }}>Birthday</Typography>):editField==="gender"?(  <Typography sx={{color:"black", position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",fontWeight:500,fontSize:16 }}>Gender</Typography>):editField==="relation"?(  <Typography sx={{color:"black", position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",fontWeight:500,fontSize:16 }}>RelationShip</Typography>):null}
        </Box>
        {editField==="birthday"&& (
           <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",mt:6,alignItems:"center"}}>
          <Box sx={{bgcolor:"#EAF2FF",width:100,height:100,borderRadius:"100%",position:'relative',alignItems:"center",display:'flex'}}>
            <CalenderIcon sx={{color:"#1976d2",fontSize:40,position:"absolute",left:"50%",transform:"translateX(-50%)"}}/>
          </Box>
          <Typography sx={{fontWeight:600,color:"#63666b",fontSize:{sm:22,xs:19},mt:2}}>Date of birth</Typography>
          <Typography sx={{fontWeight:500,color: "#797979",mt:1,fontSize:{sm:16,xs:15},mb:{
            sm:7,xs:3
          }}}>Choose your birthday</Typography>
<Box sx={{ mx: 2,width:{sm:600,xs:250}}}>
  <input
    type="date"
    max={new Date().toISOString().split("T")[0]}
    value={changeBirthday??""}
    onChange={(e)=>setChangeBirthday(e.target.value)}
    style={{
      padding:smallScreen?"12px":"20px",
      width: "100%",
      boxSizing: "border-box",
      borderRadius: "8px",
      border: "1px solid #D1D5DB",
      fontSize: "15px",
    }}
  />
</Box>
<Typography sx={{color:"#797979",mt:{
  xs:3,
  sm:7
},fontSize:{
  xs:10,
  sm:15
},fontWeight:500}}>Your birthday information helps people celebrate with you.</Typography>
<Box sx={{  mt: {
            sm:7,
            xs:1.5
          },  mx: 2,width:{sm:600,xs:250},}}>
  <Button onClick={(e)=>{
    e.stopPropagation();
    NewBirthday.mutate(changeBirthday)
  
  }} sx={{           py: 1.2,
          bgcolor: "#1976d2",
          borderRadius: "6px",
          textTransform: "none",
          fontWeight: 600,
          width:"100%",
          "&:hover": {
            bgcolor: "#1565c0",
          },
          color:"white"}}>Save</Button>
</Box>
        </Box>
        )}
        {editField==="gender" && (
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",mt:6,alignItems:"center"}}>
          <Box sx={{bgcolor:"#EAF2FF",width:100,height:100,borderRadius:"100%",position:'relative',alignItems:"center",display:'flex'}}>
            <GenderIcon sx={{color:"#1976d2",fontSize:40,position:"absolute",left:"50%",transform:"translateX(-50%)"}}/>
          </Box>
          <Typography sx={{fontWeight:600,color:"#63666b",fontSize:{sm:22,xs:19},mt:2}}>Your Gender</Typography>
          <Typography sx={{fontWeight:500,color: "#797979",mt:1,fontSize:{sm:16,xs:15},mb:{
            sm:7,xs:3
          }}}>Select your gender</Typography>
<Box sx={{ mx: 2,width:{sm:600,xs:250}}}>
  <FormControl sx={{ border: "1px solid #D1D5DB",color:"black"}} fullWidth>
  
    <Select value={changeGender??""} onChange={(e)=>setChangeGender(e.target.value)}  IconComponent={()=>(
      <IconButton onClick={()=>{
        setOpenDropDown(!openDropDown)
      }}>
        <DorpDownIcon sx ={{color:"black"}}/>
      </IconButton>
  )} displayEmpty  id="gender" open={openDropDown} onOpen={() => setOpenDropDown(true)}
  onClose={() => setOpenDropDown(false)}  sx={{
        color: "black",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#D1D5DB",
        },
      }}>
<MenuItem value="">Gender</MenuItem>
<MenuItem value="male">Male</MenuItem>
<MenuItem value="female">Female</MenuItem>
<MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
    </Select>
  </FormControl>
</Box>
<Typography sx={{color:"#797979",mt:{
  xs:3,
  sm:7
},fontSize:{
  xs:10,
  sm:15
},fontWeight:500}}>our gender helps personalize your profile.</Typography>
<Box sx={{  mt: {
            sm:7,
            xs:1.5
          },  mx: 2,width:{sm:600,xs:250},}}>
  <Button onClick={(e)=>{
    e.stopPropagation();
    NewGender.mutate(changeGender)
  }} sx={{           py: 1.2,
          bgcolor: "#1976d2",
          borderRadius: "6px",
          textTransform: "none",
          fontWeight: 600,
          width:"100%",
          "&:hover": {
            bgcolor: "#1565c0",
          },
          color:"white"}}>Save</Button>
</Box>
        </Box>
        )}
        {editField==="relation" && (
          <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",mt:6,alignItems:"center"}}>
          <Box sx={{bgcolor:"#EAF2FF",width:100,height:100,borderRadius:"100%",position:'relative',alignItems:"center",display:'flex'}}>
            <RelationShipIcon sx={{color:"#1976d2",fontSize:40,position:"absolute",left:"50%",transform:"translateX(-50%)"}}/>
          </Box>
          <Typography sx={{fontWeight:600,color:"#63666b",fontSize:{sm:21,xs:19},mt:2}}>Your Relationship Status</Typography>
          <Typography sx={{fontWeight:500,color: "#797979",mt:1,fontSize:{sm:16,xs:15},mb:{
            sm:7,xs:3
          }}}>Select your relationship status</Typography>
<Box sx={{ mx: 2,width:{sm:600,xs:250}}}>
  <FormControl sx={{ border: "1px solid #D1D5DB",color:"black"}} fullWidth>
  
    <Select value={changeRelation??""} onChange={(e)=>{
    setChangeRelation(e.target.value)

    }} IconComponent={()=>(
      <IconButton onClick={()=>{
        setOpenDropDown(!openDropDown)
      }}>
        <DorpDownIcon sx ={{color:"black"}}/>
      </IconButton>
  )} displayEmpty  id="gender"  open={openDropDown} onOpen={() => setOpenDropDown(true)}
  onClose={() => setOpenDropDown(false)}  sx={{
        color: "black",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#D1D5DB",
        },
      }}>
<MenuItem value="">Relationship</MenuItem>
<MenuItem value="single">Single</MenuItem>
<MenuItem value="In a relationship">In a relationship</MenuItem>
<MenuItem value="married">Married</MenuItem>
<MenuItem value="It's complicated">It's complicated</MenuItem>
<MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
    </Select>
  </FormControl>
</Box>
<Typography sx={{color:"#797979",mt:{
  xs:3,
  sm:7
},fontSize:{
  xs:10,
  sm:15
},fontWeight:500}}>Share your relationship status.</Typography>
<Box sx={{  mt: {
            sm:7,
            xs:1.5
          },  mx: 2,width:{sm:600,xs:250},}}>
  <Button onClick={(e)=>{
    e.stopPropagation();
    NewRelation.mutate(changeRelation)
  }} sx={{           py: 1.2,
          bgcolor: "#1976d2",
          borderRadius: "6px",
          textTransform: "none",
          fontWeight: 600,
          width:"100%",
          "&:hover": {
            bgcolor: "#1565c0",
          },
          color:"white"}}>Save</Button>
</Box>
        </Box>
        )}
        
      </Card>
    </Box>
  );
}
