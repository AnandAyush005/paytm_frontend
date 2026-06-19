import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signin(){

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("")
    const [submit, setSubmit] = useState(false)

    async function handleSubmit() {

        try{

            const result = await axios.post(`${process.env.BACKEND_URL}/user/signin`,{
                username : name,
                password
            })

            localStorage.setItem("token", result.data.token);
            alert("User is logged in");

            navigate('/dashboard');

        }
        catch(e : any){

            console.log(e.response?.data || e?.message);
            alert(e.response?.data?.message || "Something went wrong")
            setSubmit(false);
        }
        
    }
        
    return <div className=" bg-gray-300 min-h-screen flex justify-center items-center" > 
        
       <form className="max-w-full lg:w-2xs bg-white p-4 rounded-2xl m-2"> 

            <div className="p-2 mb-2">
                <h1 className=" font-bold text-3xl text-center mb-2">Sign In</h1>
                <p className="text-center text-wrap">Enter the information to login the account</p>
            </div>

            <div className="flex flex-col mb-1" >
                <label htmlFor="username">Username</label>
                <input type="text" minLength={3} maxLength={30} required placeholder="larryeliison" value={name} onChange={(e)=> setName(e.target.value)} className="p-1 text-gray-700 border-2 rounded border-black-400"/>
                {name.length < 3 && <p className="text-end text-red-600 text-xs">username must be greater than 3 letter</p>}
            </div>

            <div className="flex flex-col  mb-1" >
                <label htmlFor="password">Password</label>
                <input type="password" minLength={3} maxLength={30} required placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} className="p-1 text-gray-700 border-2 rounded border-black-400"/>
                {password.length < 6 && <p className="text-end text-red-600 text-xs">Password must be greater than 6 letter</p>}
            </div>

            <button className={`w-full bg-neutral-900 p-2 rounded text-white mt-1 ${
            submit ? "cursor-progress" : "cursor-pointer"
        }`}

        disabled={
            name.length < 3 ||
            password.length < 6 ||
            submit
        }

        onClick={(e) => {
            e.preventDefault();
            setSubmit(true);
            handleSubmit();
        }}
        >
        {submit ? "Submitting..." : "Submit"}
        </button>

            <p className="text-center text-sm ">Don't have an account? <Link to="/signup"  className="text-blue-400">Sign Up </Link></p>
       </form>

    </div>
}