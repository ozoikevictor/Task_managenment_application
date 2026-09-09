const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
const registerUser = async(req, res) => {
    try{
        const { name, email, password } = req.body;

        // validate fields
        if(!name || !email || !password){
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully",

            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
         });
    }catch(err){
        res.status(500).json({ message: "Server error" });
    }
}

// Login a user
const loginUser = async(req, res) => {
    try{
        const { email, password } = req.body;
        // Find Users
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    }catch(err){
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    registerUser,
    loginUser
}