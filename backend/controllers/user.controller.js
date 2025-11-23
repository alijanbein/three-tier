const Task = require("../models/Task.model");
const HttpError = require("../utils/http-error");
exports.getUserTasks = async (req, res, next) => {
  const userData = req.user;
  try {
    const tasks = await Task.find({ responsible: userData._id });

    if (tasks == null) {
      const err = new HttpError("faild to get task", 404);
      return next(err);
    }

    res.send({ tasks: tasks, status: "sucess" });
  } catch (error) {
    const err = new HttpError("somthing went wrong !", 400);
    return next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  const userData = req.user;
  try {
    const task_id = req.params.task_id;
    const task = await Task.findById(task_id);
    if (task == null) {
      const err = new HttpError("task doesn't exist !", 404);
      return next(err);
    }
    if (task.responsible != userData._id) {
      const err = new HttpError("you don't have permission!", 404);
      return next(err);
    }
    const deletedTask = await Task.findOneAndDelete({_id:task_id});
     if (deletedTask) {
      res.send({status:"sucess"})

     }
  } catch (error) {
    const err = new HttpError("somthing went wrong !", 400);
    return next(err);
  }
};

exports.addTask = async(req,res,next) =>{
  const userData = req.user

  try {
    const {title,amount,due_date} = req.body;
    const newTask = new Task();
    newTask.title = title;
    newTask.amount = amount;
    newTask.due_date = due_date;
    newTask.responsible = userData._id
    await newTask.save();
    res.send({status:"sucess",task:newTask})
  } catch (error) {
    const err = new HttpError(error.message, 400);
    return next(err);
  }
}

exports.updateTask = async (req,res,next) => {
    const userData = req.user;
  try {
    const task_id = req.params.task_id
    const {title, due_date, amount } = req.body
    const task = await Task.findById(task_id);
    if (task == null) {
      const err = new HttpError("task doesn't exist !", 404);
      return next(err);
    }
    if (task.responsible != userData._id) {
      const err = new HttpError("you don't have permission!", 404);
      return next(err);
    }

    task.title = title;
    task.due_date = due_date;
    task.amount = amount;
    await task.save()
    res.send({status:'sucess', updatedTask:task})
  } catch (error) {
    const err = new HttpError("somthing went wrong !", 400);
    return next(err);
  }
}
