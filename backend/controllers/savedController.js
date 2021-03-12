import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const getSavedProducts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (user) {
    res.json(user.saved);
  } else {
    res.status(404);
    throw new Error("Saved items not found!");
  }
});

export { getSavedProducts };
