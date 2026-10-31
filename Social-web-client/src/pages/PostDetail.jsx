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
  KeyboardArrowDown as ShowReplyIcon,
  KeyboardArrowUp as HideReplyIcon,
  Favorite as CommentLikeIcon,
  ArrowBack as BackArrowIcon
} from "@mui/icons-material";
import { useApp, queryClient } from "../ThemeApp";
import {
  postDetail,
  savePost,
  UnsavePost,
  postLike,
  RemoveLike,
} from "../fetchers/auth";
import { useIsMutating, useMutation, useQuery } from "@tanstack/react-query";
import { formatRelative } from "date-fns";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { postReplies } from "../fetchers/auth";
import { useNavigate } from "react-router-dom";
import { commentLike, RemoveCommentLike, AddComment } from "../fetchers/auth";
export default function PostDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    showSaveCard,
    setShowSaveCard,
    mode,
    hidden,
    setHidden,
    setGlobalMsg,
    postSave,
    setPostSave,
    auth,
    showLike,
    setShowLike,

    expandedComment,
    setExpandedComment,

    showReplyForm,
    setShowReplyForm,
    expandedReply,
    setExpandedReply,
    showReply,
    setShowReply,
    addComment,
    setAddComment,
    setViewImage,
    viewImage
  } = useApp();

  const SubmitReply = useMutation({
    mutationKey: ["replies"],
    mutationFn: async ({ postId, commentId, content }) => {
      return postReplies(postId, commentId, content);
    },
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["postDetail", id],
      });

      (setShowReplyForm(null), setGlobalMsg("Add Replied"));
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const ReplyRef = useRef();
  const CommentRef = useRef();
  const handleViewReply = (commentId) => {
    if (showReply === commentId) {
      setShowReply(null);
    } else {
      setShowReply(commentId);
    }
  };

  const CommentHandleReply = (commentId) => {
    if (showReplyForm === commentId) {
      setShowReplyForm(null);
    } else {
      setShowReplyForm(commentId);
    }

    setTimeout(() => {
      ReplyRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    if (showSaveCard !== null || showLike !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSaveCard, showLike]);

  const PostLike = useMutation({
    mutationKey: ["PostLike"],
    mutationFn: async (postId) => {
      return postLike(postId);
    },
    onSuccess: async (data, postId) => {
      await queryClient.invalidateQueries({
        queryKey: ["postDetail", id],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const AddCommentMutation = useMutation({
    mutationKey: ["AddComment"],
    mutationFn: async ({ postId,content }) => {
      return AddComment( postId,content);
    },
    onSuccess: async (data, postId) => {
      (await queryClient.invalidateQueries({
        queryKey: ["postDetail", id],
      }),
        (CommentRef.current.value = ""));
      setAddComment(null);
      setGlobalMsg("Add Comment");
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
        queryKey: ["postDetail", id],
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
  const commentLikeMutation = useMutation({
    mutationKey: ["commentLike"],
    mutationFn: async (commentId) => {
      return commentLike(commentId);
    },
    onSuccess: async (data, commentId) => {
      await queryClient.invalidateQueries({
        queryKey: ["postDetail", id],
      });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const RemoveCommentLikeMutation = useMutation({
    mutationKey: ["removeCommentLike"],
    mutationFn: async (commentId) => {
      return RemoveCommentLike(commentId);
    },
    onSuccess: async (data, commentId) => {
      await queryClient.invalidateQueries({
        queryKey: ["postDetail", id],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["postDetail", id],
    queryFn: async () => postDetail(id),
  });

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
  const isLike = data.postLikes?.some((like) => like.userId === auth.id);
 console.log(data)
  return (
    <Box>
      <Box onClick={(e)=>{
        e.stopPropagation();
        navigate(-1)
      }}   sx={{
          maxWidth: "100%",
          mx: "auto",
          mb: 2,
          height: "auto",
          width: {
            sm: 900,
            xs: "100%",
          },
          display:"flex",
            alignItems: "center",
    gap: 0.8,
    cursor: "pointer",
    color: "text.secondary",
   
    p: 1,
  
   
        }}>
<BackArrowIcon sx={{  color: "text.primary",}}/>
<Typography>Back</Typography>
      </Box>
      <Card
        sx={{
          maxWidth: "100%",
          mx: "auto",
          mb: 2,
          height: "auto",
          width: {
            sm: 900,
            xs: "100%",
          },
        }}
      >
        <CardHeader
          avatar={
            <Box
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${data?.user.id}`);
              }}
              sx={{ cursor: "pointer" }}
            >
              {data?.user?.image ? (
                <Avatar src={data?.user.image} />
             
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
                navigate(`/profile/${data?.user.id}`);
              }}
              sx={{
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: 15,
              }}
            >
              {data.user.username}
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
              <TimeIcon sx={{ fontSize: 14, mt: 0.2, color: "blue" }} />
              <Typography variant="caption" sx={{ fontSize: 10 }}>
                {formatRelative(new Date(data.created), new Date())}
              </Typography>
            </Box>
          }
          action={
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setShowSaveCard(data.id);
                
              }}
            >
              <ShowSaveIcon />
            </IconButton>
          }
        />

        {data?.images?.length>0 ? (
          <>
            <CardContent>
              <Typography variant="caption">{data.content}</Typography>
            </CardContent>
        
            <Grid container>
              {data.images.slice(0, 4).map((image, index) => {
                return (
                  <Grid
                    key={image.id}
                    size={data.images.length === 3 ? (index === 2 ? 12 : 6) : 6}
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
                          sm:
                            data.images.length === 3
                              ? index === 2
                                ? 190
                                : 190
                              : 280,
                          xs:
                            data.images.length === 3
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
                );
              })}
            </Grid>
          </>
        ) : (
          <CardContent>
            <Typography variant="caption">{data.content}</Typography>
          </CardContent>
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
                  PostRemoveLike.mutate(data.id);
                } else {
                  PostLike.mutate(data.id);
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
            {data.postLikes?.length > 0 && (
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
                {data.postLikes?.length}
              </Typography>
            )}
            <IconButton>
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
              {data.comments?.length}
            </Typography>
          </Box>
          {data.postLikes?.length > 0 && (
            <Box sx={{ display: "flex", marginLeft: "auto" }}>
              <IconButton
                onClick={() => {
                  setShowLike(data);
                }}
              >
                <LikeIcon
                  sx={{
                    color: mode === "dark" ? "white" : "blue",
                    fontSize: {
                      xs: 17,
                      sm: 19,
                    },
                    border:
                      mode === "dark" ? "2px solid blue" : "2px solid blue",
                    borderRadius: "100%",
                  }}
                />
              </IconButton>
            </Box>
          )}
        </CardActions>
        <Divider />
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
              {" "}
              {data.comments?.length}
            </Typography>

            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 15,
                ml: 1,
                mt: 0.1,
              }}
            >
              {data.comments?.length > 1 ? "Comments" : "Comment"}
            </Typography>
          </Box>
          <Box>
            {data.comments?.map((comment) => {
             

              const MaxLength = 100;

              const isCommentLong = comment.content.length > MaxLength;
              const isExpandedComment = expandedComment === comment.id;
              const isReply = showReplyForm === comment.id;
              const isViewReply = showReply === comment.id;
              const isCommentLike = comment.commentLikes?.some(
                (like) => like.userId === auth.id,
              );
              return (
                <Box key={comment.id}>
                  <Box sx={{ display: "flex" }}>
                    {comment.user?.image ? (
                      <Avatar src={comment.user.image} sx={{ mt: 3, mb: 2 }} />
                    ) : (
                      <Avatar sx={{ mt: 3, mb: 2 }}>
                        <ProfileIcon />
                      </Avatar>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        mt: 3,
                        ml: 1,
                      }}
                    >
                      <Typography variant="caption" sx={{ fontSize: "bold" }}>
                        {comment.user?.username}
                      </Typography>
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 0.5,
                            p: 1.5,
                            bgcolor: "grey.100",
                            borderRadius: 2,
                            color: "black",
                            lineHeight: 1.6,
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {isExpandedComment || !isCommentLong ? (
                            comment.content
                          ) : (
                            <>
                              {comment.content.slice(0, MaxLength)}
                              ...
                              <Button
                                onClick={() => {
                                  setExpandedComment(comment.id);
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "blue",
                                    p: 0,
                                    minWidth: 0,
                                    textTransform: "none",
                                    fontSize: 13,
                                  }}
                                >
                                  See more
                                </Typography>
                              </Button>
                            </>
                          )}
                        </Typography>

                        <IconButton
                          onClick={() => {
                            if (isCommentLike) {
                              RemoveCommentLikeMutation.mutate(comment.id);
                            } else {
                              commentLikeMutation.mutate(comment.id);
                            }
                          }}
                          disableRipple
                          sx={{
                            "&:hover": {
                              bgcolor: "transparent",
                              border: "none",
                            },
                          }}
                        >
                          <CommentLikeIcon
                            sx={{
                              color: isCommentLike ? "blue" : "gray",
                              fontSize: 20,
                              mr: 2,
                            }}
                          />
                          <Typography
                            sx={{
                              color: "blue",
                            }}
                          >
                            {comment.commentLikes?.length}
                          </Typography>
                        </IconButton>
                      </Box>

                      <Box sx={{ ml: 1 }}>
                        <IconButton
                          onClick={() => {
                            CommentHandleReply(comment.id);
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "0.7rem",
                              color: "grey.600",
                            }}
                          >
                            Reply
                          </Typography>
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                  {comment.Replies?.length ? (
                    <Button
                      disableRipple
                      onClick={() => {
                        handleViewReply(comment.id);
                      }}
                      sx={{
                        textTransform: "none",
                        ml: 5,
                        p: 0,
                        minWidth: 0,
                        "&:focus": {
                          outline: "none",
                        },
                        "&:hover": {
                          bgcolor: "transparent",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 13,
                          color: "blue",
                        }}
                      >
                        {isViewReply
                          ? `Hide ${comment.Replies.length} replies`
                          : `View ${comment.Replies.length} replies`}
                      </Typography>
                    </Button>
                  ) : null}

                  <Box>
                    {isReply && (
                      <TextField
                        inputRef={ReplyRef}
                        defaultValue={`${comment.user?.username}:`}
                        placeholder="Write Reply"
                        sx={{
                          width: {
                            xs: "100%",
                            sm: 400,
                          },
                          ml: {
                            xs: 0,
                            sm: 5,
                          },
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            SubmitReply.mutate({
                              postId: id,
                              commentId: comment.id,
                              content: ReplyRef.current.value,
                            });
                          }
                        }}
                      />
                    )}
                  </Box>

                  {isViewReply && (
                    <Box sx={{ ml: 7 }}>
                      {comment?.Replies?.map((reply) => {
                        const MaxLength = 30;
                        const isReplyLong = reply.content.length > MaxLength;
                        const isExpandedReply = expandedReply === reply.id;
                        return (
                          <Box
                            key={reply.id}
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              mt: 1.5,
                            }}
                          >
                            {reply.user?.image ? (
                              <Avatar
                                src={reply.user.image}
                                sx={{ mt: 3, mb: 2 }}
                              />
                            ) : (
                              <Avatar sx={{ mt: 3, mb: 2 }}>
                                <ProfileIcon />
                              </Avatar>
                            )}
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                mt: 3,
                                ml: 1,
                              }}
                            >
                              <Typography
                                variant="caption"
                                sx={{ fontSize: "bold" }}
                              >
                                {reply.user?.username}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  mt: 0.5,
                                  p: 1.5,
                                  bgcolor: "grey.100",
                                  borderRadius: 2,
                                  color: "black",
                                  lineHeight: 1.6,
                                  whiteSpace: "pre-wrap",
                                  wordBreak: "break-word",
                                }}
                              >
                                {isExpandedReply || !isReplyLong ? (
                                  reply.content
                                ) : (
                                  <>
                                    {reply.content.slice(0, MaxLength)}
                                    ...
                                    <Button
                                      onClick={() => {
                                        setExpandedReply(reply.id);
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          color: "blue",
                                          p: 0,
                                          minWidth: 0,
                                          textTransform: "none",
                                          fontSize: 13,
                                        }}
                                      >
                                        See more
                                      </Typography>
                                    </Button>
                                  </>
                                )}
                              </Typography>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  )}
                  <Box></Box>
                </Box>
              );
            })}
          </Box>
        </CardContent>
        {addComment !== null && (
          <Box
            sx={{
              zIndex: 1300,
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              mx: "auto",

              width: {
                xs: "100%",
                sm: 600,
              },
              height: 80,
              bgcolor: mode === "dark" ? "white" : "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Slide direction="up" in={addComment !== null}>
              <Box sx={{display:"flex",alignItems:"center",borderTopLeftRadius:10}}>
                <input ref={CommentRef}   style={{
                          padding: "15px",
                          margin: "3px",
                          width: "calc(100% - 26px)",
                          boxSizing: "border-box",
                          borderRadius: "6px",

                          border: "1px solid grey",
                          marginLeft: "10px",
                        }} placeholder="Write a Comment"   onKeyDown={(e) => {
                  
                  }}/>
               
                        <Button
                          onClick={(e) => {
                           
                            AddCommentMutation.mutate({
                        postId: id,
                        content: CommentRef.current.value,
                      })
                          }}
                        
                          variant="contained"
                          sx={{
                          
                            bgcolor: "#1976d2",
                            borderRadius: "6px",
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                              bgcolor: "#1565c0",
                            },
                            p:1.5
                          }}
                        >
                          Send
                        </Button>
                     
              </Box>
            </Slide>
          </Box>
        )}
      </Card>

      <Backdrop
        open={showSaveCard !== null || showLike !== null}
        onClick={(e) => {
           if (e.target === e.currentTarget) {
      setShowSaveCard(null);
      setShowLike(null);
    }
        }}
        sx={{
          zIndex: 1400,
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
                      mt: 3,
                    }}
                  />
                </Box>

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
                                sm: 45,
                                xs: 35,
                              },
                              height: {
                                sm: 45,
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
                              sm: 16,
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
