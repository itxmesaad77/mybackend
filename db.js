const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectToMongo;
