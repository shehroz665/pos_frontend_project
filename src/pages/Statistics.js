import React from 'react'

const Statistics = () => {
  const token = localStorage.getItem('token');
  return (
    <div className='hello'>
      hello {token}
    </div>
  )
}

export default Statistics
