const express=require("express");
const bcrypt=require("bcrypt")
const router=express.Router();
const {PrismaClient}=require("@prisma/client");
const cloudinary=require("../config/cloudinary");
const {isAuth,isAdmin}=require("../middleware/auth");
const prisma=new PrismaClient();
const jwt=require("jsonwebtoken");
const upload = require("../middleware/upload");
router.get("/users",async(req,res)=>{
  try {
    const data=await prisma.user.findMany({
      include:{
        posts:true,
        comments:true,
      },
      orderBy:{
        id:"desc"
      },
      take:10,
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({
    message:error.message
    })
  }
})

router.get("/users/:id",async(req,res)=>{
  
  try {
    const{id}=req.params;
    const data=await prisma.user.findUnique({
      where:{id:Number(id)},
      include:{
        posts:true,
        comments:true,
      }
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({
      error:error
    })
  }
})

router.post("/users",async(req,res)=>{
  try {
   const {name,username,password,bio,image}=req.body;
   if(!name||!username||!password||!bio){
  return  res.status(400).json({msg:"name,username,password and bio is requied"})
   }
   const hash=await bcrypt.hash(password,10)
   const data=await prisma.user.create({
    data:{
      name,
      username,
      password:hash,
      bio,
      image
    }
   })
   res.json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
});
router.delete("/users/:id",async(req,res)=>{
  try {
    const{id}=req.params;
  const data=await prisma.user.delete({
    where:{id:Number(id)}
  })
    res.json(data)
  } catch (error) {
    res.status(500).json({error:error})
  }
})
router.post("/login",async(req,res)=>{
  try {
    const {username,password}=req.body;
    if(!username||!password){
      return res.status(400).json({msg:"Username and Password is required"})
    }
    const user=await prisma.user.findUnique({
      where:{username}
    })
    if(!user){
      return res.status(401).json({msg:"Invalid username and passsword"})
    }
   
   const isMatch= await bcrypt.compare(password,user.password);
   if(!isMatch){
    return res.status(401).json({msg:"Invalid Username and password"})
   }
   const updatedUser=await prisma.user.update({
    where:{id:user.id},
    data:{
      isActive:true,
    }
   })
   const token=jwt.sign({
    id:updatedUser.id,
    username:updatedUser.username,
    bio:updatedUser.bio,
    image:updatedUser.image,
    role:updatedUser.role,
   },process.env.JWT_SECRET)
   return res.json({token,user:updatedUser})
  } catch (error) {
    res.status(500).json({error:error.message})
  }
});


router.get("/verify",isAuth,async(req,res)=>{
  const user=res.locals.user;
  try {
    const data=await prisma.user.findUnique({
      where:{id:user.id},
      select:{
        id:true,
        name:true,
        username:true,
        image:true,
        bio:true,
        role:true
      }
    })
if(!user){
  return res.status(400).json({msg:"User not found"})
}
return res.json(data)
  } catch (error) {
    console.log(error)
  }
})
router.patch("/profile/background",isAuth,async(req,res)=>{
  const user=res.locals.user;
  try {
    const {bgColor}=req.body;
    const data=await prisma.user.update({
      where:{id:user.id},
        data:{
     profileBgColor:bgColor,
  },
    },

  )
  return res.status(200).json(data)

  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
router.patch("/profile/username",isAuth,async(req,res)=>{
  const user=res.locals.user;
  try {
    const {editUsername}=req.body;
    const data=await prisma.user.update({
      where:{id:user.id},
      data:{
        username:editUsername
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
router.patch("/profile/password",isAuth,async(req,res)=>{
  const user=res.locals.user;
  try {
    const {newPassword}=req.body;
    if(!newPassword||newPassword.length>8){
      return res.status(400).json({
        message:`Password must be at least 8 characters`
      })
    }
    const hashPassword=await bcrypt.hash(newPassword,10)
    const data=await prisma.user.update({
      where:{id:user.id},
data:{
  password:hashPassword
}
    
    })
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
    
  }
})
router.patch("/profile/country",isAuth,async(req,res)=>{
  const user=res.locals.user;
  try {
    const{newcountry}=req.body;
    const data=await prisma.user.update({
      where:{id:user.id},
      data:{
        country:newcountry
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
router.patch("/profile/city",isAuth,async(req,res)=>{
  const user=res.locals.user;
  try {
    const{newcity}=req.body;
    const data=await prisma.user.update({
      where:{id:user.id},
      data:{
        city:newcity
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
router.patch("/profile/bio",isAuth,async(req,res)=>{
  const user=res.locals.user;
  try {
    const{newbio}=req.body;
    const data=await prisma.user.update({
      where:{id:user.id},
      data:{
        bio:newbio
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
router.patch("/profile/birthday",isAuth,async(req,res)=>{
  const user=res.locals.user;
  try {
    const{newbirthday}=req.body;
    const data=await prisma.user.update({
      where:{id:user.id},
      data:{
        birthday:newbirthday?new Date(`${newbirthday}T00:00:00.000Z`):null
      }
    })
    return res.status(200).json(data)
  } catch (error) {
 console.error("Birthday update error:", error);

  return res.status(500).json({
    error: error.message,
  });
  }
})
router.patch("/profile/relation",isAuth,async(req,res)=>{
  const user=res.locals.user;
  try {
    const{newrelation}=req.body;
    const data=await prisma.user.update({
      where:{id:user.id},
      data:{
        relationship:newrelation
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
router.patch("/profile/gender",isAuth,async(req,res)=>{
  const user=res.locals.user;
  try {
    const {newgender}=req.body;
    const data=await prisma.user.update({
      where:{id:user.id},
      data:{
        gender:newgender
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
router.patch("/profile/company",isAuth,async(req,res)=>{
  const user=res.locals.user;
  try {
    const {newcompany}=req.body;
    const data=await prisma.user.update({
      where:{id:user.id},
      data:{
        company:newcompany
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
router.patch("/profile/jobtitle",isAuth,async(req,res)=>{
  const user=res.locals.user;
  try {
    const {newjobtitle}=req.body;
    const data=await prisma.user.update({
      where:{id:user.id},
      data:{
        jobtitle:newjobtitle
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
router.patch("/profile/image",isAuth,upload.single("image"),async(req,res)=>{
  const user=res.locals.user;
  if(!req.file){
    return res.status(400).json({msg:"Select one image"})
  }
const uploadCloudinary=(buffer)=>{
  return new Promise((resolve,reject)=>{
    const stream=cloudinary.uploader.upload_stream({
      folder:"profileImage"
    },
  (error,result)=>{
    if(error){
      reject(error)
    }
    else{
      resolve(result)
    }
  })
  stream.end(buffer)
  })
}

try {
  const result=await uploadCloudinary(req.file.buffer)
  const data=await prisma.user.update({
  where:{id:user.id},
  data:{
    image:result.secure_url
  }
})
return res.status(200).json({msg:"Profile image updated successfully",  image: data.image,})
} catch (error) {
        res.status(500).json({
        error: error.message,
      });
}

})
router.get("/dashboard",isAuth,isAdmin(),async(req,res)=>{
   
  try {

  const[totalUsers,totalPosts,totalBannedAccounts,totalLikes,totalComments]=await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.user.count({
      where:{isBanned:true}
    }),
    prisma.postLike.count(),
    prisma.commentLike.count()
  ])

  
  return res.status(200).json({
    totalUsers,totalPosts,totalBannedAccounts,totalLikes,totalComments
  })
  } catch (error) {
    return res.status(500).json({error:error.message})
  }
})
router.patch("/useradmin/isbanned",isAuth,isAdmin(),async(req,res)=>{
  try {
    const{id,isBanned}=req.body;
    const data=await prisma.user.update({
      where:{id:Number(id)},
      data:{
        isBanned:isBanned
      }
    })
    return res.status(200).json({msg:"User Status updat is successfully"})
  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
})
  router.get("/useradmin",isAuth,isAdmin(),async(req,res)=>{
   

    try {
      const [data,totalUser]=await Promise.all([
  prisma.user.findMany({
       select:{
        id:true,
        name:true,
        username:true,
        email:true,
        role:true,
        bio:true,
        isActive:true,
        isBanned:true,
        image:true,
       },
     
      }),
          prisma.user.count(),
      ])
      
      
     
   
      return res.status(200).json({user:data,totalUser})
    } catch (error) {
      return res.status(500).json({error:error.message})
    }
  })
router.post("/logout",isAuth,async(req,res)=>{
  const user=res.locals.user;
  try {
    const data=await prisma.user.update({
      where:{id:user.id},
      data:{
        isActive:false
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
module.exports={UserRouter:router}