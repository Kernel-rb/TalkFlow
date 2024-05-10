import User from '../models/user.model.js';

export const getUserProfile = async (req, res) => {
    const { username } = req.parms;
    try {
        const user = await User.findOne({ username }).select("-password");
        if (!user) return res.status(404).json({ message: "User not found." });
        res.status(200).json(user);
    } catch (error) {
        console.log("error in getUserProfile: ", error);
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const getSuggestedUsers = async (req, res) => {
}

export const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const usertoModify = await User.findById(id);
        const curretUser = await User.findById(req.user._id);
        if (!usertoModify || !curretUser) return res.status(404).json({ message: "User not found." });
        if (id === req.user._id) return res.status(400).json({ message: "You can't follow/unfollow yourself." });
        const isFollowing = curretUser.followers.includes(id);
        if (isFollowing) {
            // unfollow
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
            res.status(200).json({ message: "User unfollowed." });
        } else {
            // flollow
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
            // send notification 
            res.status(200).json({ message: "User followed." });
        }
    } catch (error) {
        console.log("error in getSuggestedUsers: ", error);
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const updateUser = async (req, res) => {
}

