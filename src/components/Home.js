import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('auth_token')) {
            getAllusers();
        }
        else { navigate('/login'); }
    }, [])
    const user1 = [{ name: "asas", id: 1 }]
    const getAllusers = async (e) => {
        const response = await fetch('http://localhost:5000/api/getusers', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth_token'),
            }
        });

        const json = await response.json();
        if (!json.success) { toast.warn(json.message, { position: "top-right", autoClose: 3000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, }); }
        else {
            toast.success("Signed Up Successfully", { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });
            setUsers(json.userArray);
        }
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Your Contacts</h1>
                    {/* <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them.</p> */}
                </div>
                <div className="flex flex-wrap -m-2">
                    {users.map((user,index) => {
                        return (

                            <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={user.imgURL} onError={e => { e.target.onerror = null; e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" }} />
                                    <div className="flex-grow">
                                        <h2 className="text-gray-900 title-font font-medium">{user.name}</h2>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }

                </div>
            </div>
        </section>
    )
}
export default Home