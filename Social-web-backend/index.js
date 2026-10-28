const express=require("express");
const cors=require("cors");
const {PrismaClient}=require("@prisma/client");
const {UserRouter}=require("./routers/UserRouter");
const {ContentRouter}=require("./routers/ContentRouter")
const prisma=new PrismaClient();
require("dotenv").config();
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use("/",UserRouter);
app.use("/content",ContentRouter)
console.log(process.env.CLOUDINARY_CLOUD_NAME)
const server=app.listen(8000,()=>{
  console.log("Social Api is running at port 8000")

})

const gracefulShutDown=async()=>{
  await prisma.$disconnect();
  server.close(()=>{
    console.log("Server is closed ");
    process.exit(0)
  })
}

process.on("SIGTERM",gracefulShutDown);
process.on("SIGINT",gracefulShutDown)