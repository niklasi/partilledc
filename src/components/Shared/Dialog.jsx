
const Dialog = (props) => {
  return <div className={`bg-black/40 flex flex-col justify-center z-40 absolute top-0 left-0 w-screen h-screen ${props.open ? undefined : 'hidden'}`}>
      <div className='bg-white z-50 flex flex-col justify-between shadow-xl h-1/3 w-full px-4 py-4'>
        <h3 className='text-2xl'>{props.title}</h3>
        {props.children}
        <div className='flex flex-row justify-end'>
          {props.actions}
        </div>
      </div>
  </div>
}

export default Dialog
  
