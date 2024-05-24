const mongoose = require('mongoose');

// const dbConnect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('Error connecting to MongoDB', error);
//     process.exit(1);
//   }
// };

// module.exports = { dbConnect };


const dbConnect = async() => {
  try{
    const connect = await mongoose.connect("mongodb://127.0.0.1:27017/wearWash");
    console.log("Database Connected:",
     connect.connection.host,
     connect.connection.name
     )
  }
  catch(err){
      console.log("database not connected")
      console.log(err);
      process.exit(1);
  }
}

// module.exports = ConnectDB;
module.exports = { dbConnect };