import {
  Card,
  Avatar,
  Typography,
  CardHeader,
  Box,
  TextField,
  CardActions,
  CardContent,
  IconButton,
  Button,
  Backdrop,
  Tabs,
  Tab,
  InputAdornment,
  Grid,
} from "@mui/material";
import {
  PersonAdd as PeopleIcon,
  AddReaction as FeelingIcon,
  Search as SearchIcon,
  AddPhotoAlternate as AddPhotoIcon,
  Send as SendIcon,
  Cancel as RemoveIcon
} from "@mui/icons-material";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, useApp } from "../ThemeApp";
import { useNavigate } from "react-router-dom";
import { AddPost as createPost } from "../fetchers/auth";
;
export default function AddPost() {
  const navigate=useNavigate();
  const feelings = [
    {id:1, name: "Happy", emoji: "😀" },
    {id:2, name: "Excited", emoji: "😃" },
    {id:3, name: "Joyful", emoji: "😄" },
    {id:4, name: "Grinning", emoji: "😁" },
    {id:5, name: "Laughing", emoji: "😂" },
    {id:6, name: "Funny", emoji: "🤣" },
    {id:7, name: "Loved", emoji: "😍" },
    {id:8, name: "Adorable", emoji: "🥰" },
    {id:9, name: "Kissing", emoji: "😘" },
    {id:10, name: "Cool", emoji: "😎" },
    {id:11, name: "Awesome", emoji: "🤩" },
    {id:12, name: "Sad", emoji: "😢" },
    {id:13, name: "Crying", emoji: "😭" },
    {id:14, name: "Angry", emoji: "😡" },
    {id:15, name: "Furious", emoji: "🤬" },
    {id:16, name: "Scared", emoji: "😱" },
  
  ];
  const activities = [
  { id: 1, name: "Working", emoji: "💼" },
  { id: 2, name: "Studying", emoji: "📚" },
  { id: 3, name: "Gaming", emoji: "🎮" },
  { id: 4, name: "Watching", emoji: "📺" },
  { id: 5, name: "Listening", emoji: "🎧" },
  { id: 6, name: "Reading", emoji: "📖" },
  { id: 7, name: "Eating", emoji: "🍔" },
  { id: 8, name: "Drinking", emoji: "☕" },
  { id: 9, name: "Cooking", emoji: "👨‍🍳" },
  { id: 10, name: "Traveling", emoji: "✈️" },
  { id: 11, name: "Exercising", emoji: "🏋️" },
  { id: 12, name: "Running", emoji: "🏃" },
  { id: 13, name: "Sleeping", emoji: "😴" },
  { id: 14, name: "Shopping", emoji: "🛍️" },
  { id: 15, name: "Celebrating", emoji: "🎉" },
  { id: 16, name: "Coding", emoji: "💻" },
];
  const handleTab = (event, newValue) => {
    setShowFeelingTab(newValue);
  };
  const {
    mode,
    auth,
    showFeeling,
    setShowFeeling,
    showFeelingTab,
    setShowFeelingTab,
    searchFeeling,
    setSearchFeeling,
    selectedEmoji,
    setSelectedEmoji,
    searchActivity,
    setSearchActivity,
    storeImage,
    setStoreImage,
    selectedImage,
    setSelectedImage,
    setGlobalMsg
  } = useApp();
  
  console.log(auth);
  const contentRef=useRef();
 

const handleChangeImage=(e)=>{
  const files=Array.from(e.target.files);
  setSelectedImage((prev)=>{
      const remainImage=4-prev.length;
      if(remainImage<=0){
        return prev;
      }
      return [...prev,...files.slice(0,remainImage)]
  }

  
  );
 
  e.target.value="";
}
const handleRemoveImage=(index)=>{
  
      setSelectedImage((prev)=>prev.filter((_,i)=>i!=index))
  

}
const addPostMutation=useMutation({
  mutationKey:["AddPost"],
  mutationFn:createPost,
  onSuccess:async()=>{
    await queryClient.invalidateQueries({
      queryKey:["posts"]
    }),
    navigate("/")
  },
  onError:(error)=>{
    console.log(error)
  }

})
const handleSubmit=()=>{
const content=contentRef.current.value;
const formData=new FormData();

formData.append("content",content);

selectedImage.forEach((image)=>{
  formData.append("images",image)
})
  if (selectedEmoji) {
    formData.append("feeling", selectedEmoji.name);
    formData.append("emoji", selectedEmoji.emoji);
  }

setGlobalMsg("New Post is Added")
addPostMutation.mutate(formData)

}
  const filteredEmoji=searchFeeling===""?feelings:feelings.filter((feeling)=>feeling.name.toLocaleLowerCase().includes(searchFeeling.toLocaleLowerCase()))
  const filteredActivity=searchActivity===""?activities:activities.filter((activity)=>activity.name.toLocaleLowerCase().includes(searchActivity.toLocaleLowerCase()))
 
  console.log(selectedEmoji);
  console.log(filteredActivity);
  
  return (
    <>
      <Card
        sx={{
          width: {
            sm: 700,
            xs: "100%",
          },
          height: "auto",
          mx: "auto",
          mt: 15,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 3 }}>
          {" "}
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: {
                sm: 15,
                xs: 12,
              },
            }}
          >
            New Post
          </Typography>
        </Box>

        <CardHeader
          avatar={
            <Avatar
              sx={{
                width: {
                  sm: 60,
                  xs: 50,
                },
                height: {
                  sm: 60,
                  xs: 50,
                },
              }}
              src={auth?.image}
              
            />
          }
          title={
            selectedEmoji ?(<Typography
              sx={{
                fontWeight: "bold",
                fontSize: {
                  sm: 22,
                  xs: 15,
                },
              }}
            >
              {auth?.username} is {selectedEmoji.name} {selectedEmoji.emoji}
            </Typography>):(<Typography sx={{fontSize:{
               sm: 18,
                  xs: 15,
            }}}>{auth?.username}</Typography>)}
           
            
          
        />
        <CardContent>
          <Box>
            <Box sx={{ mb: 2 }}>
              <Button
                size="small"
                variant="contained"
                sx={{
                  borderRadius: 50,
                  bgcolor: "transparent",
                  boxShadow: 0,
                  border: "1px solid gray",
                  color: mode === "dark" ? "white" : "black",
                  textTransform: "none",
                  mr: 2,
                }}
                startIcon={<PeopleIcon />}
              >
                People
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{
                  borderRadius: 50,
                  bgcolor: "transparent",
                  boxShadow: 0,
                  border: "1px solid gray",
                  color: mode === "dark" ? "white" : "black",
                  textTransform: "none",
                }}
                startIcon={<FeelingIcon />}
                onClick={() => {
                  setShowFeeling(auth.id);
                }}
              >
                Feeling/activity
              </Button>
            </Box>
            <Typography variant="caption">Content</Typography>
            <TextField
              multiline
              minRows={4}
              maxRows={8}
              placeholder="What's on your mind"
              fullWidth
            inputRef={contentRef}
            />
          </Box>
          {selectedImage.length>0 && (
          
                 <Grid  container spacing={1} sx={{mt:2,}}>
              {selectedImage.map((image,index)=>{
                return(
                     <Grid size="auto" key={index}>
                      <Box sx={{position:"relative",ml:3}}>
                         <Box component="img" src={URL.createObjectURL(image) }   sx={{
            width: {
              sm:80,
              xs:52
            },
            height: {
              sm:80,
              xs:52
            },
            objectFit: "cover",
            borderRadius: 2,
            color:"red"
          }}>

                  </Box>
                          <IconButton onClick={()=>{
                            handleRemoveImage(index)
                          }}  sx={{
              position: "absolute",
              top: {
                sm:-5,
                xs:-8
              },
              right: {
                sm:-4,
                xs:-0.5
              },
              width: 30,
              height: 30,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
            
            }}>
                        <RemoveIcon/>
                      </IconButton>
                      
                      </Box>
                    
                 
                  </Grid>
                )
             
              })}
            </Grid>
         
         
          )}
          <Box sx={{mt:3}}>
            <Button  component="label" variant="outlined" fullWidth  startIcon={<AddPhotoIcon sx={{color:"blue",}}/>}  sx={{
    
    py: 1,
    borderRadius: 3,
    textTransform: "none",
    fontSize: {
    xs:13,
    sm:16
    },
    fontWeight: 500,
    border:"1px solid gray",
     color: mode === "dark" ? "white" : "black",
        bgcolor: "transparent",
  }}>
              Add Photos
       <input type="file" hidden multiple accept="image/*"   onChange={handleChangeImage}/>
            </Button>
      
          </Box>
         
          <Box sx={{display:"flex",justifyContent:"flex-end",mt:3}}>
                   <Button onClick={()=>{
                    handleSubmit()
                   }} endIcon={<SendIcon/>} type="submit" sx={{
          cursor:"pointer",
          
          color:mode==="dark"?"white":"black",
          backgroundColor:
        mode === "dark"
          ? "rgba(255,255,255,0.03)"
          : "#1877F2",
    border:mode==="dark"?"1px solid gray":"1px solid blue",
      borderColor:
        mode === "dark"
          ? "rgba(255,255,255,0.25)"
          : "rgba(0,0,0,0.2)",
          
        }}>
          <Typography sx={{mt:0.5,fontSize:12}}> Post</Typography>
         
        </Button>
          </Box>
        </CardContent>
 
      </Card>
      <Backdrop
        open={showFeeling !== null}
        sx={{
          zIndex: 1000,
          userSelect: "none",
        }}
        onClick={() => {
          setShowFeeling(null);
        }}
      >
        <Card
          onClick={(e) => {
            e.stopPropagation();
          }}
          sx={{
            width: {
              sm: 600,
              xs: "100%",
              height: {
                sm:700,
                xs:500
              },
            },
          }}
        >
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
              mb: {
                sm: 2,
                xs: 1,
              },
              fontWeight: "bold",
            }}
          >
            How are you feeling?
          </Typography>
          <Box sx={{ mb: 1 }}>
            <Tabs value={showFeelingTab} onChange={handleTab}>
              <Tab
                label={
                  <Typography sx={{ fontSize: 13, textTransform: "none" }}>
                    Feelings
                  </Typography>
                }
                value={1}
              />
              <Tab
                label={
                  <Typography sx={{ fontSize: 13, textTransform: "none" }}>
                    Activities
                  </Typography>
                }
                value={2}
              />
            </Tabs>
          </Box>
         
          {showFeelingTab===1 && ( <TextField
          value={searchFeeling}
           onChange={(e)=>setSearchFeeling(e.target.value)}
            placeholder="Search Feeling Icon"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            fullWidth
          />)}
         {showFeelingTab===2 && ( <TextField
          value={searchActivity}
           onChange={(e)=>setSearchActivity(e.target.value)}
            placeholder="Search Activity Icon"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            fullWidth
          />)}
          <Grid container>
            {showFeelingTab === 1 &&
            filteredEmoji.map((feeling) => {
                return (
                  <Grid size={6} key={feeling.id}>
                    <Box onClick={()=>{
                      setSelectedEmoji(feeling);
                      setShowFeeling(null)
                    }}
                      sx={{
                        border: "1px solid grey",
                        cursor: "pointer",
                        display: "flex",
                        p: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            sm: 21,
                            xs: 15,
                          },
                          mr: {
                            sm: 4,
                            xs: 2,
                          },
                        }}
                      >
                
                        {feeling.emoji}
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: {
                            sm: 16,
                            xs: 11,
                            
                          },
                          mt:0.5
                        }}
                      >
                        {feeling.name}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
              {showFeelingTab===2 && filteredActivity.map((activity)=>{
                  return (
                  <Grid size={6} key={activity.id}>
                    <Box onClick={()=>{
                      setSelectedEmoji(activity);
                      setShowFeeling(null)
                    }}
                      sx={{
                        border: "1px solid grey",
                        cursor: "pointer",
                        display: "flex",
                        p: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: {
                            sm: 21,
                            xs: 15,
                          },
                          mr: {
                            sm: 4,
                            xs: 2,
                          },
                        }}
                      >
                
                        {activity.emoji}
                      </Typography>

                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: {
                            sm: 16,
                            xs: 11,
                            
                          },
                          mt:0.5
                        }}
                      >
                        {activity.name}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        </Card>
      </Backdrop>
    </>
  );
}
