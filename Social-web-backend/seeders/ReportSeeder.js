const{PrismaClient}=require("@prisma/client");
const prisma=new PrismaClient();

async function ReportSeeder() {
  const users=await prisma.user.findMany({
    take:4,
    select:{
      id:true
    }
  });
  const posts=await prisma.user.findMany({
    take:5,
    select:{
      id:true
    }
  });
  if(users.length===0||posts.length===0){
  console.log("User and Post not found")
  };
 await prisma.report.createMany({
  data:[
    { userId: users[0].id, postId: posts[0].id, reason: "Spam" },
      { userId: users[1].id, postId: posts[0].id, reason: "Harassment" },
      { userId: users[2].id, postId: posts[1].id, reason: "Hate speech" },
      { userId: users[3].id, postId: posts[2].id, reason: "False information" },
      { userId: users[0].id, postId: posts[3].id, reason: "Violence" },
      { userId: users[1].id, postId: posts[4].id, reason: "Inappropriate content" },
      { userId: users[2].id, postId: posts[2].id, reason: "Spam" },
  ]
 });
 console.log("Report seeder is done")
}
module.exports={ReportSeeder}