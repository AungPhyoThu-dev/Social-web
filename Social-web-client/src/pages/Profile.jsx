import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActionArea,
  Avatar,
  CircularProgress,
  Box,
  Alert,
  Typography,
  IconButton,
  Slide,
  Backdrop,
  Button,
  Divider,
  CardActions,
  TextField,
  Paper,
  Tabs,
  Tab,
  Grid
} from "@mui/material";
import {
  ThumbUp as LikeIcon,
  ChatBubble as CommentIcon,
  Alarm as TimeIcon,
  AccountCircle as ProfileIcon,
  MoreHoriz as ShowSaveIcon,
  TurnedIn as SaveIcon,
  RemoveCircle as NotInterestIcon,
  Link as CopylinkIcon,
  KeyboardArrowDown as ShowReplyIcon,
  KeyboardArrowUp as HideReplyIcon,
  Favorite as CommentLikeIcon,
   Bookmark as SaveICon,
     Apps as OwnPageIcon,
     LockPerson as LockIcon,
     Delete as DeleteIcon,
     SentimentDissatisfied as SadIcon
} from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postLike, RemoveLike } from "../fetchers/auth";
import { UnsavePost } from "../fetchers/auth";
import { useQuery,useMutation, QueryClient } from "@tanstack/react-query";
import { ViewProfile } from "../fetchers/auth";
import { useParams } from "react-router-dom";
import { useApp, queryClient } from "../ThemeApp";
import { formatRelative } from "date-fns";
import { fetchPosts, savePost,deletePost } from "../fetchers/auth";

 
export default function Profile() {
 const navigate=useNavigate();
  const {
     showSaveCard,
     setShowSaveCard,
   tabValue,
   setTabValue,
     hidden,
     setHidden,
     setGlobalMsg,
     postSave,
 
     setPostSave,
     viewImage,
     setViewImage,
     auth,
     showLike,
     setShowLike,
     showSkeleton,
     setShowSkeleton,
     addComment,
     setAddComment,
     mode,
     isExpandPost,
     setExpandedPost,
     expandedPost
     
   } = useApp();
    
  const { id } = useParams();
    useEffect(() => {
    if ((showSaveCard !== null || viewImage !== null, showLike !== null)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSaveCard, viewImage, showLike]);
   const PostLike = useMutation({
    mutationKey: ["PostLike"],
    mutationFn: async (postId) => {
      return postLike(postId);
      
    },
    onSuccess: async (data, postId) => {
      await queryClient.invalidateQueries({
        queryKey: ["profile",id],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const DeletePostMutation=useMutation({
    mutationKey:["DeletePost"],
    mutationFn:async (postId)=>{
      return deletePost(postId)
    },
    onSuccess:async(data,postId)=>{
      queryClient.setQueryData(["profile",id],(oldData)=>{
        if(!oldData) return oldDat;
        return {
          ...oldData,
          posts:oldData.posts?.filter((post)=>post.id!==postId)
        }
        
      })
      await queryClient.invalidateQueries({
        queryKey:["profile",id]
      })
      setGlobalMsg("A post is Deleted");
      setShowSaveCard(null)
    },
    onError:(error)=>{
      console.log(error)
    }
  })
  const PostRemoveLike = useMutation({
    mutationKey: ["RemoveLike"],
    mutationFn: async (postId) => {
      return RemoveLike(postId);
    },
    onSuccess: async (data, postId) => {
      await queryClient.invalidateQueries({
        queryKey: ["profile",id],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const copyLink = async (postId) => {
    try {
      const link = `${window.location.origin}/postDetail/${postId}`;
      await navigator.clipboard.writeText(link);
      setShowSaveCard(null);
      setGlobalMsg("Link copied");
    } catch (error) {
      console.log(error.message);
    }
  };

  const savePostMutation = useMutation({
    mutationKey: ["savePost"],
    mutationFn: async (postId) => {
      return savePost(postId);
    },
    onSuccess: async(data, postId) => {
      (setPostSave((prev) => [...prev, postId]),
      await queryClient.invalidateQueries({
        queryKey:["profile",id]
      }),
        setShowSaveCard(null),
        setGlobalMsg("Post saved"));
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const unsaveMutation = useMutation({
    mutationKey: ["unsavePost"],
    mutationFn: async (postId) => {
      return UnsavePost(postId);
    },
    onSuccess:async (data, postId) => {
      (setPostSave((prev) => prev.filter((id) => id !== postId)),
await queryClient.invalidateQueries({
  queryKey:["profile",id]
}),
        setShowSaveCard(null),
        setGlobalMsg("Unsave Post"));
    },
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile", id],
    queryFn: async () => ViewProfile(id),
  });
 console.log(data)

  const handleTab = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <Box>
      <Paper
        elevation={0}
       sx={{
    height: { xs: 150, sm: 220 },
    borderRadius: 2,
   
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    position: "relative",
  }}
      ></Paper>
      <Card sx={{ position: "relative", minHeight: "100vh", overflow: "visible" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {data?.image ? (
            <Avatar
              sx={{
                width: {
                  sm: 120,
                  xs: 80,
                },
                height: {
                  sm: 120,
                  xs: 80,
                },
                fontSize: 40,
                border: "1px solid grey",
                position: "absolute",
                top: -60,
              }}
              src={data.image}
            />
          ) : (
            <Avatar
              sx={{
                width: {
                  sm: 100,
                  xs: 90,
                },
                height: {
                  sm: 100,
                  xs: 90,
                },
                fontSize: 40,
                border: "1px solid grey",
                 position: "absolute",
                top: -60,
              }}
            >
              <ProfileIcon />
            </Avatar>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            mt:{
              sm:5,
              xs:3
            },
          }}
        >
          <Typography
            sx={{
              color: mode === "dark" ? "white" : "black",
              fontWeight: "bold",
              mt:4,
              fontSize: {
                sm: 18,
              },
            }}
          >
            {data?.username}
          </Typography>

          <Typography variant="caption" sx={{ color: "gray" }}>
            {data?.bio}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 2,
            mt: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {data?.following?.length ?? 0}
            <Typography
              variant="caption"
              sx={{
                color: "grey",
                fontSize: 12,
              }}
            >
              Following
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {data?.follower?.length ?? 0}
            <Typography
              variant="caption"
              sx={{
                color: "grey",
                fontSize: 12,
              }}
            >
              Followers
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {data?.posts?.reduce((total,post)=>total+(post.postLikes?.length??0),0)}
            <Typography
              variant="caption"
              sx={{
                color: "grey",
                fontSize: 12,
              }}
            >
              postLikes
            </Typography>
          </Box>
        </Box>
        {data?.isNotOwner?( <Box sx={{display:'flex',justifyContent:"center",mt:2,gap:1}}>
          <Button variant="contained"  color="success"  sx={{
      textTransform: "none",
      borderRadius: 2,
      px: 3,
      fontWeight: 600,
    }}>
            Follow
          </Button>
          <Button color="error" variant="contained"  sx={{
      textTransform: "none",
      borderRadius: 2,
      px: 3,
      fontWeight: 600,
    }}>Block</Button>
        </Box>):( <Box sx={{display:'flex',justifyContent:"center",mt:2,gap:1}}>
          <Button onClick={()=>{
            navigate("/editprofile")
          }} variant="contained"  sx={{
      textTransform: "none",
      borderRadius: 2,
      px: 3,
      fontWeight: 600,
      bgcolor:"orange"
    }}>
            Edit profile
          </Button>
          <Button  onClick={()=>{
            navigate(`/addpost`)
          }} variant="contained"  sx={{
      textTransform: "none",
      borderRadius: 2,
      px: 4,
      fontWeight: 600,
       bgcolor: "blue",
    }}>Add Post</Button>
        </Box>)}
       
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5,mb:4,}}>
          <Tabs value={tabValue} onChange={handleTab}>
            <Tab icon={<OwnPageIcon />} value={1} />
            <Tab icon={<SaveICon />} value={2} />
          </Tabs>
        </Box>
        
        {tabValue === 1 &&(
          !data?.posts?.length?(<Box sx={{
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"column",
  height:"40vh"
}}>
  <Box sx={{display:'flex',flexDirection:"row"}}><Typography variant="h7" sx={{
fontWeight:"bold"
  }}> No Posts here</Typography>
  <SadIcon sx={{fontSize:21,ml:1,color:"red"}}/>
  </Box>
  
  <Typography variant="body2" sx={{color: "text.secondary",}}> Your story starts here. </Typography>
</Box>):( data?.posts?.map((post) => {
               const isLike = post.postLikes?.some(
              (like) => like.userId === auth.id,
            );
            const Maxlength=100;
            const isPostLong=post.content.length>Maxlength;
            const isExpandPost=expandedPost===post.id;
            return (
              <Box  key={post.id}>
                <Card
                  sx={{
                    maxWidth: "100%",
                    mx: "auto",
                    mb: 3,
                    height: "auto",
                    width: {
                      sm: 900,
                      xs: "100%",
                    },
                 boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                 boxShadow:1,
                  }}
                >
                  <CardHeader
                    avatar={
                      data.image ? (
                        <Avatar  src={data.image} />
                      ) : (
                        <Avatar>
                          <ProfileIcon />
                        </Avatar>
                      )
                    }
                    title={data?.username}
                    slotProps={{
                      title: {
                        sx: {
                          fontWeight: "bold",
                        },
                      },
                    }}
                    subheader={
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <TimeIcon
                          sx={{ fontSize: 14, mt: 0.2, color: "blue" }}
                        />
                        <Typography variant="caption" sx={{ fontSize: 10 }}>
                          {formatRelative(new Date(data?.created), new Date())}
                        </Typography>
                      </Box>
                    }
                    action={
                      <IconButton
                        onClick={() => {
                          setShowSaveCard(post.id);
                          console.log(showSaveCard);
                        }}
                      >
                        <ShowSaveIcon />
                      </IconButton>
                    }
                    
       
                  />
             {post.images?.length === 1 ? (
                    <>
                   
                    
                      <CardMedia
                        onClick={(e) => {
                          e.stopPropagation();
                          setViewImage(post.id);
                        }}
                        component="img"
                        image={post.images[0].url}
                        sx={{
                          height: {
                            sm: 400,
                            xs: 300,
                          },
                        }}
                        alt="image"
                      />
                    </>
                  ) : (
                    <>
                     <CardContent>
                        <Typography variant="caption">
                          {isPostLong && !isExpandPost?(
                             <>
                            {post.content.slice(0,Maxlength)}
                            ...
                            <Button onClick={(e)=>{
                              setExpandedPost(post.id),
                             e.stopPropagation()

                            }} sx={{
  p: 0,
  minWidth: 0,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "transparent",
  },
  "&:focus": {
    outline: "none",
  },
  "&:focus-visible": {
    outline: "none",
  },
}}>
                              <Typography     sx={{
                                    color: "blue",
                                    p: 0,
                                    minWidth: 0,
                                    textTransform: "none",
                                    fontSize: 13,
                                  }}>
                                See more
                              </Typography>
                            </Button>
                            </>
                          ):(
                           post.content
                          )}
                        </Typography>
                      </CardContent>

                      <Grid container>
                                              {post.images.slice(0, 4).map((image, index) => {
                                                return(
                                                  <Grid
                              key={image.id}
                              size={
                                post.images.length === 3
                                  ? index === 2
                                    ? 12
                                    : 6
                                  : 6
                              }
                              sx={{ position: "relative" }}
                            >
                                                  <Box
                                                    component="img"
                                                    src={image.url}
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      setViewImage(image.url);
                                                    }}
                                                     sx={{
                                  width: "100%",
                                  height: {
                                    sm: post.images.length === 3
                                      ? index === 2
                                        ? 190
                                        : 190
                                      : 280,
                                    xs: post.images.length === 3
                                      ? index === 2
                                        ? 180
                                        : 180
                                      : 230,
                                  },
                                  objectFit: "cover",
                                  display: "block",
                                  cursor: "pointer",
                                }}
                                                  ></Box>
                                                </Grid>
                                                )
                                               
                                              })}
                                            </Grid>
                    </>
                  )}
         <CardActions
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (isLike) {
                            PostRemoveLike.mutate(post.id);
                          } else {
                            PostLike.mutate(post.id);
                          }
                        }}
                      >
                        <LikeIcon
                          sx={{
                            fontSize: {
                              xs: 19,
                              sm: 25,
                            },
                            color: isLike ? "blue" : "text.secondary",
                          }}
                        />
                      </IconButton>
                      {post.postLikes?.length > 0 && (
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "0.8rem",
                              sm: "0.9rem",
                            },
                            fontWeight: 500,
                            color: "text.secondary",
                          }}
                        >
                          {post.postLikes?.length}
                        </Typography>
                      )}
                      <IconButton
                        onClick={() => {
                          setAddComment(post.id);
                          navigate(`/postDetail/${post.id}`);
                        }}
                      >
                        <CommentIcon
                          sx={{
                            fontSize: {
                              xs: 19,
                              sm: 25,
                            },
                          }}
                        />
                      </IconButton>
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "0.8rem",
                            sm: "0.9rem",
                          },
                          fontWeight: 500,
                          color: "text.secondary",
                        }}
                      >
                        {post.comments?.filter(
                          (comment) => comment.parentId === null,
                        ).length ?? 0}
                      </Typography>
                    </Box>
                    {post.postLikes?.length > 0 && (
                      <Box sx={{ display: "flex", marginLeft: "auto" }}>
                        <IconButton
                          onClick={() => {
                            setShowLike(post);
                            
                          }}
                        >
                          <LikeIcon
                            sx={{
                              color: mode==="dark"?"white":"blue",
                              fontSize: {
                                xs: 17,
                                sm: 19,
                              },
                              border: "2px solid blue",
                              borderRadius: "100%",
                            }}
                          />
                        </IconButton>
                      </Box>
                    )}
                  </CardActions>
        
                </Card>
              </Box>
            );
          }))
        )

         }
        {tabValue === 2 && (data?.isNotOwner?(
<Box sx={{
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"column",
  height:"40vh"
}}>
  <Box sx={{display:'flex',flexDirection:"row"}}><Typography variant="h7" sx={{
fontWeight:"bold"
  }}> Saved posts are private</Typography>
  <LockIcon sx={{fontSize:21,ml:1,color:"gold"}}/>
  </Box>
  
  <Typography variant="body2" sx={{color: "text.secondary",}}> Only the owner can view saved posts.</Typography>
</Box>
        ):(<Box>
          {data?.savePosts?.length>0 ? (  data?.savePosts?.map((Savepost)=>{
            console.log(Savepost)
   const isLike = Savepost.post?.postLikes?.some(
              (like) => like.userId === auth.id,
            );
             const Maxlength=100;
                    const isPostLong=Savepost.post.content.length >Maxlength;
                    const isExpandPost=expandedPost===Savepost.post.id;
            return(
              <Box  key={Savepost.id}>
                <Card
                  sx={{
                    maxWidth: "100%",
                    mx: "auto",
                    mb: 3,
                    height: "auto",
                    width: {
                      sm: 900,
                      xs: "100%",
                    },
                 boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                 boxShadow:1,
                  }}
                >
                  <CardHeader
                    avatar={
                      Savepost.post?.user?.image? (
                        <Avatar src={Savepost.post?.user.image} />
                      
                      ) : (
                        <Avatar>
                          <ProfileIcon />
                          console.log(data)
                        </Avatar>
                      )
                    }
                    title={Savepost.post?.user.username}
                    slotProps={{
                      title: {
                        sx: {
                          fontWeight: "bold",
                        },
                      },
                    }}
                    subheader={
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <TimeIcon
                          sx={{ fontSize: 14, mt: 0.2, color: "blue" }}
                        />
                        <Typography variant="caption" sx={{ fontSize: 10 }}>
                          {formatRelative(new Date(data?.created), new Date())}
                        </Typography>
                      </Box>
                    }
                    action={
                      <IconButton
                        onClick={() => {
                          setShowSaveCard(Savepost.post?.id);
                          console.log(showSaveCard);
                        }}
                      >
                        <ShowSaveIcon />
                      </IconButton>
                    }
                    
       
                  />
                 {Savepost.post.images?.length === 1 ? (
                                 <>
                                
                                 
                                   <CardMedia
                                     onClick={(e) => {
                                       e.stopPropagation();
                                       setViewImage(Savepost.post.id);
                                     }}
                                     component="img"
                                     image={Savepost.post.images[0].url}
                                     sx={{
                                       height: {
                                         sm: 400,
                                         xs: 300,
                                       },
                                     }}
                                     alt="image"
                                   />
                                 </>
                               ) : (
                                 <>
                                  <CardContent>
                                     <Typography variant="caption">
                                       {isPostLong && !isExpandPost?(
                                          <>
                                         {Savepost.post.content.slice(0,Maxlength)}
                                         ...
                                         <Button onClick={(e)=>{
                                           setExpandedPost(Savepost.post.id),
                                          e.stopPropagation()
             
                                         }} sx={{
               p: 0,
               minWidth: 0,
               textTransform: "none",
               "&:hover": {
                 backgroundColor: "transparent",
               },
               "&:focus": {
                 outline: "none",
               },
               "&:focus-visible": {
                 outline: "none",
               },
             }}>
                                           <Typography     sx={{
                                                 color: "blue",
                                                 p: 0,
                                                 minWidth: 0,
                                                 textTransform: "none",
                                                 fontSize: 13,
                                               }}>
                                             See more
                                           </Typography>
                                         </Button>
                                         </>
                                       ):(
                                        Savepost.post.content
                                       )}
                                     </Typography>
                                   </CardContent>
             
                                   <Grid container>
                                     {Savepost.post.images?.slice(0, 4).map((image, index) => {
                                       return(
                                          <Grid
                                         key={image.id}
                                         size={Savepost.post.images?.length === 3 ? 4 : 6}
                                         sx={{ position: "relative" }}
                                       >
                                         <Box
                                           component="img"
                                           src={image.url}
                                           onClick={(e) => {
                                             e.stopPropagation();
                                             setViewImage(image.url);
                                           }}
                                           sx={{
                                                width: "100%",
                           height: {
             sm:400,
             xs:250
                           },
                           objectFit: "cover",
                           display: "block",
                           cursor: "pointer",
                                           }}
                                         ></Box>
                                       </Grid>
                                       )
                                      
                                     })}
                                   </Grid>
                                 </>
                               )}
         <CardActions
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (isLike) {
                            PostRemoveLike.mutate(Savepost.post.id);
                          } else {
                            PostLike.mutate(Savepost.post.id);
                          }
                        }}
                      >
                        <LikeIcon
                          sx={{
                            fontSize: {
                              xs: 19,
                              sm: 25,
                            },
                            color: isLike ? "blue" : "text.secondary",
                          }}
                        />
                      </IconButton>
                      {Savepost.post?.postLikes?.length > 0 && (
                        <Typography
                          sx={{
                            fontSize: {
                              xs: "0.8rem",
                              sm: "0.9rem",
                            },
                            fontWeight: 500,
                            color: "text.secondary",
                          }}
                        >
                          {Savepost.post?.postLikes?.length}
                        </Typography>
                      )}
                      <IconButton
                        onClick={() => {
                          setAddComment(Savepost.id);
                          navigate(`/postDetail/${Savepost.post.id}`);
                        }}
                      >
                        <CommentIcon
                          sx={{
                            fontSize: {
                              xs: 19,
                              sm: 25,
                            },
                          }}
                        />
                      </IconButton>
                      <Typography
                        sx={{
                          fontSize: {
                            xs: "0.8rem",
                            sm: "0.9rem",
                          },
                          fontWeight: 500,
                          color: "text.secondary",
                        }}
                      >
                        {Savepost.post?.comments?.filter(
                          (comment) => comment.parentId === null,
                        ).length ?? 0}
                      </Typography>
                    </Box>
                    {Savepost.post?.postLikes?.length > 0 && (
                      <Box sx={{ display: "flex", marginLeft: "auto" }}>
                        <IconButton
                          onClick={() => {
                            setShowLike(Savepost.post);
                            
                          }}
                        >
                          <LikeIcon
                            sx={{
                              color: mode==="dark"?"white":"blue",
                              fontSize: {
                                xs: 17,
                                sm: 19,
                              },
                              border: "2px solid blue",
                              borderRadius: "100%",
                            }}
                          />
                        </IconButton>
                      </Box>
                    )}
                  </CardActions>
        
                </Card>
              </Box>
            )
          })):(<Box sx={{
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"column",
  height:"60vh"
}}>
    <Box sx={{display:'flex',flexDirection:"row"}}><Typography variant="h7" sx={{
fontWeight:"bold"
  }}> No saved posts yet</Typography>
  <SaveICon sx={{fontSize:21,ml:1,color:"red"}}/>
  </Box>
   <Typography variant="body2" sx={{color: "text.secondary",}}> Posts you save will appear here.</Typography>
</Box>)}
        
        </Box>))}
      </Card>
      
            <Backdrop
              open={showSaveCard !== null || showLike !== null}
              onClick={() => {
                setShowSaveCard(null);
                setShowLike(null);
              }}
              sx={{
                zIndex: 1400,
                bgcolor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              {data?.isNotOwner?( showSaveCard !== null && (
                <Slide direction="up" in={showSaveCard !== null}>
                  <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      position: "fixed",
      
                      bottom: 0,
      
                      height: 160,
      
                      width: {
                        xs: "100%",
                        sm: 500,
                      },
                      bgcolor: mode === "dark" ? "white" : "background.paper",
                      zIndex: 9999,
                      display: "flex",
                      justifyContent: "center",
                      mx: "auto",
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                  >
                    <Card
                      sx={{
                        width: {
                          sm: "100%",
                          xs: "90%",
                        },
                        height: "auto",
                        mt: 3,
                        bgcolor: "transparent",
                      }}
                    >
                      <Box sx={{ mb: 3 }}>
                        <Button
                          onClick={() => {
                            const isSaved = postSave.includes(showSaveCard);
                            if (isSaved) {
                              unsaveMutation.mutate(showSaveCard);
                            } else {
                              savePostMutation.mutate(showSaveCard);
                            }
                          }}
                          sx={{
                            textTransform: "none",
                            width: "100%",
                            justifyContent: "flex-start",
                          }}
                        >
                          {postSave.includes(showSaveCard) ? (
                            <SaveIcon sx={{ mr: 3, color: "blue" }} />
                          ) : (
                            <SaveIcon
                              sx={{
                                mr: 3,
                                color: mode === "dark" ? "green" : "black",
                              }}
                            />
                          )}
      
                          <Typography
                            sx={{
                              fontFamily: "Arial, sans-serif",
                              fontWeight: "bold",
                              fontSize: {
                                ms: 16,
                                xs: 13,
                              },
                              color: "#0F172A",
                              mt: 1,
                            }}
                          >
                            {postSave.includes(showSaveCard)
                              ? "UnsavePost"
                              : "SavePost"}
                          </Typography>
                        </Button>
                        <Divider
                          sx={{
                            borderColor: "grey.400",
                            width: "100%",
                            mt: 2,
                          }}
                        />
                       
                      </Box>
                 
      <Box sx={{ mb: 3 }}>
         <Button
                        onClick={() => {
                          copyLink(showSaveCard);
                        }}
                        sx={{
                          textTransform: "none",
                          justifyContent: "flex-start",
                          width: "100%",
                        }}
                      >
                        <CopylinkIcon sx={{ mr: 3, color: "blue" }} />
                        <Typography
                          sx={{
                            fontFamily: "Arial, sans-serif",
                            fontWeight: "bold",
                            fontSize: {
                              ms: 16,
                              xs: 13,
                            },
                            color: "#0F172A",
                          }}
                        >
                          Copy Link
                        </Typography>
                      </Button>
               <Divider   sx={{
                            borderColor: "grey.400",
                            width: "100%",
                            mt: 2,
                          }}/>             
      </Box>
                  
                    
                    </Card>
                  </Box>
                </Slide>
              )):( showSaveCard !== null && (
                <Slide direction="up" in={showSaveCard !== null}>
                  <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                      position: "fixed",
      
                      bottom: 0,
      
                      height: tabValue===1?240:160,
      
                      width: {
                        xs: "100%",
                        sm: 500,
                      },
                      bgcolor: mode === "dark" ? "white" : "background.paper",
                      zIndex: 9999,
                      display: "flex",
                      justifyContent: "center",
                      mx: "auto",
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                  >
                    <Card
                      sx={{
                        width: {
                          sm: "100%",
                          xs: "90%",
                        },
                        height: "auto",
                        mt: 3,
                        bgcolor: "transparent",
                      }}
                    >
                      <Box sx={{ mb: 3 }}>
                        <Button
                          onClick={() => {
                            const isSaved = postSave.includes(showSaveCard);
                            if (isSaved) {
                              unsaveMutation.mutate(showSaveCard);
                            } else {
                              savePostMutation.mutate(showSaveCard);
                            }
                          }}
                          sx={{
                            textTransform: "none",
                            width: "100%",
                            justifyContent: "flex-start",
                          }}
                        >
                          {postSave.includes(showSaveCard) ? (
                            <SaveIcon sx={{ mr: 3, color: "blue" }} />
                          ) : (
                            <SaveIcon
                              sx={{
                                mr: 3,
                                color: mode === "dark" ? "green" : "black",
                              }}
                            />
                          )}
      
                          <Typography
                            sx={{
                              fontFamily: "Arial, sans-serif",
                              fontWeight: "bold",
                              fontSize: {
                                ms: 16,
                                xs: 13,
                              },
                              color: "#0F172A",
                              mt: 1,
                            }}
                          >
                            {postSave.includes(showSaveCard)
                              ? "UnsavePost"
                              : "SavePost"}
                          </Typography>
                        </Button>
                        <Divider
                          sx={{
                            borderColor: "grey.400",
                            width: "100%",
                            mt: 2,
                          }}
                        />
                       
                      </Box>
                 
      <Box sx={{ mb: 3 }}>
         <Button
                        onClick={() => {
                          copyLink(showSaveCard);
                        }}
                        sx={{
                          textTransform: "none",
                          justifyContent: "flex-start",
                          width: "100%",
                        }}
                      >
                        <CopylinkIcon sx={{ mr: 3, color: "blue" }} />
                        <Typography
                          sx={{
                            fontFamily: "Arial, sans-serif",
                            fontWeight: "bold",
                            fontSize: {
                              ms: 16,
                              xs: 13,
                            },
                            color: "#0F172A",
                          }}
                        >
                          Copy Link
                        </Typography>
                      </Button>
               <Divider   sx={{
                            borderColor: "grey.400",
                            width: "100%",
                            mt: 2,
                          }}/>             
      </Box>
      {tabValue===1 &&(
         <Box sx={{mb:3}}>   <Button
                        onClick={() => {
                          DeletePostMutation.mutate(showSaveCard);
                        }}
                        sx={{

                          textTransform: "none",
                          justifyContent: "flex-start",
                          width: "100%",
                        }}
                      >
                        <DeleteIcon sx={{ mr: 3, color: "red" }} />
                        <Typography
                          sx={{
                            fontFamily: "Arial, sans-serif",
                            fontWeight: "bold",
                            fontSize: {
                              ms: 16,
                              xs: 13,
                            },
                            color: "#0F172A",
                          }}
                        >
                          Delete Post
                        </Typography>
                      </Button></Box> 
      )}
                   
                    
                    </Card>
                  </Box>
                </Slide>
              ))}
             
              {showLike !== null && (
                <Slide direction="up" in={showLike !== null}>
                  <Box
                    onClick={(e) => e.stopPropagation()
                      
                      
                    }
                    sx={{
                      position: "fixed",
      
                      bottom: 0,
      
                      height: 300,
      
                      width: {
                        xs: "100%",
                        sm: 600,
                      },
                      bgcolor: mode === "dark" ? "white" : "background.paper",
                      zIndex: 9999,
                      display: "flex",
      
                      mx: "auto",
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                    }}
                  >
                    <Card
                      sx={{
                        bgcolor: "transparent",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardHeader
                        avatar={
                          <IconButton>
                            <LikeIcon sx={{ color: "blue", fontSize: 20 }} />
                          </IconButton>
                        }
                        title={
                          <Typography sx={{ color: "blue" }}>
                            {showLike?.postLikes?.length ?? 0}
                          </Typography>
                        }
                      />
                      <Divider sx={{ border: "0.1px solid grey" }} />
                      <Box
                        sx={{
                          flex: 1,
                          overflowY: "auto",
      
                          pb: 2,
                        }}
                      >
                        {showLike?.postLikes?.map((likeuser) => {
                         
                          return (
                            <Box
                              key={likeuser.id}
                              sx={{
                                mb: 2,
                                mt: 2,
                                ml: 2,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {likeuser?.user ? (
                                <Avatar
                                  sx={{
                                    width: {
                                      sm: 45,
                                      xs: 35,
                                    },
                                    height: {
                                      sm: 45,
                                      xs: 35,
                                    },
                                  }}
                                  src={likeuser?.user?.image}
                                />
                              ) : (
                                <Avatar>
                                  <ProfileIcon
                                    sx={{
                                      width: {
                                        sm: 45,
                                        xs: 35,
                                      },
                                      height: {
                                        sm: 45,
                                        xs: 35,
                                      },
                                    }}
                                  />
                                </Avatar>
                              )}
                              <Typography
                                sx={{
                                  color: "blue",
                                  ml: 1,
                                  fontWeight: 700,
                                  letterSpacing: 0.3,
                                  fontSize: {
                                    sm: 16,
                                    xs: 14,
                                  },
                                }}
                              >
                               {likeuser?.user?.username}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    </Card>
                  </Box>
                </Slide>
              )}
            </Backdrop>
            <Backdrop
                    open={viewImage !== null}
                    onClick={() => {
                      setViewImage(null);
                    }}
                    sx={{
                      zIndex: 1100,
                      bgcolor: "rgba(0, 0, 0, 0.9)",
                    }}
                  >
                   
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
                          color: "blue",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={viewImage}
                          sx={{
                            height: {
                              sm: 400,
                              xs: 300,
                            },
                          }}
                          alt="image"
                        ></CardMedia>
                      </Card>
                    
                  </Backdrop>
    </Box>
  );
}
