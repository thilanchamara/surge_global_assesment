import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../config/datauri.js";
import cloudinary from "../config/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(401).json({
        error: "something missing pleae check again",
        success: false,
      });
    }
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(401).json({
        error: "please use another email",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      email,
      password: hashPassword,
    });
    res.status(201).json({
      message: "Account creation succesfull",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        error: "Something is missing, please check!",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        error: "Incorrect email or password",
        success: false,
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // populate each post if in the posts array
    // const populatedPosts = await Promise.all(
    //     user.posts.map( async (postId) => {
    //         const post = await Post.findById(postId);
    //         if(post.author.equals(user._id)){
    //             return post;
    //         }
    //         return null;
    //     })
    // )
    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      posts: user.posts,
    };
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user,
      });
  } catch (err) {
    console.log(err);
  }
};

export const logOut = async (req, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "logout successful",
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    return res.status(200).json({
      user,
      sucess: true,
    });
  } catch {
    console.log(err);
  }
};
export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio } = req.body;
    const profilePic = req.file;
    let cloudResponse;

    if (profilePic) {
      const fileUri = getDataUri(profilePic);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "user not found",
        success: false,
      });
    }
    if (bio) user.bio = bio;
    if (profilePic) user.profilepic = cloudResponse.secure_url;
    await user.save();
    res.status(200).json({
      message: "profile update sucessfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
