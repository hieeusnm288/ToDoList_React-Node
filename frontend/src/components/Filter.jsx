import React from 'react'
import { Badge } from './ui/badge'
import { FilterOptions } from '@/lib/data'
import { Button } from './ui/button'
import { FilterIcon } from 'lucide-react'

const Filter = ({ completedTasksCount = 0 , inProgressTasksCount = 0, pendingTasksCount = 0, filter = 'all', setFilter }) => {
  return (
    <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
        <div className='flex gap-3'>
            <Badge
                variant="secondary"
                className="bg-white/50 text-slate-800 border-0 px-3 py-1.5 cursor-default"
            >
            {inProgressTasksCount} {FilterOptions.inProgress} 
            </Badge>
            <Badge
                variant="default"
                className="bg-green-500/50 text-slate-800 border-0 px-3 py-1.5 cursor-default"
            >
            {completedTasksCount} {FilterOptions.completed} 
            </Badge>
            <Badge
                variant="warning"
                className="bg-yellow-500/50 text-slate-800 border-0 px-3 py-1.5 cursor-default"
            >
            {pendingTasksCount} {FilterOptions.pending} 
            </Badge>
        </div>
        <div className='flex flex-col gap-2 sm:flex-row'>
            {
                Object.values(FilterOptions).map((option) => (
                    <Button 
                    key={option}
                    variant={filter === option ? "default" : "ghost"}
                    size="sm"
                    className="capitalize"
                    onClick={() => setFilter(option)}
                    >
                    <FilterIcon className='size-4' />
                    {/* {FilterOptions[option]} */}
                    {option}
                    </Button>
                ))
            }
        </div>
    </div>
  )
}

export default Filter