import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-[#b75a48] text-white items-center px-5 py-2">
        <div className="text-xl text-[#e8ecd6]"><span title='Dumb People' className="text-[#b2c6b6] font-extrabold">DP</span>App</div>
        <button className="flex items-center gap-2 ">
            <img className="w-10" src="/icons/github-mark.svg" alt="." />
            <span>Github</span>
        </button>
    </nav>
  )
}

export default Navbar
