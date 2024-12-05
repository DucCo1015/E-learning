import mongoose from "mongoose";

const connectDb = async () => {
 try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log('mongodb connection completed')
 } catch (error) {
  console.log(error)
 }
}
export default connectDb;