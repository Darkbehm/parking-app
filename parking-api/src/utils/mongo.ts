import mongoose from 'mongoose';

export async function connectToMongo() {
  try {
    const USER = process.env.USERDB;
    const PASSWORD = process.env.PASSWORDDB;
    const DATABASE = process.env.DATABASE;
    const DATABASEURL = process.env.DATABASEURL;
    const uri = `mongodb+srv://${USER}:${PASSWORD}@${DATABASEURL}/${DATABASE}?retryWrites=true&w=majority`;

    mongoose.set('strictQuery', false);
    await mongoose.connect(uri);

    // eslint-disable-next-line no-console
    console.log('Connected to Database');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
}
