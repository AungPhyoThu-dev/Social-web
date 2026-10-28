import { useState,useEffect,useMemo,useContext,createContext } from "react";
import { createTheme,CssBaseline,ThemeProvider } from "@mui/material";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { deepOrange } from "@mui/material/colors";
import Home from "./pages/Home";
import Template from "./Template";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Friend from "./pages/Friend";
import PostDetail from "./pages/PostDetail";
import AddPost from "./pages/Addpost";
import EditProfile from "./pages/Editprofile";
import Useradmin from "./pages/UserAdmin";
import Postadmin from "./pages/Postadmin";
import AdminLayout from "./AdminLayout";
import RelationandGenderBirthday from "./pages/RelationGenderandBirthday";
import {FetchSavePost}  from  "./fetchers/auth";
import { fetchVerify } from "./fetchers/auth";
export const queryClient=new QueryClient();

const Appcontext=createContext();

export function useApp(){
  return useContext(Appcontext)
}

const router=createBrowserRouter([
  {
    path:"/",
    element:<Template/>,
    children:[
      {
        path:"/",
        element:<Home/>,
      },
      {
        path:"/login",
        element:<Login/>,
      },
      {path:"/register",
        element:<Register/>
      },
      {
        path:"/profile/:id",
        element:<Profile/>
      },{
        path:"/friend",
        element:<Friend/>
      },
      {
        path:"/postDetail/:id",
        element:<PostDetail/>
      },{
        path:"/addpost",
        element:<AddPost/>
      },
      {
        path:"/editprofile",
        element:<EditProfile/>
      },
      {path:"/relationandGenderBirthday",
        element:<RelationandGenderBirthday/>
      },
      
    ]
  },
  {
    path:"/admin",
    element:<AdminLayout/>,
    children:[
      {
        index:true,
        element:<Dashboard/>
      },
      {
        path:"useradmin",
        element:<Useradmin/>
      },
      {path:"postadmin",
        element:<Postadmin/>
      },
    
    ]
  }
])
export default function ThemeApp(){
  const [mode,setMode]=useState("dark");
  const [auth,setAuth]=useState(null);
  const [showForm,setShowForm]=useState(false);
  const [showDrawer,setShowDrawer]=useState(false);
  const [globalMsg,setGlobalMsg]=useState(null);
  const [error,setError]=useState(null);
  const[showSaveCard,setShowSaveCard]=useState(null);
  const [hidden,setHidden]=useState([]);
  const [postSave,setPostSave]=useState([]);
  const [viewImage,setViewImage]=useState(null);
  const [showLike,setShowLike]=useState(null);
const[showSkeleton,setShowSkeleton]=useState(true);
  const [expandedComment,setExpandedComment]=useState(null)
  const [expandedReply,setExpandedReply]=useState([])
 const [showFeeling,setShowFeeling]=useState(null);
 const [showFeelingTab,setShowFeelingTab]=useState(1)
  const [showReplyForm,setShowReplyForm]=useState([])
const [commentReply,setCommentReply]=useState(null)
const [showReply,setShowReply]=useState([])
const [secondShowReply,setSecondShowReply]=useState([])
const [addComment,setAddComment]=useState([])
const [tabValue,setTabValue]=useState(1)
const [searchFeeling,setSearchFeeling]=useState("");
const [searchActivity,setSearchActivity]=useState("");
const [selectedEmoji,setSelectedEmoji]=useState(null);
const [expandPost,isExpandPost]=useState(null);
const [expandedPost,setExpandedPost]=useState(null);
const [storeImage,setStoreImage]=useState([]);
const [selectedImage,setSelectedImage]=useState([]);
const [accountDetailOpen,setAccountDetailOpen]=useState(false)
const [personDetailOpen,setPersonDetailOpen]=useState(false);

const [workexperience,setWorkExperience]=useState(false);
const[editField,setEditField]=useState(null);
const [showPassword,setShowPassword]=useState(false);
const[birthday,setBirthday]=useState("");
const [openDropDown,setOpenDropDown]=useState(false)
const[selectBgColor,setSelectBgColor]=useState(null)
const [changeUsername,setChangeUsername]=useState(null);
const [changePassword,setChangePassword]=useState(null);
const [changeCountry,setChangeCountry]=useState(null);
const[changeCity,setChangeCity]=useState(null);
const[changeBio,setChangeBio]=useState(null);
const [changeBirthday,setChangeBirthday]=useState(null);
const[changeRelation,setChangeRelation]=useState(null);
const[changeGender,setChangeGender]=useState(null);
const [changeCompany,setChangeCompany]=useState(null);
const [changeJobTitle,setChangeJobTitle]=useState(null)
const [selectProfileImage,setSelectProfileImage]=useState(null)
const[adminOpen,setAdminOpen]=useState(false)
  const theme=useMemo(()=>{
    return createTheme({
      palette:{
        mode,
        primary: {
  main: deepOrange[500],
},
        banner: mode === "dark" ? "#F5F5F5" : "black",
      }
    })
  },[mode]);
  useEffect(()=>{
    async function LoadUser(){
      const user =await fetchVerify();
      setAuth(user);
      if(user){
const savePosts=await FetchSavePost();
setPostSave(savePosts.map((item)=>item.postId))
}
    }
LoadUser()

  },[])
  return(
    <ThemeProvider theme={theme}>
      <CssBaseline/>
<Appcontext.Provider value={{
  mode,setMode,auth,setAuth,showForm,setShowForm,globalMsg,setGlobalMsg,error,setError,showDrawer,setShowDrawer,showSaveCard,setShowSaveCard,hidden,setHidden,postSave,setPostSave,viewImage,setViewImage,showLike,setShowLike,expandedComment,setExpandedComment,showReplyForm,setShowReplyForm,commentReply,setCommentReply,expandedReply,setExpandedReply,showReply,setShowReply,showSkeleton,setShowSkeleton,secondShowReply,setSecondShowReply,addComment,setAddComment,tabValue,setTabValue,showFeeling,setShowFeeling,showFeelingTab,setShowFeelingTab,selectedEmoji,setSelectedEmoji,searchFeeling,setSearchFeeling,searchActivity,setSearchActivity,
  expandPost,isExpandPost,expandedPost,setExpandedPost,storeImage,setStoreImage,selectedImage,setSelectedImage,accountDetailOpen,setAccountDetailOpen,personDetailOpen,setPersonDetailOpen,
 workexperience,setWorkExperience,editField,setEditField,
  showPassword,setShowPassword,birthday,setBirthday,openDropDown,setOpenDropDown,selectBgColor,setSelectBgColor,changeUsername,setChangeUsername,changePassword,setChangePassword,changeCountry,setChangeCountry,changeCity,setChangeCity,changeBio,setChangeBio,changeBirthday,setChangeBirthday,

  changeRelation,setChangeRelation,changeGender,setChangeGender,changeCompany,setChangeCompany,changeJobTitle,setChangeJobTitle,selectProfileImage,setSelectProfileImage,adminOpen,setAdminOpen
}}>
<QueryClientProvider client={queryClient}>
  <RouterProvider router={router}></RouterProvider>
</QueryClientProvider>

</Appcontext.Provider>
    </ThemeProvider>
  )

  
}