import React from 'react'
import TaskCard from './TaskCard';
import TaskEntry from './TaskEntry';

const TaskList = ({fillterTasks, fillter, updateTasks}) => {

  return (
    <div>
      {fillterTasks?.length === 0 ? (
        <TaskEntry filter={fillter} />
      ) : (
        <div className='space-y-3'>
          {fillterTasks?.map((task, index  ) => (
            <TaskCard key={task._id ?? index} task={task} index={index} updateTasks={updateTasks} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList