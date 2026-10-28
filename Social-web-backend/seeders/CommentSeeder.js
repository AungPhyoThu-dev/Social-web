const {PrismaClient}=require("@prisma/client");
const prisma=new PrismaClient();
const {faker}=require("@faker-js/faker");

async function CommentSeeder() {
  console.log("Comment seeder is seeding start...");
  for(let i=0;i<20;i++){
    const content=faker.lorem.paragraph();
   const data=await prisma.comment.create({
    data:{
  content,
    userId:faker.number.int({min:1,max:10}),
    postId:faker.number.int({min:1,max:20}),

    }
  
   })
  }
  console.log("CommentSeeder seeding done")
}

module.exports={CommentSeeder}