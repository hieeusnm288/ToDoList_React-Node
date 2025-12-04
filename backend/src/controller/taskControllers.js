import Task from "../model/Task.js";

const getAllTasks = async (req, res) => {
    const {filter = 'today'} = req.query;
    const now = new Date();
    let startDate;
    switch (filter) {
        case 'today': {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        }
        case 'week': {
            const modayDate = now.getDate() - (now.getDay() -1) - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), modayDate);
        }
        break;
        case 'month': {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        }
        case 'all':
        default:
            startDate = null;
    }
    const query = startDate ? { createdAt: { $gte: startDate } } : {};
    try {
        const result = await Task.aggregate([
            {$match: query},
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [
                        { $match: { status: "inProgress" } },
                        { $count: "count" }
                    ],
                    completedCount: [
                        { $match: { status: "completed" } },
                        { $count: "count" }
                    ],
                    pendingCount: [
                        { $match: { status: "pending" } },
                        { $count: "count" }
                    ]
                }
            }
        ])
        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0] ? result[0].activeCount[0].count : 0;
        const completedCount = result[0].completedCount[0] ? result[0].completedCount[0].count : 0;
        const pendingCount = result[0].pendingCount[0] ? result[0].pendingCount[0].count : 0;
        res.status(200).json({ tasks, activeCount, completedCount, pendingCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error system" });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const newTask = new Task({ title, description, status });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error system" });
    }
};
const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const { title, description, status, completedAt } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, { title, description, status, completedAt }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error system" });
    }
};

const deleteTask = (req, res) => {
    const { id } = req.params;
    Task.findByIdAndDelete(id)
        .then((deletedTask) => {
            if (!deletedTask) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.status(200).json({ message: "Task deleted successfully" });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Error system" });
        });
};
export { getAllTasks, createTask, updateTask, deleteTask };