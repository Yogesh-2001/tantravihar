import express from "express";
const router = express.Router();
import commentModel from "../models/commentModel.js";
router.post("/add-query", async (req, res) => {
  try {
    const query = await commentModel(req.body);
    await query.save();
    res.status(200).json({ message: "query added succces", query });
  } catch (error) {
    res.status(501).json({ message: "failed to add query" });
  }
});

router.get("/get-all-comments", async (req, res) => {
  try {
    const docs = await commentModel.find({}).populate("user");
    res.status(200).json(docs);
  } catch (error) {
    res.status(501).json({ message: "failed to fetch documents", error });
  }
});

router.put("/add-reply", async (req, res) => {
  try {
    commentModel
      .findByIdAndUpdate(
        { _id: req.body.question_id },
        {
          $push: {
            replies: {
              reply: req.body.reply,
              user: req.body.username,
            },
          },
        }
      )
      .then((doc) => {
        res.status(200).json({ message: "reply added success", doc });
      })
      .catch((err) => {
        res.status(501).json({ message: "error in adding reply", err });
      });
  } catch (error) {
    res.status(501).json({ message: "failed to fetch documents", error });
  }
});

router.get("/get-all-replies/:id", async (req, res) => {
  try {
    const allreplies = await commentModel.find({ _id: req.params.id });
    res.status(200).json(allreplies[0]);
  } catch (error) {
    res.status(501).json({ message: "failed to fetch replies", error });
  }
});
export default router;
