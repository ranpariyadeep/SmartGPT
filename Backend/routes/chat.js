import express from "express";
import Threads from "../models/Thread.js";
import getOpenAiAPIResponse from "../utils/openai.js";

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

    res.status(200).json({ success: "Chat deleted successfully" });
  } catch (error) {
    console.log("Failed to delete specific Chat :", error);
    res.status(500).json(error, "Failed to delete specific Chat");
  }
});

//Post route for chat
// user message  send & Openai response get

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  // atleast any one from both we get from user.
  // in new Chat we get message and in old chat threadId and also message
  if (!threadId || !message) {
    res.status(400).json({ error: "missing requried fields" });
  }

  try {
    let thread = await Threads.findOne({ threadId });

    //in new chat we need to cretae threadId & othet details
    if (!thread) {
      // create a new thread in DB
      thread = new Threads({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      // for old chat exist than need only new message store in DB
      thread.messages.push({ role: "user", content: message });
    }
    //get reply from OpenAi
    const assistantReply = await getOpenAiAPIResponse(message);
    // save OpenAI reply in Thread
    thread.messages.push({ role: "assistant", content: assistantReply });
    thread.updatedAt = new Date();
    await thread.save();

    // for frontend
    res.json({ reply: assistantReply });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "something went wrong" });
  }
});

export default router;
