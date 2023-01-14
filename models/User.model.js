const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required:[true, "Username is required "],
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: [true, "Password is true"]
  }
},
{
  timestamps:true
}
);

const User = model("User", userSchema);

module.exports = User;
