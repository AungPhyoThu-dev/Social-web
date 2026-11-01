const{UserSeeder}=require("./UserSeeder");
const {PostSeeder}=require("./PostSeeder");
const {CommentSeeder}=require("./CommentSeeder");
const {PostLikeSeeder}=require("./PostLikeSeeder");
const {CommentLikeSeeder}=require("./CommentLikeSeeder");
const{ReportSeeder}=require("./ReportSeeder")
async function main(){
  try {
    await UserSeeder();
    await PostSeeder();
    await CommentSeeder();
    await PostLikeSeeder();
    await CommentLikeSeeder();
    await ReportSeeder();
  } catch (error) {
    console.log(error);
    
  }
}
main();