import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
        console.log(passwords)
    }, [])

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    const savePassword = () => {
        if (!form.site || !form.username || !form.password) {
            alert('All fields are required.');
            return;
        }
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        setform({ site: "", username: "", password: "" })
    }
    const deletePassword = (id) => {
        let c = confirm("Are you sure you want to delete it?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id != id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)))
            toast('Deleted Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const editPassword = (id) => {
        console.log("Editing id with password ", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id != id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id != id)))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const showPassword = () => {
        console.log("clicked")
        if (ref.current.src.includes("icons/eyecross.svg")) {
            ref.current.src = "icons/eye.svg"
            passRef.current.type = "text"
        }
        else {
            ref.current.src = "icons/eyecross.svg"
            passRef.current.type = "password"
        }
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-[#e8ecd6] bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
            <div className="flex justify-center w-full">
                <div className="text-black md:container max-w-3xl bg-[#b2c6b6] p-4 m-4 rounded-lg min-h-[81vh]">
                    <h1 className="text-lg sm:text-2xl text-center"><span title='Dumb People' className="text-[#b75a48] font-extrabold text-2xl sm:text-4xl">DP</span>App</h1>
                    <p className="text-center font-semibold text-sm sm:text-lg">Dumb People Password Manager</p>
                    <div className="flex flex-col gap-4 mt-2 items-center">
                        <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className="rounded-full border w-full border-black text-black px-3 py-1" type="text" name="site" />
                        <div className="flex md:flex-row flex-col gap-6 w-full">
                            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className="rounded-full w-full border border-black text-black p-3 py-1" type="text" name="username" />
                            <div className="relative w-full md:w-1/2">
                                <input ref={passRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className="rounded-full w-full border border-black text-black p-3 py-1" type="password" name="password" />
                                <span className="absolute top-[5px] right-[8px] cursor-pointer " onClick={showPassword} >
                                    <img ref={ref} src="icons/eyecross.svg" alt="eye" />
                                </span>
                            </div>
                        </div>
                        <button onClick={savePassword} className="flex items-center gap-1 bg-white px-4 rounded-3xl border border-black">Add Password <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon></button>
                    </div>
                    <div className="passwords">
                        <h2 className='text-base sm:text-xl font-bold py-2'>Your Passwords</h2>
                        {passwordArray.length === 0 && <div>No Passwords to show</div>}
                        {passwordArray.length != 0 &&
                            <table className="table-auto w-full overflow-hidden rounded-lg">
                                <thead className=" bg-[#e8ecd6]">
                                    <tr>
                                        <th className='py-1 text-sm sm:text-lg'>Site</th>
                                        <th className='py-1 text-sm sm:text-lg'>
                                            <span className='hidden md:block'>Username</span>
                                            <span className='block md:hidden'>User</span>
                                        </th>
                                        <th className='py-1 text-sm sm:text-lg'>
                                        <span className='hidden md:block'>Password</span>
                                            <span className='block md:hidden'>Pass</span>
                                        </th>
                                        <th className='py-1 text-sm sm:text-lg'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {passwordArray.map((item, index) => {
                                        return (<tr key={index}>
                                            <td className="text-center relative p-1 w-32">
                                                <a className='left-0 top-3 sm:text-base text-xs' href={`https:]//${item.site}`} target='_blank' >{item.site}    </a>
                                            </td>
                                            <td className="text-center p-1 w-32">
                                                <div className='flex justify-center items-center'>
                                                <span className='sm:text-base text-xs hidden md:block'>{item.username}   </span>
                                                <span className="cursor-pointer  " onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        trigger="hover"
                                                        class="md:w-6 w-4">
                                                    </lord-icon>
                                                </span>
                                                </div>
                                            </td>
                                            <td className="text-center p-1 w-32">
                                            <div className='flex justify-center items-center'>
                                                <span className='sm:text-base text-xs hidden md:block'>{item.password}   </span>
                                                <span className="cursor-pointer" onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                        trigger="hover"
                                                        class="md:w-6 w-4"
                                                       >
                                                    </lord-icon>
                                                </span>
                                                </div>
                                            </td>
                                            <td className="text-center p-1 w-32">
                                                <div className='flex justify-center items-baseline gap-2'>

                                                    <span className=' cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            class="md:w-6 w-4">
                                                        </lord-icon>
                                                    </span>
                                                    <span className=' cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/zfzufhzk.json"
                                                            trigger="hover"
                                                            class="md:w-6 w-4">
                                                        </lord-icon>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>)
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
