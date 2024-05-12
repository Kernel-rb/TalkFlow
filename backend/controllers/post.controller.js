import Notification from "../models/notification.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let { image } = req.body;
        const userId = req.user._id.toString();
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (!text && !image) return res.status(400).json({ error: "Post must have text or image" });
        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(image);
            image = uploadedResponse.secure_url;
        }
        const newPost = new Post({
            user: userId,
            text,
            image,
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.log("Error in createPost: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
 };
export const deletePost = async (req, res) => { };
export const commentOnPost = async (req, res) => { };
export const likeUnlikePost = async (req, res) => { };
export const getAllPosts = async (req, res) => { };
export const getLikedPosts = async (req, res) => { };
export const getFollowingPosts = async (req, res) => { };
export const getUserPosts = async (req, res) => { };