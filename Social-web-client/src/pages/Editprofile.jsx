import {
  Card,
  Avatar,
  Typography,
  Backdrop,
  Box,
  IconButton,
  Slide,
  CircularProgress,
  Paper,
  Button,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Collapse,
  TextField,
  Grid,
} from "@mui/material";
import { useApp, queryClient } from "../ThemeApp";
import { useNavigate } from "react-router-dom";
import { ViewEditProfile, ChangBgColor, EditUsername,EditPassword,EditCountry,EditCity,EditBio,EditCompany,EditJobtitle ,EditProfileImage} from "../fetchers/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import {
  AccountCircle as ProfileIcon,
  Edit as EditIcon,
  CameraAltRounded as EditAvatarIcon,
  Person as UsernameIcon,
  ExpandLess as ExpandIcon,
  Place as CountryIcon,
  Home as HomeIcon,
  Cake as BirthdayIcon,
  Diversity1 as RelationShipIcon,
  Wc as GenderIcon,
  Business as WorkIcon,
  Work as JobIcon,
  Info as BioIcon,
  Key as PasswordIcon,
  VerifiedUser as AccountDetailIcon,
  VisibilityOff as ViewOffIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
export default function EditProfile() {
  const navigate = useNavigate();
const inputRef=useRef();
  const {
    auth,
    mode,
    tabValue,
    setTabValue,
    accountDetailOpen,
    setAccountDetailOpen,
    personDetailOpen,
    setPersonDetailOpen,
    gender,
    setGender,
    workexperience,
    setWorkExperience,
    editField,
    setEditField,
    showPassword,
    setShowPassword,
    birthday,
    setBirthday,
    selectBgColor,
    setSelectBgColor,
    setGlobalMsg,
    changeUsername,
    setChangeUsername,
    changePassword,
    setChangePassword,
    changeCountry,
    setChangeCountry,
    changeCity,
    setChangeCity,
    changeBio,
    setChangeBio,
    setAuth,
    changeCompany,
    setChangeCompany,
    changeJobTitle,
    setChangeJobTitle,
    selectProfileImage,
    setSelectProfileImage
  } = useApp();
  const handleChangeImgae=(e)=>{
    const file=e.target.files?.[0];
    if(!file) return;
    setSelectProfileImage(file)
  
     PrfileImageMutation.mutate(file)
       e.target.value = "";
  }
  const ChangeBg = useMutation({
    mutationKey: ["BgColor"],
    mutationFn: async (bgColor) => {
      return ChangBgColor(bgColor);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["editProfile",auth?.id],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const ChangeName = useMutation({
    mutationKey: ["Username"],
    mutationFn: async (username) => {
      return EditUsername(username);
    },
    onSuccess: async () => {
      (await queryClient.invalidateQueries({
        queryKey: ["editProfile",auth?.id],
      }),
        setChangeUsername(""));
      setEditField(null);
      setGlobalMsg("Username updated successfully")
    },
    onError: (error) => {
      console.log(error);
       
    },
  });
  const PrfileImageMutation=useMutation({
    mutationKey:["profileImage"],
    mutationFn:async(file)=>{
      const formData=new FormData();
      formData.append("image",file)
      return EditProfileImage(formData)
    },
    onSuccess:async(data)=>{
    
          const imageUrl = data?.image;

    if (!imageUrl) {
      console.error("Image URL is missing from the backend response!");
      return;
    }
       setAuth((prev)=>({
          ...prev,
          image:data.image
        }))
          await queryClient.invalidateQueries({
        queryKey:["editProfile",auth?.id],
       
      }),
        setGlobalMsg("Profile image updated successfully");
          console.log("Backend response:", data);
  console.log("Selected image:", selectProfileImage);
    },
    onError:(error)=>{
      console.log(error)
    }
  })
  const NewPassword=useMutation({
    mutationKey:["Password"],
    mutationFn:async(newPassword)=>{
      return EditPassword(newPassword)
    },
    onSuccess:async()=>{
      await queryClient.invalidateQueries({queryKey:["editProfile",auth?.id]})
setChangePassword("");
setEditField(null);
setGlobalMsg("Password changed successfully")
    },
    onError:(error)=>{
      console.log(error)
      setGlobalMsg(error.message || "Failed to change password");
    }
  })
  const NewCountry=useMutation({
    mutationKey:["country"],
    mutationFn:async(newcountry)=>{
      return EditCountry(newcountry)
    },
    onSuccess:async()=>{
      await queryClient.invalidateQueries({
        queryKey:["editProfile",auth?.id]
      })
      setChangeCountry("");
      setEditField(null);
      setGlobalMsg("Country updated successfull")
    }
  })
   const NewCity=useMutation({
    mutationKey:["city"],
    mutationFn:async(newcity)=>{
      return EditCity(newcity)
    },
    onSuccess:async()=>{
      await queryClient.invalidateQueries({
        queryKey:["editProfile",auth?.id]
      })
      setChangeCity("");
      setEditField(null);
      setGlobalMsg("Country updated successfull")
    }
  })
   const NewBio=useMutation({
    mutationKey:["bio"],
    mutationFn:async(newbio)=>{
      return EditBio(newbio)
    },
    onSuccess:async()=>{
      await queryClient.invalidateQueries({
        queryKey:["editProfile",auth?.id]
      })
      setChangeBio("");
      setEditField(null);
      setGlobalMsg("Bio updated successfull")
      setAuth((prev)=>({
        ...prev,
        bio:changeBio
      }))
    }
  })
  const NewCompany=useMutation({
    mutationKey:["company"],
    mutationFn:async(newcompany)=>{
      return EditCompany(newcompany)
    },
    onSuccess:async()=>{
      await queryClient.invalidateQueries({
        queryKey:["editProfile",auth?.id]
      })
      setChangeCompany("");
      setEditField(null);
      setGlobalMsg("Company updated successfull")
    }
  })
    const NewJobTitle=useMutation({
    mutationKey:["jobtitle"],
    mutationFn:async(newjobtitle)=>{
      return EditJobtitle(newjobtitle)
    },
    onSuccess:async()=>{
      await queryClient.invalidateQueries({
        queryKey:["editProfile",auth?.id]
      })
      setChangeJobTitle("");
      setEditField(null);
      setGlobalMsg("JobTilte updated successfull")
    }
  })
  const colors = [
    { id: 1, name: "Pink", color: "#F48FB1" },
    { id: 2, name: "Green", color: "#4CAF50" },
    { id: 3, name: "Red", color: "#F44336" },
    { id: 4, name: "Orange", color: "#FF9800" },
    { id: 5, name: "Purple", color: "#9C27B0" },
    { id: 6, name: "Teal", color: "#009688" },
  ];
  const { data, isLoading, isError,error } = useQuery({
    queryKey: ["editProfile", auth?.id],
    queryFn: async () => ViewEditProfile(auth.id),
    enabled: !!auth?.id,
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

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 750 },
        maxWidth: "100%",
        mx: "auto",
        px: { xs: 0, sm: 2 },

        pb: 4,
        boxSizing: "border-box",

        flex: 1,
        height: "auto",
        overflow: "auto",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          height: { xs: 180, sm: 230 },
          borderTopLeftRadius:10,
          borderTopRightRadius:10,
          borderBottomLeftRadius:0,
          borderBottomRightRadius:0,

          background: data?.profileBgColor ? data?.profileBgColor : "blue",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            right: 5,
            bottom: 5,
            bgcolor: "white",
            borderRadius: "rounded",
            width: 30,
            height: 30,
          }}
        >
          <EditIcon
            onClick={(e) => {
              e.stopPropagation();
              setEditField("background");
            }}
            sx={{ color: "black", fontSize: 20 }}
          />
        </IconButton>
      </Paper>
      <Card
        sx={{
          position: "relative",
          height: "auto",
          mt: 0,
          overflow: "visible",

          border: "1px solid",
          borderColor: "divider",
          boxShadow:
            mode === "dark"
              ? "0 8px 28px rgba(0,0,0,0.25)"
              : "0 8px 28px rgba(15,23,42,0.06)",
          bgcolor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: 10,
          }}
        >
          {data?.image ? (
            <Avatar
              sx={{
                width: {
                  sm: 170,
                  xs: 120,
                },
                height: {
                  sm: 170,
                  xs: 120,
                },
                fontSize: 40,
                border: "1px solid grey",
                position: "absolute",
                top: {
                  sm:-90,
                  xs:-70
                },
              }}
              src={data.image}
            />
          ) : (
            <Avatar
              sx={{
                width: {
                  sm: 150,
                  xs: 130,
                },
                height: {
                  sm: 150,
                  xs: 130,
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
             <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleChangeImgae} />
          <IconButton onClick={()=>inputRef.current.click()}
            sx={{
              position: "absolute",
              bottom: {
                sm: -60,
                xs: -45,
              },
              right: {
                sm: -80,
                xs: -70,
              },
              zIndex: 2,
              bgcolor: mode === "dark" ? "white" : "black",
              width: 30,
              height: 30,
            }}
          >
            <EditAvatarIcon
              sx={{ color: mode === "dark" ? "black" : "white" }}
            />
          </IconButton>
       
        </Box>

        <Box
          sx={{
            borderRadius: "0 0 12px 12px",
            px: { xs: 1.5, sm: 2.5 },
            pb: 3,
          }}
        >
          <Box sx={{ pt: 13, mt: 2 }}>
            <Box
              sx={{
                border: "1px solid gray",
                p: 2,
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  minHeight: 56,
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <AccountDetailIcon
                    sx={{ color: "green", fontSize: 25, flexShrink: 0 }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{
                        color: "black",
                        fontWeight: 600,
                        fontSize: {
                          sm: 16,
                          xs: 14,
                        },
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      Account details
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: "#555555",
                        fontWeight: 600,
                        display: accountDetailOpen ? "none" : "block",
                      }}
                    >
                      Username and password
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setAccountDetailOpen(!accountDetailOpen);
                  }}
                >
                  <ExpandIcon
                    sx={{ color: "black", fontSize: 30, cursor: "pointer",  transform: accountDetailOpen ? "rotate(180deg)" : "rotate(0deg)", }}
                  />
                </IconButton>
              </Box>
              <Collapse in={accountDetailOpen} timeout={300} unmountOnExit>
                <Box sx={{ pt: 1 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <UsernameIcon
                        sx={{
                          color: "gray",
                          fontSize: 22,
                          ml: 1,
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            color: "black",
                            fontWeight: 600,
                            fontSize: {
                              xs: 14,
                            },
                          }}
                        >
                          Username
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "#555555", fontWeight: 600 }}
                        >
                          {data?.username || auth?.username || ""}
                        </Typography>
                      </Box>
                    </Box>
                    <EditIcon
                      onClick={(e) => {
                        e.stopPropagation();
                         setChangeUsername("");
                        setEditField("username");
                      }}
                      sx={{
                        color: "black",
                        mr: 2,
                        cursor: "pointer",
                        fontSize: {
                          sm: 21,
                          xs: 18,
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <PasswordIcon
                        sx={{
                          color: "gray",
                          fontSize: 22,
                          ml: 1,
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            color: "black",
                            fontWeight: 600,
                            fontSize: {
                              xs: 14,
                            },
                          }}
                        >
                          New Password
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "#555555", fontWeight: 600 }}
                        >
                          Change Password
                        </Typography>
                      </Box>
                    </Box>
                    <EditIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditField("password");
                      }}
                      sx={{
                        color: "black",
                        mr: 2,
                        cursor: "pointer",
                        fontSize: {
                          sm: 21,
                          xs: 18,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Collapse>
            </Box>

            <Box
              sx={{
                border: "1px solid gray",
                p: 2,
                borderRadius: 2,
                mt: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <UsernameIcon
                    sx={{ color: "blue", fontSize: 25, flexShrink: 0,mb:1 }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{
                        color: "black",
                        fontWeight: 600,
                        fontSize: {
                          sm: 16,
                          xs: 14,
                        },
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      Personal details
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: "#555555",
                        fontWeight: 600,
                        display: personDetailOpen ? "none" : "block",
                      }}
                    >
                      Bio,birthday and location
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setPersonDetailOpen(!personDetailOpen);
                  }}
                >
                  <ExpandIcon
                    sx={{ color: "black", fontSize: 30, cursor: "pointer" ,  transform: personDetailOpen ? "rotate(180deg)" : "rotate(0deg)",}}
                  />
                </IconButton>
              </Box>
              <Collapse in={personDetailOpen} timeout={300} unmountOnExit>
                <Box sx={{ pt: 1 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <CountryIcon
                        sx={{
                          color: "gray",
                          fontSize: 22,
                          ml: 1,
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            color: "black",
                            fontWeight: 600,
                            fontSize: {
                              xs: 14,
                            },
                          }}
                        >
                          Country
                        </Typography>
                        {data?.country || auth?.country ? (
                          <Typography
                            variant="caption"
                            sx={{ color: "#555555", fontWeight: 600 }}
                          >
                            {data?.country || auth?.country || ""}
                          </Typography>
                        ) : (
                          <Typography
                            variant="caption"
                            sx={{ color: "#555555", fontWeight: 600 }}
                          >
                            Add Location
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <EditIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditField("country");
                      }}
                      sx={{
                        color: "black",
                        mr: 2,
                        cursor: "pointer",
                        fontSize: {
                          sm: 21,
                          xs: 18,
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <HomeIcon
                        sx={{
                          color: "gray",
                          fontSize: 22,
                          ml: 1,
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            color: "black",
                            fontWeight: 600,
                            fontSize: {
                              xs: 14,
                            },
                          }}
                        >
                          City
                        </Typography>
                    
                         {data?.city || auth?.city ? (
                          <Typography
                            variant="caption"
                            sx={{ color: "#555555", fontWeight: 600 }}
                          >
                            {data?.city || auth?.city || ""}
                          </Typography>
                        ) : (
                          <Typography
                            variant="caption"
                            sx={{ color: "#555555", fontWeight: 600 }}
                          >
                            Add Location
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <EditIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditField("city");
                      }}
                      sx={{
                        color: "black",
                        mr: 2,
                        cursor: "pointer",
                        fontSize: {
                          sm: 21,
                          xs: 18,
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <BioIcon
                        sx={{
                          color: "gray",
                          fontSize: 22,
                          ml: 1,
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            color: "black",
                            fontWeight: 600,
                            fontSize: {
                              xs: 14,
                            },
                          }}
                        >
                          Bio
                        </Typography>
                        {data?.bio|| auth?.bio ? (
                          <Typography
                            variant="caption"
                            sx={{ color: "#555555", fontWeight: 600 }}
                          >
                            {data?.bio || auth?.bio || ""}
                          </Typography>
                        ) : (
                          <Typography
                            variant="caption"
                            sx={{ color: "#555555", fontWeight: 600 }}
                          >
                            Add Bio
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <EditIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditField("bio");
                      }}
                      sx={{
                        color: "black",
                        mr: 2,
                        cursor: "pointer",
                        fontSize: {
                          sm: 21,
                          xs: 18,
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <BirthdayIcon
                        sx={{
                          color: "gray",
                          fontSize: 22,
                          ml: 1,
                        }}
                      />
                      <Box>
                        {data?.birthday || auth?.birthday? (
                          <Typography
                            sx={{ color: "#555555", fontWeight: 500,fontSize:14,mt:0.5 }}
                          >
                            {data?.birthday || auth?.birthday ?new Date(data?.birthday|| auth?.birthday).toLocaleDateString():""}
                          </Typography>
                        ) : (
                          <Typography
                            variant="caption"
                            sx={{ color: "#555555", fontWeight: 600 }}
                          >
                            Add Birthday
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <EditIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditField("birthday");
                        navigate(`/relationandGenderBirthday`);
                        
                      }}
                      sx={{
                        color: "black",
                        mr: 2,
                        cursor: "pointer",
                        fontSize: {
                          sm: 21,
                          xs: 18,
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <RelationShipIcon
                        sx={{
                          color: "gray",
                          fontSize: 22,
                          ml: 1,
                        }}
                      />
                      <Box
                        sx={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/relationandGenderBirthday`);
                          setEditField("relation");
                        }}
                      >
                        {data?.relationship||auth?.relationship ? (
                          <Typography
                            sx={{ color: "#555555", fontWeight: 500,fontSize:14,textTransform:"capitalize" }}
                          >
                            {data?.relationship || auth?.relationship || ""}
                          </Typography>
                        ) : (
                          <Typography
                            variant="caption"
                            sx={{ color: "#555555", fontWeight: 600 }}
                          >
                            Relationship status
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <GenderIcon
                        sx={{
                          color: "gray",
                          fontSize: 22,
                          ml: 1,
                        }}
                      />
                      <Box
                        sx={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/relationandGenderBirthday`);
                          setEditField("gender");
                        }}
                      >
                        {data?.gender||auth?.gender ? (
                          <Typography
                            sx={{ color: "#555555", fontWeight: 500,textTransform:"capitalize" }}
                          >
                            {data?.gender || auth?.gender || ""}
                          </Typography>
                        ) : (
                          <Typography
                            variant="caption"
                            sx={{ color: "#555555", fontWeight: 600 }}
                          >
                            Gender
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Collapse>
            </Box>
            <Box
              sx={{
                border: "1px solid gray",
                p: 2,
                borderRadius: 2,
                mt: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <JobIcon
                    sx={{ color: "#7E57C2", fontSize: 25, flexShrink: 0 }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{
                        color: "black",
                        fontWeight: 600,
                        fontSize: {
                          sm: 16,
                          xs: 14,
                        },
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      Work Experience
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: "#555555",
                        fontWeight: 600,
                        display: workexperience ? "none" : "block",
                      }}
                    >
                      Company and jobtitle
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setWorkExperience((prev) => !prev);
                  }}
                >
                  <ExpandIcon
                    sx={{ color: "black", fontSize: 30, cursor: "pointer",  transform:workexperience  ? "rotate(180deg)" : "rotate(0deg)", }}
                  />
                </IconButton>
              </Box>
              <Collapse in={workexperience} timeout={300} unmountOnExit>
                <Box sx={{ pt: 1 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <WorkIcon
                        sx={{
                          color: "gray",
                          fontSize: 22,
                          ml: 1,
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            color: "black",
                            fontWeight: 600,
                            fontSize: {
                              xs: 14,
                            },
                          }}
                        >
                          Company
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "#555555", fontWeight: 600 }}
                        >
                          {data?.company || auth?.company || ""}
                        </Typography>
                      </Box>
                    </Box>
                    <EditIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditField("company");
                      }}
                      sx={{
                        color: "black",
                        mr: 2,
                        cursor: "pointer",
                        fontSize: {
                          sm: 21,
                          xs: 18,
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <JobIcon
                        sx={{
                          color: "gray",
                          fontSize: 22,
                          ml: 1,
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            color: "black",
                            fontWeight: 600,
                            fontSize: {
                              xs: 14,
                            },
                          }}
                        >
                          Job Title
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "#555555", fontWeight: 600 }}
                        >
                          {data?.jobtitle || auth?.jobtitle || ""}
                        </Typography>
                      </Box>
                    </Box>
                    <EditIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditField("jobtitle");
                      }}
                      sx={{
                        color: "black",
                        mr: 2,
                        cursor: "pointer",
                        fontSize: {
                          sm: 21,
                          xs: 18,
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Collapse>
            </Box>
          </Box>
        </Box>
      </Card>
      <Backdrop
        open={editField !== null}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setEditField(null);
            e.stopPropagation();
          }
        }}
        sx={{
          zIndex: 14,
          bgcolor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        {editField !== null && (
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              zIndex: 13,
              pointerEvents: "auto",
            }}
          >
            <Slide direction="up" in={editField !== null}>
              <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                  position: "fixed",

                  bottom: 0,

                  height: {
                    sm: 280,
                    xs: 200,
                  },

                  width: "100%",
                  maxWidth: 600,
                  bgcolor: "#E5E7EB",

                  display: "flex",
                  justifyContent: "center",
                  mx: "auto",

                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  boxShadow: "0 -8px 30px rgba(0,0,0,0.18)",
                }}
              >
                <Card
                  sx={{
                    width: {
                      sm: "100%",
                      xs: "100%",
                    },
                    height: {
                      sm: 280,
                      xs: "auto",
                    },
                    borderRadius: 3,
                    bgcolor: "#FFFFFF",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  {editField === "username" && (
                    <Box
                      sx={{
                        userSelect: "none",
                        cursor: "pointer",
                        mt: {
                          sm: 4,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 14,
                          p: 1.5,
                          fontFamily: '"Inter", sans-serif',
                          ml: 1,
                        }}
                      >
                        Edit Username
                      </Typography>
                      <input
                        value={changeUsername?? ""}
                        onChange={(e) => setChangeUsername(e.target.value)}
                        type="text"
                        style={{
                          padding: "15px",
                          margin: "3px",
                          width: "calc(100% - 26px)",
                          boxSizing: "border-box",
                          borderRadius: "6px",

                          border: "1px solid grey",
                          marginLeft: "10px",
                        }}
                        placeholder="Username"
                      />
                      <Box sx={{ mx: "10px" }}>
                        <Button
                          onClick={(e) => {
                            if (!changeUsername.trim()) return;
                            ChangeName.mutate(changeUsername.trim())
                          }}
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: {
                              sm: 3,
                              xs: 1.5,
                            },
                            py: 1.2,
                            bgcolor: "#1976d2",
                            borderRadius: "6px",
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                              bgcolor: "#1565c0",
                            },
                          }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Box>
                  )}
                  {editField === "password" && (
                    <Box
                      sx={{
                        userSelect: "none",
                        cursor: "pointer",
                        mt: {
                          sm: 4,
                        },
                        width: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 14,
                          p: 1.5,
                          fontFamily: '"Inter", sans-serif',
                          ml: 1,
                        }}
                      >
                        New Password
                      </Typography>
                      <Box sx={{ position: "relative", mx: 1.25, mt: 1 }}>
                        <input
                          type={showPassword ? "text" : "password"}
                          style={{
                            padding: "15px",
                            margin: "3px",
                            width: "calc(100% - 26px)",
                            boxSizing: "border-box",
                            borderRadius: "6px",

                            border: "1px solid grey",
                            marginLeft: "10px",
                          }}
                          placeholder="New Password"
                          value={changePassword ??""} onChange={(e)=>{
                            setChangePassword(e.target.value)
                          }}
                        />
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowPassword((prev) => !prev);
                          }}
                          sx={{
                            position: "absolute",
                            right: 20,
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "grey",
                          }}
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </IconButton>
                      </Box>
                      <Box sx={{ mx: "10px" }}>
                        <Button
                          onClick={(e) => {
                          NewPassword.mutate(changePassword)
                          }}
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: {
                              sm: 3,
                              xs: 1.5,
                            },

                            bgcolor: "#1976d2",
                            borderRadius: "6px",
                            textTransform: "none",

                            fontWeight: 600,
                            "&:hover": {
                              bgcolor: "#1565c0",
                            },
                          }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Box>
                  )}
                  {editField === "country" && (
                    <Box
                      sx={{
                        userSelect: "none",
                        cursor: "pointer",
                        mt: {
                          sm: 4,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 14,
                          p: 1.5,
                          fontFamily: '"Inter", sans-serif',
                          ml: 1,
                        }}
                      >
                        Edit Country
                      </Typography>
                      <input
                        type="text"
                        style={{
                          padding: "15px",
                          margin: "3px",
                          width: "calc(100% - 26px)",
                          boxSizing: "border-box",
                          borderRadius: "6px",

                          border: "1px solid grey",
                          marginLeft: "10px",
                        }}
                        value={changeCountry ?? ""}
                        onChange={(e)=>{
                          setChangeCountry(e.target.value)
                        }}
                        placeholder="Country name"
                      />
                      <Box sx={{ mx: "10px" }}>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            NewCountry.mutate(changeCountry)
                          }}
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: {
                              sm: 3,
                              xs: 1.5,
                            },
                            py: 1.2,
                            bgcolor: "#1976d2",
                            borderRadius: "6px",
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                              bgcolor: "#1565c0",
                            },
                          }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Box>
                  )}
                  {editField === "city" && (
                    <Box
                      sx={{
                        userSelect: "none",
                        cursor: "pointer",
                        mt: {
                          sm: 4,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 14,
                          p: 1.5,
                          fontFamily: '"Inter", sans-serif',
                          ml: 1,
                        }}
                      >
                        Edit City
                      </Typography>
                      <input
                        type="text"
                        value={changeCity?? ""}
                        onChange={(e)=>setChangeCity(e.target.value)}
                        style={{
                          padding: "15px",
                          margin: "3px",
                          width: "calc(100% - 26px)",
                          boxSizing: "border-box",
                          borderRadius: "6px",

                          border: "1px solid grey",
                          marginLeft: "10px",
                        }}
                        placeholder="City name"
                      />
                      <Box sx={{ mx: "10px" }}>
                        <Button
                          onClick={(e) => {
                           e.stopPropagation();
                           NewCity.mutate(changeCity)
                          }}
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: {
                              sm: 3,
                              xs: 1.5,
                            },
                            py: 1.2,
                            bgcolor: "#1976d2",
                            borderRadius: "6px",
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                              bgcolor: "#1565c0",
                            },
                          }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Box>
                  )}
                  {editField === "bio" && (
                    <Box
                      sx={{
                        userSelect: "none",
                        cursor: "pointer",
                        mt: {
                          sm: 4,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 14,
                          p: 1.5,
                          fontFamily: '"Inter", sans-serif',
                          ml: 1,
                        }}
                      >
                        Edit Bio
                      </Typography>
                      <input
                        type="text"
                        value={changeBio??""}
                        onChange={(e)=>setChangeBio(e.target.value)}
                        style={{
                          padding: "15px",
                          margin: "3px",
                          width: "calc(100% - 26px)",
                          boxSizing: "border-box",
                          borderRadius: "6px",

                          border: "1px solid grey",
                          marginLeft: "10px",
                        }}
                        placeholder="Add bio"
                      />
                      <Box sx={{ mx: "10px" }}>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                           NewBio.mutate(changeBio)
                          }}
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: {
                              sm: 3,
                              xs: 1.5,
                            },
                            py: 1.2,
                            bgcolor: "#1976d2",
                            borderRadius: "6px",
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                              bgcolor: "#1565c0",
                            },
                          }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Box>
                  )}
                  {editField === "company" && (
                    <Box
                      sx={{
                        userSelect: "none",
                        cursor: "pointer",
                        mt: {
                          sm: 4,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 14,
                          p: 1.5,
                          fontFamily: '"Inter", sans-serif',
                          ml: 1,
                        }}
                      >
                        Edit Company Name
                      </Typography>
                      <input value={changeCompany??""} onChange={(e)=>setChangeCompany(e.target.value)}
                        type="text"
                        style={{
                          padding: "15px",
                          margin: "3px",
                          width: "calc(100% - 26px)",
                          boxSizing: "border-box",
                          borderRadius: "6px",

                          border: "1px solid grey",
                          marginLeft: "10px",
                        }}
                        placeholder="Add Company"
                      />
                      <Box sx={{ mx: "10px" }}>
                        <Button
                          onClick={(e) => {
                           e.stopPropagation();
                           NewCompany.mutate(changeCompany)
                          }}
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: {
                              sm: 3,
                              xs: 1.5,
                            },
                            py: 1.2,
                            bgcolor: "#1976d2",
                            borderRadius: "6px",
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                              bgcolor: "#1565c0",
                            },
                          }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Box>
                  )}
                  {editField === "jobtitle" && (
                    <Box
                      sx={{
                        userSelect: "none",
                        cursor: "pointer",
                        mt: {
                          sm: 4,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 14,
                          p: 1.5,
                          fontFamily: '"Inter", sans-serif',
                          ml: 1,
                        }}
                      >
                        Edit Jobtitle
                      </Typography>
                      <input value={changeJobTitle??""}
                      onChange={(e)=>setChangeJobTitle(e.target.value)}
                        type="text"
                        style={{
                          padding: "15px",
                          margin: "3px",
                          width: "calc(100% - 26px)",
                          boxSizing: "border-box",
                          borderRadius: "6px",

                          border: "1px solid grey",
                          marginLeft: "10px",
                        }}
                        placeholder="Add Jobtitle"
                      />
                      <Box sx={{ mx: "10px" }}>
                        <Button
                          onClick={(e) => {
                           e.stopPropagation();
                           NewJobTitle.mutate(changeJobTitle)
                          }}
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: {
                              sm: 3,
                              xs: 1.5,
                            },
                            py: 1.2,
                            bgcolor: "#1976d2",
                            borderRadius: "6px",
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                              bgcolor: "#1565c0",
                            },
                          }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Box>
                  )}

                  {editField === "background" && (
                    <Box
                      sx={{
                        userSelect: "none",
                        cursor: "pointer",
                        mt: {
                          sm: 4,
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: 14,
                          p: 1.5,
                          fontFamily: '"Inter", sans-serif',
                          ml: 1,
                          mb: { sm: 3, xs: 1 },
                        }}
                      >
                        Edit Background Color
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Grid
                          container
                          spacing={2}
                          sx={{ width: { sm: 380, xs: 220 }, mx: "auto" }}
                        >
                          {colors.map((bg) => {
                            return (
                              <Grid sx={4} key={bg.id}>
                                <Card
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectBgColor(bg.color);
                                  }}
                                  sx={{
                                    width: { sm: 115, xs: 60 },
                                    height: { sm: 40, xs: 30 },
                                    bgcolor: bg.color,
                                    border:
                                      selectBgColor === bg.color
                                        ? "3px solid #1976d2"
                                        : "3px solid transparent",
                                    boxSizing: "border-box",
                                  }}
                                ></Card>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Box>

                      <Box sx={{ mx: "10px" }}>
                        <Button
                          onClick={(e) => {
                            if (selectBgColor) {
                              ChangeBg.mutate(selectBgColor);
                              (setGlobalMsg("Background color updated successfully"),
                                setEditField(null));
                            }
                          }}
                          fullWidth
                          variant="contained"
                          sx={{
                            mt: {
                              sm: 3,
                              xs: 1.5,
                            },
                            py: 1.2,
                            bgcolor: "#1976d2",
                            borderRadius: "6px",
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                              bgcolor: "#1565c0",
                            },
                          }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Card>
              </Box>
            </Slide>
          </Box>
        )}
      </Backdrop>
    </Box>
  );
}
