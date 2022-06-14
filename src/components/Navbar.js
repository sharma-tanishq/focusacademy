import React, { useState } from 'react'
import { Link, useLocation} from 'react-router-dom'
import { toast } from 'react-toastify';


function Navbar() {
    const [mobileMenu, setStateMobileMenu] = useState("hidden")
    let location = useLocation();


    const handleMobileMenu = () => {
        if (mobileMenu === "hidden") setStateMobileMenu("")
        else if (mobileMenu === "") setStateMobileMenu("hidden")
    }

    const handleLogOut=()=>{
        localStorage.removeItem('auth_token');
        toast.success("Logged out", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });
    }

    return (
        <div className=' bg-white'>
            <ul className='flex justify-between'>
                {/* LOGO */}
                <div className='flex justify-end text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-900'>
                    <Link to="/home"> <h1 className='p-3 font-extrabold'>FocusAcademy</h1></Link>
                </div>
                {/* Right aligneed Navbar */}
                <div className='hidden md:flex'>
                    <Link to="/home"><li className={`mx-3 p-3 font-bold flex ${location.pathname === "/home" ? "text-indigo-500" : "text-black"}`}>Home</li></Link>

                    <Link to="/about"><li className={`mx-3 p-3 font-bold flex  ${location.pathname === "/about" ? "text-indigo-500" : "text-black"}`}>About</li></Link>
                    {

                        !localStorage.getItem('auth_token') ? 
                        <>
                            <Link to="/login"><li className={`mx-3 p-3 font-bold flex  ${location.pathname === "/login" ? "text-indigo-500" : "text-black"}`}>LogIn</li></Link>
                            <div className={`mx-3 px-3  my-auto py-2 font-bold flex text-white  bg-indigo-500 rounded-md `}>
                                <Link to="/signup" className=' hover:text-neutral-100'><li >SignUp</li></Link>
                            </div>
                        </> :
                        <>
                            <div className={`mx-3 px-3  my-auto py-2 font-bold flex  bg-indigo-500 rounded-md text-white`}>
                                <Link onClick={handleLogOut} to="/login" className=' hover:text-neutral-100'><li >LogOut</li></Link>
                            </div>
                        </>
                    }
                </div>

                {/* mobile device navbar */}
                <div className='md:hidden '>
                    {/* hamburger menu button */}
                    <div className='items-center mx-3 px-3  my-auto py-2 font-bold flex  bg-indigo-500 rounded-md'>
                        <button onClick={handleMobileMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

            </ul>
            {/* Mobile Menu */}

            <div className={`${mobileMenu}`}>
                <ul>
                    <Link to="/home"><li className={`mx-3 p-3 font-bold flex ${location.pathname === "/home" ? "text-indigo-500" : "text-black"}`}>Home</li></Link>

                    <Link to="/about"><li className={`mx-3 p-3 font-bold flex  ${location.pathname === "/about" ? "text-indigo-500" : "text-black"}`}>About</li></Link>
                    
                    {!localStorage.getItem('auth_token')?<>
                    <Link to="/login"><li className={`mx-3 p-3 font-bold flex  ${location.pathname === "/login" ? "text-indigo-500" : "text-black"}`}>LogIn</li></Link>
                    <Link to="/signup"><li className={`mx-3 p-3 font-bold flex  ${location.pathname === "/signup" ? "text-indigo-500" : "text-black"}`}>SignUp</li></Link>
                    </>:
                    <>
                    <Link to="/login" onClick={handleLogOut}><li className={`mx-3 p-3 font-bold flex  ${location.pathname === "/signup" ? "text-indigo-500" : "text-black"}`}>LogOut</li></Link>
                    </>}
                </ul>
            </div>

        </div>
    )
}

export default Navbar
