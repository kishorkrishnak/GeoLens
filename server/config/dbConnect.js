const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

connectDB();
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection errr"));
db.once("open", () => {
  console.log("Database connected");
});
