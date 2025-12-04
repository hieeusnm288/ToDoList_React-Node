import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'inProgress', 'completed'],
        required: true,
        trim: true,
        default: 'pending',
    },
    completedAt: {
        type: Date,
        default: null,
    },
},
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

const Task = mongoose.model('Task', taskSchema);

export default Task;