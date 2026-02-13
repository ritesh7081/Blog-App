import React from 'react'

function Container({children}) {
  return <div className='bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 rounded-xl'>{children}</div>;
}

export default Container