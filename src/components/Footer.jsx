import React from 'react'

const Footer = () => {
  return (
    <div className="flex justify-between items-center px-2 bg-[#b2c6b6] w-full bottom-0">
      <span >Created with <svg className="inline" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"/></svg> for all the Dumb people out there , by Harshit </span>
      <a className="text-xs" href="https://lordicon.com/">Icons by Lordicon.com</a>
    </div>
  )
}

export default Footer
