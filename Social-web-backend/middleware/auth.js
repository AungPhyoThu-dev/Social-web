const express=require("express");
const jwt=require("jsonwebtoken");

const {PrismaClient}=require("@prisma/client");
const prisma=new PrismaClient();
/**
 * @param {express.Request} req
 * @param {express.Response} Response
 * @param {express.NextFunction} next
 */

function isAuth(req,res,next){
  const {authorization}=req.headers;
  const token=authorization && authorization.split(" ")[1];
  if(!token){
    return res.status(400).json({msg:"Token is required"})
  }
  try {
      const user=jwt.verify(token,process.env.JWT_SECRET);
      res.locals.user=user;
      next();
  } catch (error) {
    return res.status(400).json({msg:"Invalid Token"})
  }

  
}
/**
 * @param {"post" | "comment"} type
 */
function isOwner(type){
  /**
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  return async(req,res,next)=>{
const {id}=req.params;
const user=res.locals.user;
if(type==="post"){
  const post=await prisma.post.findUnique({
    where:{id:Number(id)}
  });
  if(!post){
    return res.status(404).json({msg:"Post not found"})
  };
  if(post.userId!==user.id){
    return res.status(403).json({msg:"Forbidden"})
  }

}
if(type==="comment"){
  const comment=await prisma.comment.findUnique({
    where:{id:Number(id)}
  });
  if(!comment){
    return res.status(404).json({msg:"Comment is not found"})
  };
  if(comment.userId!==user.id){
    return res.status(403).json({msg:"Forbidden"})
  }
}
next()
  }
  
}
function isAdmin(){
  return async(req,res,next)=>{
    const user=res.locals.user;
       
   

  if(!user||user.role!=="admin"){
    return res.status(400).json({msg:"Admin access requird"})
  }
  next()
  }

}
module.exports={isAuth,isOwner,isAdmin}