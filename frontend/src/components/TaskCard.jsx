import React, { useState } from 'react'
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Calendar, Check, CheckSquare2, ChevronsLeftRight, Circle, SquarePen, Trash2, X } from 'lucide-react';
import { Input } from './ui/input';
import { toast } from 'sonner';
import api from '@/lib/axios';
import {
    Popover, PopoverContent,
    PopoverTrigger,
} from './ui/popover';

const TaskCard = ({ task, index, updateTasks }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const deletedTask = async () => {
        try {
            const response = await api.delete(`/tasks/${task._id}`);
            if (response) {
                toast.success('Task deleted successfully!');
                updateTasks(); // Refresh the task list after deletion
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Failed to delete task. Please try again later.');
        }
    }
    const updateTask = async () => {
        try {
            const response = await api.put(`/tasks/${task._id}`, {
                title: editedTitle,
                description: editedDescription,
            });
            if (response) {
                toast.success('Task updated successfully!');
                updateTasks(); // Refresh the task list after update
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error updating task:', error);
            toast.error('Failed to update task. Please try again later.');
        }
    }
    const updateTaskStatus = async (newStatus) => {
        try {
            const response = await api.put(`/tasks/${task._id}`, {
                status: newStatus,
                completedAt: newStatus === 'completed' ? new Date() : null
            });
            if (response) {
                toast.success('Task status updated successfully!');
                updateTasks(); // Refresh the task list after status update
            }
        } catch (error) {
            console.error('Error updating task status:', error);
            toast.error('Failed to update task status. Please try again later.');
        }
    }
    return (
        <Card className={cn("pd-4 bg-gradient-card border-0 show-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
            task.status === 'completed' && 'opacity-70'
        )}
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className='flex items-center gap-4 px-1'>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("flex-shrink-0 size-8 rounded-full transition-all duration-200",
                                task.status === 'completed' ? 'text-green-500 border-green-500 hover:bg-green-500/10 focus:ring-green-500' : task.status === 'inProgress' ? 'text-blue-500 border-blue-500 hover:bg-blue-500/10 focus:ring-blue-500' : 'text-yellow-500 border-yellow-500 hover:bg-yellow-500/10 focus:ring-yellow-500'
                            )}
                        >
                            {task.status === 'completed' ?
                                (
                                    <CheckSquare2 className='size-5' />
                                )
                                : task.status === 'inProgress' ? (
                                    <ChevronsLeftRight className='size-5' />
                                ) :
                                    (
                                        <Circle className='size-5' />
                                    )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent >
                        <div className='text-base'>Update Status</div>
                        <div className='flex flex-col gap-2 mt-2'>
                            <Button
                                variant="outline"
                                className="bg-green-500/10 text-green-500 border-green-500 hover:bg-green-500/20 focus:ring-green-500"
                                onClick={() => updateTaskStatus('completed')}
                            >
                                Completed
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-blue-500/10 text-blue-500 border-blue-500 hover:bg-blue-500/20 focus:ring-blue-500"
                                onClick={() => updateTaskStatus('inProgress')}
                            >
                                In Progress
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-yellow-500/10 text-yellow-500 border-yellow-500 hover:bg-yellow-500/20 focus:ring-yellow-500"
                                onClick={() => updateTaskStatus('pending')}
                            >
                                Pending
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
                <div className='flex-1 min-w-0'>
                    {isEditing ? (
                        <Input
                            placeholder='Edit task title...'
                            defaultValue={task.title}
                            className="flex-1 h-12 text-base border-border/50 focus:ring-2 focus:ring-offset-2 focus:ring-primary/20"
                            type="text"
                            onChange={(e) => setEditedTitle(e.target.value)}
                            value={editedTitle}
                        />
                    ) : (
                        <p className={cn("text-base transition-all duration-200",
                            task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'
                        )}>{task.title}</p>
                    )}
                    {isEditing ? (
                        <Input
                            placeholder='Edit task description...'
                            defaultValue={task.description}
                            className="flex-1 h-12 text-base border-border/50 focus:ring-2 focus:ring-offset-2 focus:ring-primary/20 mt-3"
                            type="text"
                            onChange={(e) => setEditedDescription(e.target.value)}
                            value={editedDescription}
                        />
                    ) : (
                        <p className="text-foreground">{task.description}</p>
                    )}
                    <div className='flex items-center gap-2 mt-1'>
                        <Calendar className='size-3 text-muted-foreground' />
                        <span className='text-xs text-muted-foreground'>
                            {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                        {task.status === 'completed' && (
                            <>
                                <span className='text-sm mx-1 text-muted-foreground'>•</span>
                                <Calendar className='size-3 text-muted-foreground' />
                                <span className='text-xs text-muted-foreground'>
                                    {new Date(task.completedAt).toLocaleDateString()}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? <X className='size-5' /> : <SquarePen className='size-5' />}
                    </Button>
                    {
                        isEditing ? (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
                                onClick={() => updateTask(task._id)}
                            >
                                <Check className='size-5' />
                            </Button>
                        ) :
                            (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
                                    onClick={() => deletedTask(task._id)}
                                >
                                    <Trash2 className='size-5' />
                                </Button>
                            )
                    }

                </div>
            </div>
        </Card>
    )
}

export default TaskCard