import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
    try {
        const { fullName, username, email, password } = req.body;
        // full Name validation
        const fullNameRegex = /^[a-zA-Z\s]+$/;
        const existingFullName = await User.findOne({ fullName })
        if (existingFullName) return res.status(400).json({ message: "Full Name already exists." });
        if (!fullNameRegex.test(fullName)) return res.status(400).json({ message: "Full Name can only contain letters." });
        if (fullName.length < 3 || fullName.length > 30) return res.status(400).json({ message: "Full Name must be between 3 and 30 characters." });
        // username validation
        const existingUsername = await User.findOne({ username })
        if (existingUsername) return res.status(400).json({ message: "Username already exists." });
        if (username.length < 3 || username.length > 30) return res.status(400).json({ message: "Username must be between 3 and 30 characters." });
        // email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const existingEmail = await User.findOne({ email })
        if (existingEmail) return res.status(400).json({ message: "Email already exists." });
        if (!emailRegex.test(email)) return res.status(400).json({ message: "Invalid Email." });
        if (email.length < 3 || email.length > 50) return res.status(400).json({ message: "Email must be between 3 and 50 characters." });
        // password validation
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters." });
        // create new user
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword
        });
        if (newUser) {
            generateTokenanSetCookie(newUser._id, res);
            await newUser.save();
            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                email: newUser.email,
                followers: newUser.followers,
                following: newUser.following,
                profilePicture: newUser.profilePicture,
                coverImage: newUser.coverImage,
                bio: newUser.bio,
                link: newUser.link,
                token: newUser.token
            });
        } else {
            res.status(400).json({ message: "User not created." });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
}


export const register = async (req, res) => {
    res.json({
        message: "Register route works"
    });
}

export const logout = async (req, res) => {
    res.json({
        message: "Logout route works"
    });
}
