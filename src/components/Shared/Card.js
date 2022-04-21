import React from 'react'

const Card = (props) => {
  return (
    <div className='px-3 py-3 shadow border border-solid border-gray-200'>
      <div className='flex flex-row space-x-3'>
        <div className='h-9 w-9 flex justify-center items-center bg-secondary border border-secondary rounded-full'>
          <p className='text-white'>{props.avatar}</p>
        </div>
        <div className='flex flex-col basis-11/12'>
          <p className='text-base'>{props.title}</p>
          <p className='text-sm text-gray-600'>{props.subtitle}</p>
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default Card
