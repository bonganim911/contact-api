const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email address is required"],
        unique: [true, "Email address is already taken"]
    },
    password: {
        type: String,
        required: [true, "Password address is required"],
    }
}, {
    timestamps: true
})

module.exports =  mongoose.model("User", userSchema)
