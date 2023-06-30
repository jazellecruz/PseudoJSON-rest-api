const mongoose = require("mongoose");

const MAX_RETRY_ATTEMPTS = 5;

const connectToDB = async(retryCount = 0) => {
  try{
   await mongoose.connect(process.env.MONGODB_DEV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("Database connected successfully...");
  } catch(err) {

    // attempt to reconnect to the database for only 5 times
    if(retryCount < MAX_RETRY_ATTEMPTS && (err.code === "ECONNREFUSED" || err.code === "ETIMEOUT")){
      const delay = (retryCount + 1) * 5 * 1000;
      setTimeout(() => connectToDB(retryCount + 1), delay);
      console.log(`Failed to connect to database. Retrying in ${delay / 1000}s`);
      return;
    }

    console.log("Failed to connect to database...");
    console.log(err);
    process.exit(1);
  }
}

module.exports = connectToDB