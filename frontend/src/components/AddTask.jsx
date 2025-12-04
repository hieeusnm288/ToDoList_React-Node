import React, { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import api from '@/lib/axios'

const AddTask = ({handleNewTaskAdded}) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const AddTask = async () => {
        if (newTaskTitle.trim()) {
            try {
                await api.post('/tasks', {
                    title: newTaskTitle,
                    description: newTaskDescription
                });
                toast.success('Task added successfully!');
                handleNewTaskAdded(); // Notify parent to refresh task list
            } catch (error) {
                console.error('Error adding task:', error);
                toast.error('Failed to add task. Please try again later.');
            }finally {
                setNewTaskTitle('');
            }
        }else {
            toast.error('Task title cannot be empty.');
        }
    }
    return (
        <Card className='p-6 border-0 bg-granite-card shadow-custom-lg'>
            <div className='flex flex-col gap-3'>
                <Input
                    type='text'
                    placeholder='Thêm công việc mới...'
                    className='h-12 text-base bg-slate-50 border-border/50 focus:border-primary focus:ring-0 placeholder:text-slate-400'
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                    <Input
                    type='text'
                    placeholder='Thêm mô tả công việc mới...'
                    className='h-12 text-base bg-slate-50 border-border/50 focus:border-primary focus:ring-0 placeholder:text-slate-400'
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                <Button
                    variant="default"
                    size="xl"
                    className="px-6"
                    onClick={AddTask}
                    disabled={!newTaskTitle.trim() || !newTaskDescription.trim()}
                >
                <Plus className='size-5'/>
                    Add
                </Button>
            </div>
        </Card>
    )
}


export default AddTask