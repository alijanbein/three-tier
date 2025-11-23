const express = require("express");
const { getUserTasks, updateTask, deleteTask, addTask } = require("../controllers/user.controller");

const router = express.Router();

router.get("/get_user_tasks",getUserTasks);
router.delete("/delete_task/:task_id",deleteTask)
router.post("/add_task",addTask)
router.put("/update_task/:task_id",updateTask)
module.exports = router