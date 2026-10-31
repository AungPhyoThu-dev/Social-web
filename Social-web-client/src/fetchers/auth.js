import { Token } from "@mui/icons-material";

const api=import.meta.env.VITE_API;

export async function PostUser(data) {
  const res=await fetch(`${api}/users`,{
    method:"POST",
    body:JSON.stringify(data),
    headers:{
      "Content-Type":"application/json"
    }
  })
  if(res.ok){
    return res.json();
  }
}

export async function AddPost(data) {
  const token=getToken()
  try {
     const res=await fetch(`${api}/content/posts`,{
    method:"POST",
   headers:{
    
    Authorization:`Bearer ${token}`
   },
   body:data
  })
  return res.json()
  } catch (error) {
    console.log(error)
  }
 
}
export async function LoginUser(data) {
  try {
      const res=await fetch(`${api}/login`,{
    method:"POST",
    body:JSON.stringify(data),
    headers:{
      "Content-Type":"application/json"
    }
  })
const result=await res.json();
if(!res.ok){
  throw new Error(result.msg||"Failed to fatch login")
}
return result
  } catch (error) {
    console.log(error);
    throw error
  }

}

function getToken(){
  return localStorage.getItem("token")
}

export async function  fetchVerify() {
  const token=getToken();
  const res=await fetch(`${api}/verify`,{
    method:"GET",
  headers:{
    
  Authorization:`Bearer ${token}`
  }
  });
  if(res.ok){
    return res.json()
  }
}
export async function  fetchPosts() {
  const token=getToken(); 
  const res=await fetch(`${api}/content/posts`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  if(res.ok){
    return res.json()
  }
}
export async function deletePost(postId){
  const token=getToken();
  try {
    const res=await fetch(`${api}/content/posts/${postId}`,{
      method:"DELETE",
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return res.json();
  } catch (error) {
    console.log(error)
  }
}
export async function savePost(postId){
  const token=getToken();
try {
  const res=await fetch(`${api}/content/savePost`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({
      postId,
    })
  })
  return res.json();
} catch (error) {
  console.log(error)
}
}

export async function postDetail(id) {
  const token=getToken();
  try {
     const res=await fetch(`${api}/content/posts/${id}`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return res.json()
  } catch (error) {
    console.log(error)
  }
 
}


export async function UnsavePost(postId) {
  const token=getToken();
try {
  const res=await fetch(`${api}/content/unsave`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({
      postId,
    })
  })
  return  res.json()
} catch (error) {
  console.log(error)
}
}

export async function FetchSavePost(){
  const token=getToken();
  try {
     const res=await fetch(`${api}/content/fetchsavepost`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return res.json()
  } catch (error) {
    console.log(error)
  }
 
  
}
export async function postLike(postId){
  const token=getToken();
  try {
    const res=await fetch(`${api}/content/like`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        postId
      })
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
export async function RemoveLike(postId) {
  const token=getToken();
  try {
    const res=await fetch(`${api}/content/islike`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        postId,
      })
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export async function postReplies(postId,commentId,content){
  const token=getToken();
  try {
    const res=await fetch(`${api}/content/comment/${commentId}`,{
      method:"POST",
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`,
    },
    body:JSON.stringify({
      postId,
      content
    })
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export async function commentLike(commentId) {
  const token=getToken();

  try {
    const res=await fetch(`${api}/content/commentLike`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        commentId,
      })
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export async function RemoveCommentLike(commentId){
  const token=getToken();
  try {
    const res=await fetch(`${api}/content/isCommentLike`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        commentId
      })
      
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export async function AddComment(postId,content){
  const token=getToken();
  try {
    const res=await fetch(`${api}/content/comments`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        content,
      postId
      })
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export async function ViewProfile(userId) {
  const token=getToken();
  try {
    const res=await fetch(`${api}/content/profile/${userId}`,{
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
export async function ViewEditProfile(id){
  const token=getToken();
  try {
    const res=await fetch(`${api}/content/profile/${id}`,{
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
export async function ChangBgColor(bgColor){
  const token=getToken();
  try {
    const res=await fetch(`${api}/profile/background`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify(
        {
        bgColor,
      }
      )
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
export async function EditUsername(editUsername){
  const token=getToken();
  try {
    const res=await fetch(`${api}/profile/username`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
       editUsername
      })
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
export async function EditPassword(newPassword){
  const token=getToken();
  try {
    const res=await fetch(`${api}/profile/password`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        newPassword
      })
    })
    const data=await res.json()
    if (!res.ok) {
      throw new Error(data.message || "Failed to change password");
    }
    return data
  } catch (error) {
    console.log(error);
    throw error
  }
}
export async function EditCountry(newcountry){
  const token=getToken();
  try {
    const res=await fetch(`${api}/profile/country`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        newcountry
      })
    })
  return res.json()
  } catch (error) {
    console.log(error)
  }
}
export async function EditCity(newcity){
  const token=getToken();
  try {
    const res=await fetch(`${api}/profile/city`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        newcity
      })
    })
  return res.json()
  } catch (error) {
    console.log(error)
  }
}
export async function EditBio(newbio){
  const token=getToken();
  try {
    const res=await fetch(`${api}/profile/bio`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        newbio
      })
    })
  return res.json()
  } catch (error) {
    console.log(error)
  }
}
export async function EditBirthday(newbirthday){
  const token=getToken();
  try {
    const res=await fetch(`${api}/profile/birthday`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        newbirthday
      })
    })
  return res.json()
  } catch (error) {
    console.log(error)
  }
}

export async function EditRelation(newrelation){
  const token=getToken();
  try {
    const res=await fetch(`${api}/profile/relation`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        newrelation
      })
    })
  return res.json()
  } catch (error) {
    console.log(error)
  }
}
export async function EditGender(newgender){
  const token=getToken();
  try {
    const res=await fetch(`${api}/profile/gender`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        newgender
      })
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
export async function EditCompany(newcompany){
  const token=getToken();
  try {
    const res=await fetch(`${api}/profile/company`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        newcompany
      })
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
export async function EditJobtitle(newjobtitle){
  const token=getToken();
  try {
    const res=await fetch(`${api}/profile/jobtitle`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        newjobtitle
      })
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
export async function EditProfileImage(formData){
  const token=getToken();
  try {
    const res=await fetch(`${api}/profile/image`,{
      method:"PATCH",
      headers:{
        Authorization:`Bearer ${token}`
      },
      body:formData
    })
        const data = await res.json();
  console.log("Backend status:", res.status);
    console.log("Backend response:", data);
    if (!res.ok) {
      throw new Error(data.msg || "Failed to update profile image");
    }

    return data;
  } catch (error) {
    console.log(error)
  }
}
export async function ViewDashBoard(){
   
  const token=getToken();
  try {
    const res=await fetch(`${api}/dashboard`,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    });
    
     const data=await res.json();
  
    if(!res.ok){
    throw new Error("failed to fatch DashBoard data")
    }
   
    return data;
  } catch (error) {
    console.log(error);
      throw error;
  }
}
export async function UserAdmin(){
  const token=getToken();
  try {
    const res=await fetch(`${api}/useradmin`,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    });
    const data=await res.json();
    if(!res.ok){
      throw new Error("failed to fatch UserAdmin data")
    }
    return data;
  } catch (error) {
    console.log(error);
      throw error
    
  }
}
export async function PostAdmin() {
  const token=getToken();
  try {
    const res=await fetch(`${api}/content/postadmin`,{
      headers:{
        Authorization:`Bearer ${token}`
      },
    })
    const data=await res.json();
    if(!res.ok){
      throw Error("Failed to fatch PostAdmin data")
    }
return data;
  } catch (error) {
    console.log(error);
    throw error
  }
}
export async function AdminSelectBan(id,isBanned){
  const token=getToken();
  try {
    const res=await fetch(`${api}/useradmin/isbanned`,{
      method:"PATCH",
      headers:{
        Authorization:`Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        id,
        isBanned
      }),

    });
    const data=await res.json();
    if(!res.ok){
      throw new Error("Fatch to failed banned user")
    }
    return data;
  } catch (error) {
    console.log(error)
    throw error;
  }
}
export async function  AdminOrUserSelect(id,role) {
  const token=getToken();
  try {
    const res=await fetch (`${api}/useradmin/role`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json",
Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        id,
        role
      })
    });
    const data=await res.json();
    if(!res.ok){
      throw new Error("Fatch to failed role for UserAdmin")
    }
    return data
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function Logout(){
  const token=getToken();
  try {
    const res=await fetch(`${api}/logout`,{
      method:"POST",
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    const data=await res.json();
    if(!res.ok){
      throw new Error(data.msg || data.error || "Failed logout");
    }
    return data
  } catch (error) {
    console.log(error);
    throw error
  }
}