// backend/routes/taskRoutes.js
const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// CREATE task
router.post("/", async (req, res) => {
  try {
    const { title, status, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const task = new Task({
      title,
      status,
      user: userId,
      history: [{ status, changedAt: new Date() }]
    });

    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});




// READ all tasks
router.get("/", async (req, res) => {
  try {
    const DEMO_USER_ID = "69724da5470f943e59c554ec";
    const tasks = await Task.find({ user: DEMO_USER_ID });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE task
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    if (status && status !== task.status) {
      task.status = status;
      task.history.push({ status, changedAt: new Date() });
    }

    const updated = await task.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
