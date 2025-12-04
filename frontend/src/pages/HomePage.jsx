import AddTask from '@/components/AddTask'
import DateTime from '@/components/DateTime'
import Filter from '@/components/Filter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import PaginationTask from '@/components/PaginationTask'
import TaskList from '@/components/TaskList'
import React, { use, useEffect, useState } from 'react'
import { toast } from 'sonner'
import api from '@/lib/axios'
import { taskPerPage } from '@/lib/data'

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]); // State to hold tasks
  const [activeCount, setActiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [dateQuery, setDateQuery] = useState('today');
  const [page, setPage] = useState(1);
  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks?filter=${dateQuery}`);
      const data = response.data;
      setTaskBuffer(data.tasks); // Update state with fetched tasks
      setActiveCount(data.activeCount);
      setCompletedCount(data.completedCount);
      setPendingCount(data.pendingCount);
      
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to fetch tasks. Please try again later.');
    }
  };
  const fillterTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case 'In-Progress':
        return task.status === 'inProgress';
      case 'Completed':
        return task.status === 'completed';
      case 'Pending':
        return task.status === 'pending';
      default:
        return true; // 'all' case
    }
  });

  const visibleTasks = fillterTasks.slice((page - 1) * taskPerPage, page * taskPerPage);

  if (visibleTasks.length === 0 && page > 1) {
    handlePageChange()
  }

  const totalPages = Math.ceil(fillterTasks.length / taskPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
}
  const handlNextPage = () => {
    if (page < totalPages) {
      setPage((page) => page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]); // Fetch tasks on component mount

  useEffect(() => {
    setPage(1); // Reset to first page when filter changes
  }, [filter, dateQuery]);

  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Pink Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #ec4899 100%)
      `,
          backgroundSize: "100% 100%",
        }}
      />
      <div className='container pt-8 mx-auto relative z-10'>
        <div className='w-full max-w-2xl mx-auto space-y-6'>
          <Header />
          <AddTask handleNewTaskAdded={fetchTasks} />
          <Filter completedTasksCount={completedCount} inProgressTasksCount={activeCount} pendingTasksCount={pendingCount} 
            filter={filter}
            setFilter={setFilter}
          />
          <TaskList fillterTasks={visibleTasks} fillter={filter} updateTasks={fetchTasks} />
          <div className='flex flex-col justify-between sm:flex-row'>
          <PaginationTask page={page} totalPages={totalPages} handlNextPage={handlNextPage} handlePreviousPage={handlePreviousPage} handlePageChange={handlePageChange} />
          <DateTime dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>
          <Footer completedTasksCount={completedCount} activeTasksCount={activeCount} pendingTasksCount={pendingCount} />
        </div>
      </div>
    </div>
  )
}

export default HomePage