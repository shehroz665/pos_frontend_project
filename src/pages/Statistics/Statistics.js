import React from 'react'

const Statistics = () => {
  const token = localStorage.getItem('token');
  return (
    <div className='home'>
      hello {token}
    </div>
  )
}

export default Statistics
