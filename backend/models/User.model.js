const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username : {type: String, require:true},
    password: {type:String, require: true},
    taks:[{type:mongoose.Types.ObjectId}]
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
    const pass = await bcrypt.hash(this.password, 10)
    this.password = pass
  next();
});

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema)
module.exports = User