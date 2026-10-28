const {PrismaClient}=require("@prisma/client");
const prisma=new PrismaClient();

const {faker}=require("@faker-js/faker");

async function CommentLikeSeeder() {
  console.log("CommentLikeSeeder seeding start....");
  for(let i=0;i<5;i++){
    const data=await prisma.commentLike.create({
      data:{
        commentId:faker.number.int({min:1,max:20}),
        userId:faker.number.int({min:1,max:10})

      }
    })
  }
  console.log("CommentLikeSeeder seeding done..")
}
module.exports={CommentLikeSeeder}