const mongoose=require("mongoose");
const mongoUri="mongodb+srv://mfury121:eFlTz5J6J3aNSyjt@cluster0.tesww5c.mongodb.net/notes?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoUri, {
      });
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1); 
    }
  };
  
  module.exports = connectToMongo;