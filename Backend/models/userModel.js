


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
