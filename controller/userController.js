const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("All the fields are required")
    }

    const isExisingUser = await User.findOne({email})
    if (isExisingUser) {
        res.status(400)
        throw new Error("User already registered")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)
    const newUser = await User.create({
        email,
        password: hashedPassword
    })
    if (newUser) {
        res.status(201).json({_id: newUser.id, email: newUser.email})
    } else {
        res.status(400)
        throw new Error("User data is not valid")
    }

})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    const userExist = await User.findOne({email})
    if (!userExist) {
        res.status(400)
        throw new Error("User doesnt exist")
    }
    if (userExist && bcrypt.compare(userExist.password, password)) {
        const accessToken = jwt.sign({
                user: {
                    email: userExist.email,
                    id: userExist.id
                }
            }, process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "15m"}
        )
        res.status(200).json({accessToken})
    } else {
        res.status(400)
        throw new Error("User doesnt exist")
    }

    res.json({message: "Login user"})
})

const currentUser = asyncHandler((req, res) => {
    res.json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}
