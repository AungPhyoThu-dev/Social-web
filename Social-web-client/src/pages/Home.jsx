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
  Grid,
  
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
  ThumbDown as UnlikeButton,
} from "@mui/icons-material";
import { queryClient, useApp } from "../ThemeApp";
import { fetchPosts, savePost } from "../fetchers/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { formatRelative } from "date-fns";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postLike, RemoveLike } from "../fetchers/auth";
import { UnsavePost } from "../fetchers/auth";
import { PostSkeleton } from "../../Skeletons/PostSkeleton";
export default function Home() {
  const navigate = useNavigate();
  const {
    showSaveCard,
    setShowSaveCard,
    mode,
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
    expandPost,
    isExpandPost,
    expandedPost,
    setExpandedPost

  } = useApp();
  
  
useEffect(()=>{
    console.log({
    showSaveCard,
    viewImage,
    showLike,
  });
const shouldLockScroll=
showSaveCard!=null|| viewImage!=null|| showLike!=null;
document.body.style.overflow=shouldLockScroll?"hidden":"";
return()=>{
  document.body.style.overflow=""
}
},[showSaveCard, viewImage, showLike])
  const PostLike = useMutation({
    mutationKey: ["PostLike"],
    mutationFn: async (postId) => {
      return postLike(postId);
    },
    onSuccess: async (data, postId) => {
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const PostRemoveLike = useMutation({
    mutationKey: ["RemoveLike"],
    mutationFn: async (postId) => {
      return RemoveLike(postId);
    },
    onSuccess: async (data, postId) => {
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
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
  const hidePost = (postId) => {
    setHidden((prev) => [...prev, postId]);
    setShowSaveCard(null);
    setGlobalMsg("Post is hidden");
    setTimeout(() => {
      setHidden((prev) => prev.filter((id) => id !== postId));
    }, 10000);
  };
  const savePostMutation = useMutation({
    mutationKey: ["savePost"],
    mutationFn: async (postId) => {
      return savePost(postId);
    },
    onSuccess: (data, postId) => {
      (setPostSave((prev) => [...prev, postId]),
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
    onSuccess: (data, postId) => {
      (setPostSave((prev) => prev.filter((id) => id !== postId)),
        setShowSaveCard(null),
        setGlobalMsg("Unsave Post"));
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => fetchPosts(),
  });

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  if (isError) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Alert severity="error">{error.message}</Alert>
      </Box>
    );
  }
  
  return (
    <Box>
      {isLoading || showSkeleton ? (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      ) : (
        data
          .filter((post) => !hidden.includes(post.id))
          .map((post) => {
             const Maxlength=100;
                    const isPostLong=post.content.length >Maxlength;
                 
                    const isExpandPost=expandedPost===post.id;
            const isLike = post.postLikes?.some(
              (like) => like.userId === auth?.id,
            );
            return (
              <Box key={post.id}>
                <Card
                  elevation={4}
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
                  onClick={() => {
                    console.log("postDetail");
                    setAddComment(null);
                    navigate(`/postDetail/${post.id}`);
                  }}
                >
                  <CardHeader
                    avatar={
                      <Box
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/profile/${post.user.id}`);
                        }}
                        sx={{ cursor: "pointer" }}
                      >
                        {post.user.image ? (
                          <Avatar src={post.user.image} />
                        ) : (
                          <Avatar>
                            <ProfileIcon />
                          </Avatar>
                        )}
                      </Box>
                    }
                    title={
                      <Typography
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/profile/${post.user.id}`);
                        }}
                        sx={{
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: {
                            ms:15,
                            xs:12
                          },
                        }}
                      >
                        {post.user.username}
                        {post.emoji &&(
                          <span>
                            {""} is {post.feeling} {post.emoji}
                          </span>
                        )}
                      </Typography>
                    }
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
                          {formatRelative(new Date(post.created), new Date())}
                        </Typography>
                      </Box>
                    }
                    action={
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
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
                              color: mode === "dark" ? "white" : "blue",
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
          })
      )}

      <Backdrop
        open={showSaveCard !== null || showLike !== null}
        onClick={(e) => {
           if (e.target === e.currentTarget) {
      setShowSaveCard(null);
      setShowLike(null);
    }
        }}
        sx={{
          zIndex: 1101,
          bgcolor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        {showSaveCard !== null && (
          <Slide direction="up" in={showSaveCard !== null}>
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                position: "fixed",

                bottom: 0,

                height: 160,

                width: {
                  xs: "100%",
                  sm: 600,
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
                    sm: 550,
                    xs: "90%",
                  },
                  height: 110,
                  mt: 3,
                  bgcolor: "#0F172A",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
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
                        <SaveIcon sx={{ mr: 3, color: "white" }} />
                      )}

                      <Typography
                        sx={{
                          fontFamily: "Arial, sans-serif",
                          fontWeight: "bold",
                          fontSize: 15,
                          color: "white",
                        }}
                      >
                        {postSave.includes(showSaveCard)
                          ? "UnsavePost"
                          : "SavePost"}
                      </Typography>
                    </Button>
                  </Box>
                  <Divider />
                </Box>

                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Button
                      onClick={() => {
                        hidePost(showSaveCard);
                      }}
                      sx={{
                        textTransform: "none",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <NotInterestIcon sx={{ mr: 3, color: "red" }} />
                      <Typography
                        sx={{
                          fontFamily: "Arial, sans-serif",
                          fontWeight: "bold",
                          fontSize: 15,
                          color: "white",
                        }}
                      >
                        Not interested
                      </Typography>
                    </Button>
                  </Box>
                  <Divider />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
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
                    <CopylinkIcon sx={{ mr: 3, color: "white" }} />
                    <Typography
                      sx={{
                        fontFamily: "Arial, sans-serif",
                        fontWeight: "bold",
                        fontSize: 15,
                        color: "white",
                      }}
                    >
                      Copy Link
                    </Typography>
                  </Button>
                </Box>
              </Card>
            </Box>
          </Slide>
        )}
        {showLike !== null && (
          <Slide direction="up" in={showLike !== null}>
            <Box
              onClick={(e) => e.stopPropagation()}
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
                                sm: 40,
                                xs: 35,
                              },
                              height: {
                                sm: 40,
                                xs: 35,
                              },
                            }}
                            src={likeuser.user.image}
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
                            color: "#1976D2",
                            ml: 1,
                            fontWeight: 700,
                            letterSpacing: 0.3,
                            fontSize: {
                              sm: 15,
                              xs: 14,
                            },
                          }}
                        >
                          {likeuser.user?.username}
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
        onClick={(e) => {
           if (e.target === e.currentTarget) {
      setViewImage(null);
    }
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
