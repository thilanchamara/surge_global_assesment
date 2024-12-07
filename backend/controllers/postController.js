import { populate } from "dotenv";
// import cloudinary from "../config/cloudinary";
import Post from "../models/post.js";
// import User from "../models/user.js";

export const addNewPost = async (req, res) => {
  try {
    //const postImage = req.file;
    console.log("Request body:", req.body);
    const { title,content,image } = req.body;
    if(!title || !content || !image)return res.status(400).json({error:"missing something,please check again"})
    
      req.dbuser.password=undefined;
    const newpost=await Post.create({
      title,
      content,
      image,
      author:req.dbuser
    })
    
    res.json({message:"done"})
    
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate({ path: "author", select: "_id username" })
      
    return res.status(200).json({
      posts
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMyPosts=async(req,res)=>{
  try{
    const posts=await Post.find({author:req.dbuser._id}).populate({ path: "author", select: "_id username" });

    return res.status(200).json({
      posts
    });
  }catch(error){
    console.log(error);
  }
}

