import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
    let navigate = useNavigate();
    //state to store credentials
    const [credential, setCredential] = useState({username: "", password: "" });

    //redirection 
    if(localStorage.getItem('auth_token')){return navigate('/home')}

    const changeCred = (e) => {

        setCredential({ ...credential, [e.target.id]: e.target.value })
    }

    const submit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": credential.username,
                "password": credential.password
            })
        });

        const json = await response.json();
        if (!json.success) { toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, }); }
        else {
            toast.success("Logged In Successfully", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });
            localStorage.setItem('auth_token', json.authToken);
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        }
    }




    return (
        <div>

            {/* // Login page */}
            <div className='my-52'>

                <div className="lg:w-2/6 lg:m-auto md:w-1/2 md:m-auto bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-3/4 m-auto mt-10 md:mt-0">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>

                    {/* //username */}
                    <div className="relative mb-4">
                        <label htmlFor="username" className="leading-7 text-sm text-gray-600">Username</label>
                        <input minLength="1" required={true} onChange={changeCred} type="text" id="username" value={credential.username} name="username" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    {/* //password */}
                    <div className="relative mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input minLength="1" required={true} onChange={changeCred} type="password" id="password" value={credential.password} name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <button onClick={submit} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default LoginForm
