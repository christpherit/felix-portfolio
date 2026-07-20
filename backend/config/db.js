// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/felix-portfolio';
//     console.log("Mongo URI:", process.env.MONGO_URI);

//     const conn = await mongoose.connect(mongoURI);
//     console.log(`✔ MongoDB Connection Active: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`✘ MongoDB Connection Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;
import mongoose from "mongoose";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✔ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;