import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    text: { type: String },
    postImg: { type: String },
    reaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reaction",
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);
/*
module.exports = mongoose.models.Pust || mongoose.model("Pust", PustSchema);
*/

global.Post = global.Post || mongoose.model("Post", PostSchema);

export default global.Post;
