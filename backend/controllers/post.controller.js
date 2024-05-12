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
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        if (post.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: "Unauthorized" });
        if (post.image) {
            const imageId = post.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(imageId);
        }
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Post deleted successfully" });
    }catch(error){
        console.log("Error in deletePost: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }

 };
export const commentOnPost = async (req, res) => { 
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if (!text) return res.status(400).json({ message: "Text is required" });
        
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const comment = {
            user: userId,
            text,
        }
        post.comments.push(comment);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        console.log("Error in commentOnPost: ", error);
        return res.status(500).json({ message: "Internal server error" });
    
    }
};
export const likeUnlikePost = async (req, res) => { };
export const getAllPosts = async (req, res) => { };
export const getLikedPosts = async (req, res) => { };
export const getFollowingPosts = async (req, res) => { };
export const getUserPosts = async (req, res) => { };