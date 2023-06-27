const mongoose = require("mongoose");

const connectToDB = async() => {
  try{
   await mongoose.connect(process.env.MONGODB_DEV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("Database connected successfully...");
  } catch(err) {
    // if (err.code === "ECONNREFUSED" || err.code === "ETIMEOUT") {
    //   setTimeout(connectToDB(), 10000);
    //   return;
    // }

    console.log("Failed to connect to database...");
    console.log(err);
    process.exit(1);
  }
}

module.exports = connectToDB