const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log("alooo");
    
    console.log("✅ MongoDB connected successfully")})
.catch((error) => console.error("❌ MongoDB connection error:", error.message));
