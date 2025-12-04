import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center bg-slate-100'>
        <img src='404.jpg' alt="404 Not Found" className='max-w-full mb-6 w-96'/>
        <h1 className='text-4xl font-bold mb-4'>404 - Page Not Found</h1>
        <p className='text-lg mb-8'>Sorry, the page you are looking for does not exist.</p>
        <a href='/' className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>Go to Home</a>
    </div>
  )
}

export default NotFound