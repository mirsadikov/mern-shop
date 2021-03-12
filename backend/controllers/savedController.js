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

const deleteSavedItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  const idForDelete = req.body.idForDelete;
  // console.log(idForDelete);

  if (user) {
    user.saved = user.saved.filter((x) => x !== idForDelete);
    // console.log(user.saved);

    const updatedUser = await user.save();

    res.json({
      status: "success",
      saved: updatedUser.saved,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

const addSavedItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  const idForAdd = req.body.idForAdd;
  console.log(idForAdd);

  if (user) {
    const existItem = user.saved.find((x) => x === idForAdd);
    // console.log(!existItem);
    // if (existItem) {
    //   user.saved = user.saved.map((x) =>
    //     x.productId === idForAdd ? idForAdd : x
    //   );
    // } else {
    //   user.saved = [...user.saved, idForAdd];
    // }
    if (!existItem) {
      user.saved.push(idForAdd);
    }
    const updatedUser = await user.save();

    res.json({
      status: "success",
      saved: updatedUser.saved,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export { getSavedProducts, deleteSavedItem, addSavedItem };
