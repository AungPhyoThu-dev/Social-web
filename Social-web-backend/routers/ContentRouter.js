const express=require("express");
const router=express.Router();
const {isAuth,isOwner}=require("../middleware/auth")
const {PrismaClient}=require("@prisma/client");
const upload=require("../middleware/upload")
const prisma=new PrismaClient();
const cloudinary=require("../config/cloudinary");
const {Readable}=require("stream");


router.get("/posts",async(req,res)=>{
  try {
    const data=await prisma.post.findMany({
      orderBy:{
created:"desc"
      },
      include:{
        user:true,
        images:true,
        comments:{
          
include:{
  user:true,
  commentLikes:{
    include:{
      user:true,
    }
  }
}
        },
        postLikes:{
          include:{
            user:true,
          }
        }
      }
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

router.get("/posts/:id",isAuth,async(req,res)=>{
  try {
    const{id}=req.params;
    const data=await prisma.post.findUnique({
      where:{id:Number(id)},
      include:{
        user:true,
        images:true,
        comments:{
          where:{
            parentId:null,
          },
         include:{
          user:true,
           commentLikes:{
          include:{
            user:true,
          }
        },
        Replies:{
include:{
  user:true,
  commentLikes:{
    include:{
      user:true,
    }
  }
},

        }
         },
          
        },
      postLikes:{
        include:{
          user:true,
        }
      }
      }
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
router.delete("/posts/:id",isAuth,isOwner("post"),async(req,res)=>{
  const {id}=req.params;
  try {
    await prisma.commentLike.deleteMany({
    where:{
      comment:{
        postId:Number(id)
      }
    }
  })
  await prisma.comment.deleteMany({
    where:{postId:Number(id)},
  });
  await prisma.postLike.deleteMany({
    where:{postId:Number(id)}
  });
  await prisma.post.delete({
    where:{id:Number(id)}
  });
  res.json()
  } catch (error) {
    res.status(500).json({error:error.message})
  }
  
})

router.delete("/comments/:id",isAuth,isOwner("comment"),async(req,res)=>{
  try {
    const {id}=req.params;
  await prisma.commentLike.deleteMany({
    where:{commentId:Number(id)}
  });
  await prisma.comment.delete({
    where:{id:Number(id)}
  })
  res.json()
  } catch (error) {
    res.status(500).json({error:error.message})
  }
});
router.post("/comments",isAuth,async(req,res)=>{
  try {
    const {content,postId}=req.body;
const user=res.locals.user;

console.log("REQ BODY:", req.body);
console.log("POST ID:", postId);
console.log("POST ID TYPE:", typeof postId);
const numericPostId=Number(postId);
if (!Number.isInteger(numericPostId) || numericPostId <= 0) { return res.status(400).json({ error: "Invalid post ID" }); }
    const data=await prisma.comment.create({
      data:{
        content,
        user:{
          connect:{
            id:user.id
          }
        } ,
        post:{
          connect:{
            id:numericPostId
          }
        },
        parent: {
  connect: undefined
}
      },
      include:{
        user:true,
        commentLikes:{
          include:{
            user:true,
          }
        }
      },
    })
    res.json(data)
  } catch (error) {
     console.error("ADD COMMENT ERROR:", error);
    res.status(500).send({error:error.message})
  }
})

router.post("/posts",isAuth,upload.array("images",4),async(req,res)=>{
  const {content,feeling,emoji}=req.body;
  const user=res.locals.user;
  console.log(req.files);
  if(!content?.trim() && (!req.files||req.files.length===0)){
    return res.status(400).json({msg:"Content or Iamge is required"})
  }
  const uploadCloudinary=(buffer)=>{
    return new Promise((resolve,reject)=>{
      const stream=cloudinary.uploader.upload_stream({
        folder:"posts",
      },
    (error,result)=>{
      if(error){
        reject(error)
      }
      else{
        resolve(result)
      }
    }
    )
 stream.end(buffer);
    })
  }
  try{
const uploadImage=await Promise.all(req.files.map((file)=>uploadCloudinary(file.buffer)));
   console.log("CLOUDINARY:", uploadImage);
  const DataImage=uploadImage.map((result)=>({url:result.secure_url}));
  console.log("IMAGE DATA:", DataImage);
     const data=await prisma.post.create({
    data:{
      content,
      feeling,
      emoji,
      
      userId:user.id,
      images:{
        create:DataImage,
        
      },
    
    },
      include:{
        images:true,
      }
  })
  res.json(data)
  } catch (error) {
        console.error("CREATE POST ERROR:", error);

      res.status(500).json({
        error: error.message,
      });
  }
 
})

router.post("/savePost",isAuth,async(req,res)=>{
  const{postId}=req.body;
  const user=res.locals.user;
  if(!postId){
    return res.status(400).json({msg:"Post is required"})
  }
  try {
    const data=await prisma.savePost.create({
      data:{
        userId:user.id,
        postId:postId,

      }
      
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

router.delete("/unsave",isAuth,async(req,res)=>{
  const user=res.locals.user;
  const {postId}=req.body;
  try {
    const data=await prisma.savePost.deleteMany({
      where:{
        userId:user.id,
        postId:Number(postId)
      }
    })
    return res.json({msg:"Unsave Post"})
  } catch (error) {
    return res.status(500).json({msg:error.message})
  }
})
router.get("/fetchsavepost",isAuth,async(req,res)=>{
  const user=res.locals.user;
 
  try {
    const data=await prisma.savePost.findMany({
      where:{
        userId:user.id,

      },
      include:{
        post:true
      }
    })
    return res.json(data);
  } catch (error) {
    return res.status(500).json({msg:error.message})
  }
})
router.post("/like",isAuth,async(req,res)=>{
  const user=res.locals.user;
  const {postId}=req.body;
  try {
    const exist=await prisma.postLike.findFirst({
      where:{
        userId:user.id,
        postId:Number(postId)
      }
    })
    if(exist){
      return res.status(400).json({
        msg:"Liked User"
      })
    }
    const data=await prisma.postLike.create({
      data:{
        userId:user.id,
postId:Number(postId)
      }

    })
    res.json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
router.delete("/islike",isAuth,async(req,res)=>{
  const user=res.locals.user;
  const {postId}=req.body;
   
  try {
    const data=await prisma.postLike.deleteMany({
      where:{
        userId:user.id,
        postId:Number(postId)
      }
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
})
router.post("/commentLike",isAuth,async(req,res)=>{
  const user=res.locals.user;
  const {commentId,}=req.body;
  try {
    const exit=await prisma.commentLike.findFirst({
      where:{
        userId:user.id,
        commentId:Number(commentId)
      }
    })
    if(exit){
      return res.status(400).json({msg:"Liked User"})
    }
    const data=await prisma.commentLike.create({
      data:{
        userId:user.id,
        commentId:Number(commentId)
      }
    })
   res.json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
router.delete ("/isCommentLike",isAuth,async(req,res)=>{
  const user=res.locals.user;
  const {commentId}=req.body;
  try {
    const data=await prisma.commentLike.deleteMany({
      where:{
        userId:user.id,
        commentId:Number(commentId)
      }
    })
    res.json(data)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})
router.post("/comment/:id",isAuth,async(req,res)=>{
  const {id}=req.params;
  const user=res.locals.user;
  const {content,postId}=req.body;

  try {
    const data=await prisma.comment.create({
      data:{
      content,
      userId:user.id,
      postId:Number(postId),
      parentId:Number(id)

      },
      include:{
        user:true,
      }
    })
    return res.json(data)
  } catch (error) {
    return res.status(500).json({msg:error.message})
  }
})
router.get("/profile/:id",isAuth,async(req,res)=>{
  const {id}=req.params;
  const loginUser=res.locals.user;
  try {
    const isNotOwner=loginUser.id!==Number(id);
    const user=await prisma.user.findUnique({
      where:{id:Number(id)},
   
       include:{
        savePosts:{
          include:{
            post:{
              include:{
               images:true,
                user:true,
                 postLikes:{
                  include:{
                    user:true,

                  }
                },
                comments:true,
              }
            
               
              
            }
          }
        },
      posts:{
        include:{
           images:true,
postLikes:{
  include:{
    user:true,
  }
},
        comments:true
        }
        
      },
      followers:true,
      following:true,
      postLikes:{
        include:{
          user:true,
        }
      },
      commentLikes:{
        include:{
          user:true,
        }
      }
     
    },
     
  
    });
    if(!user){
   return   res.status(400).json({msg:"User not found"})
    }
   return res.json({...user,isNotOwner})
  } catch (error) {
    return res.status(500).json({msg:error.message})
  }
})

module.exports={ContentRouter:router}