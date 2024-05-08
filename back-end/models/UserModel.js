const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    profilePic: { type: String, default: "https://avatars.githubusercontent.com/u/112895769?v=4" },
});

const User = mongoose.model('User', userSchema);

export default User;