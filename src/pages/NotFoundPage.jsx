import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='flex flex-col gap-4 justify-center items-center w-screen h-screen'>
      <h1 className='text-6xl font-semibold'>Page Not Found</h1>
      <Link to="/">Back to home</Link>
    </div>
  )
}

export default NotFoundPage
