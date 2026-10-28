const {PrismaClient}=require("@prisma/client");
const prisma=new PrismaClient();
const {faker}=require("@faker-js/faker");

async function PostLikeSeeder() {
  console.log("PostLikeSeeder seeding start....")
  for(let i=0;i<10;i++){
   const data= await prisma.postLike.create({
    data:{
      postId:faker.number.int({min:1,max:20}),
      userId:faker.number.int({min:1,max:10})
    }
   })
  }
  console.log("PostLikeSeeder seeding done...")
};
module.exports={PostLikeSeeder}