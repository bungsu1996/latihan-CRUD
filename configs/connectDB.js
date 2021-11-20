// const mongoose = require('mongoose');

// const connectDB = () => {
//   main().catch((err) => console.log(err));

//   async function main() {
//     const dbPathUrl = "mongodb://localhost:27017/";
//     const dbName = "studentDataBase";
//     await mongoose.connect(`${dbPathUrl}${dbName}`);
//   }
// };

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const dbPathUrl = "mongodb://localhost:27017/";
    const dbName = "studentDataBase";
    await mongoose.connect(`${dbPathUrl}${dbName}`);
    console.log("DB Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;