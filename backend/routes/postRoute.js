import express from "express"
import isAuthenticate from "../middleware/authenticate.js";
import { addNewPost, getAllPosts, getMyPosts } from "../controllers/postController.js";
const router=express.Router();


router.post('/create',isAuthenticate,addNewPost);
router.get('/get',getAllPosts);
router.get('/myposts',isAuthenticate,getMyPosts);


export default router;