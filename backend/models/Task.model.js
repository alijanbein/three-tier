const { default: mongoose } = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {type:String, require: true},
    due_date: {type:String, require: true},
    amount: {type:Number, require: true},
    responsible:{type:mongoose.Types.ObjectId}
});

const Task = mongoose.model("Task",TaskSchema);

module.exports = Task

