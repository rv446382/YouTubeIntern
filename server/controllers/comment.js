import { createError } from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";
import mongoose from "mongoose";

export const addComment = async (req, res) => {
  const { videoId } = req.params
  const { text, userId, location } = req.body;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send({
      success: false,
      message: 'Invalid userId format.',
    });
  }
  try {
    const newComment = new Comment({ videoId: videoId, desc: text, userId, location });
    const savedComment = await newComment.save();
    res.status(200).send(savedComment);
  } catch (err) {

    res.send({
      succuss: false,
      message: err.message
    })
  }
};



export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(res.params.id);
    const video = await Video.findById(res.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      return next(createError(403, "You can delete ony your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};
