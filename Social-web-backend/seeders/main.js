const{UserSeeder}=require("./UserSeeder");
const {PostSeeder}=require("./PostSeeder");
const {CommentSeeder}=require("./CommentSeeder");
const {PostLikeSeeder}=require("./PostLikeSeeder");
const {CommentLikeSeeder}=require("./CommentLikeSeeder");

async function main(){
  try {
    await UserSeeder();
    await PostSeeder();
    await CommentSeeder();
    await PostLikeSeeder();
    await CommentLikeSeeder();
  } catch (error) {
    console.log(error);
    
  }
}
main();