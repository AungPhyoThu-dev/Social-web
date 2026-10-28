const {PrismaClient}=require("@prisma/client");
const prisma=new PrismaClient();

const {faker}=require("@faker-js/faker")

async function PostSeeder() {
  console.log("PostSeeder seeding start....");
  for(let i=0;i<20;i++){
    const content=faker.lorem.paragraph();
   
    const data=await prisma.post.create({
      data:{
        content,
        images:{
          create:[
            {url:faker.image.url()},
            {url:faker.image.url()}
          ]
        },
        userId:faker.number.int({min:1,max:10})
      }
    })
  }
  console.log("PostSeeder seeding done...")
}
module.exports={PostSeeder}
