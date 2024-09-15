// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema({
//     email: {
//         required: [true, "Email is required"],
//         type: String,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: [true, "Password is required"],
//     },
//     firstName: {
//         type: String,
//     },
//     lastName: {
//         type: String,
//     },
//     image: {
//         type: String,
//     },
//     color: {
//         type: Number,
//     },
//     profileSetup: {
//         type: Boolean,
//         default: false,
//     },
// });

// userSchema.pre("save", async function (next) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// const User = mongoose.model("User", userSchema);
// module.exports = User;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    image: String,
    color:Number,
    profileSetup: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model("User", userSchema);

export default User;
