import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
   
      <div   className=' flex justify-between items-center px-5 h-20'>
        <div className="logo font-bold text-2xl"> 
          <span className='text-green-600'>&lt;</span>
          Pass
          <span className='text-green-600'>OP/&gt;</span>
          
          </div>

       <div>
         <a href="https://github.com/" target='_blank'>
        <button className='bg-green-300 border border-white'>
         
        <img    className='invert'   src="Icons/icons8-github-50.png" alt="github" />
        Github
        </button>
        </a>
       </div>
      </div>
      </nav>
  
  )
}

export default Navbar
