import User from "../models/UserModel.js";

export const signupUser = async (req, res) => {
    try {
        const { fullName, username, password, password2, gender } = req.body;
        if (!fullName || !username || !password || !password2 || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== password2) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const profilePic = `https://avatar.iran.liara.run/username?username=${username}`;

        const newUser = new User({
            fullname: fullName,
            username,
            password,
            gender,
            profilePic,
        });
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            gender: newUser.gender
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};





export const loginUser = async (req, res) => {
    console.log("Login user");
};
export const logoutUser = async (req, res) => {
    console.log("Logout user");
};