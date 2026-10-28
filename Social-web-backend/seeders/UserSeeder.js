const {PrismaClient}=require("@prisma/client");
const prisma=new PrismaClient();
const {faker}=require("@faker-js/faker");
const bcrypt=require("bcrypt")

async function UserSeeder() {
  for(let i=0;i<10;i++){
    const firstName=faker.person.firstName();
    const lastName=faker.person.lastName();
    const name=`${firstName} ${lastName}`;
    const username=`${firstName} ${lastName}${i}`;
    const image = faker.image.avatar();
    const hashpassword=await bcrypt.hash("password",10)
    const bio=faker.person.bio();
    const birthday=faker.date.birthdate({
      min:18,
      max:80,
      mode:"age"
    });
    const country=faker.location.country();
    const city=faker.location.city();

  const relationship=faker.helpers.arrayElement([
      "Single",
    "In a relationship",
    "Married",
    "It's complicated",
  ]);
  const jobtitle=faker.person.jobTitle();
  const company=faker.company.name();
const profileBgColor = faker.color.rgb();
  const data=await prisma.user.create({
    data:{
      name,
      username,
      password:hashpassword,
      bio,
      image,
      birthday,
      country,
city,
relationship,
jobtitle,
company,
profileBgColor
    }
  })
  }
  console.log("UserSeeder is seeding done")
}


module.exports={UserSeeder}