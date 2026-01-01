import express from "express";
import Threads from "../models/Thread.js";

const router = express.Router();

//test
router.post("/test", async (req, res) => {
  try {
    const thread = new Threads({
      threadId: "nkncki",
      titel: " Testing new Thread ",
    });

    const response = await thread.save();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error, "Failed to save in DB");
  }
});

//Get all threads
router.get("/thread", async (req, res) => {
  try {
    // first find all data then ..
    //most recent data on top
    // updatedAt: -1 descending order
    const threads = await Threads.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (error) {
    console.log("Failed to fetch Threads :", error);
    res.status(500).json(error, "Failed to fetch Threads");
  }
});

//Get any specific Chat
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Threads.findOne({ threadId });

    if (!thread) {
      res.status(404).json({ error: "Chat not found" });
    }

    res.json(thread.messages);

  } catch (error) {
    console.log("Failed to fetch specific Chat :", error);
    res.status(500).json(error, "Failed to fetch specific Chat");
  }
});

//Delete any Chat
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deleteedThread = await Threads.findOneAndDelete({ threadId });

    if (!deleteedThread) {
      res.status(404).json({ error: "Chat could not be deleted" });
    }

    res.status(200).json({success: "Chat deleted successfully"});

  } catch (error) {
    console.log("Failed to delete specific Chat :", error);
    res.status(500).json(error, "Failed to delete specific Chat");
  }
});

export default router;
