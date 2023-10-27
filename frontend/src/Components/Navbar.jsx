// import React from 'react'

export default function Navbar() {
  return (
    <div>
      <nav className="shadow-md p-2 flex justify-between items-center">
        <a
          href="#"
          className="flex items-center text-black text-xl font-semibold border-[3px] border-gray-400 p-2 rounded-md"
        >
          TECHNOKART
        </a>
        <button className="bg-blue-400 text-black-500 rounded-md py-2 px-4 hover:bg-blue-100 transition border duration-300">
          Add Invoice
        </button>
      </nav>
    </div>
  );
}
