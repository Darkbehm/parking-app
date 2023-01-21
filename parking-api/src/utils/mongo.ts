import mongoose from "mongoose";

export async function connectToMongo() {
  try {
    const USER = process.env.USERDB;
    const PASSWORD = process.env.PASSWORDDB;
    const DATABASE = process.env.DATABASE;
    const DATABASEURL = process.env.DATABASEURL;
    const uri = `mongodb+srv://${USER}:${PASSWORD}@${DATABASEURL}/${DATABASE}?retryWrites=true&w=majority`;

    mongoose.set('strictQuery', false);
    await mongoose.connect(uri);
    console.log("Connected to Database");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
