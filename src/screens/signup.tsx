import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";


export default function Signup(){

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(false)

    async function handleSubmit(){
    
        try {

            let result = await axios.post(`http://localhost:8080/api/v1/user/signup`, {
                username : name,
                firstName,
                lastName,
                email,
                password
            })

            alert("You are signed up, now go to login");

            navigate('/signin');

            
        } catch (error : any) {
            console.log(error.response?.data || error.message);
            alert(error.response?.data?.message || "Something went wrong");
            setSubmit(false);
        }
}

    return <div className=" bg-gray-300 min-h-screen flex justify-center items-center" > 
        
       <form className="max-w-full lg:w-2xs bg-white p-4 rounded-2xl m-2"> 

            <div className="p-2 mb-2">
                <h1 className=" font-bold text-3xl text-center mb-2">Sign Up</h1>
                <p className="text-center text-wrap">Enter the information to create the account</p>
            </div>

            <div className="flex flex-col mb-1" >
                <label htmlFor="username">Username</label>
                <input type="text" minLength={3} maxLength={30} required placeholder="larryeliison" value={name} onChange={(e)=> setName(e.target.value)} className="p-1 text-gray-700 border-2 rounded border-black-400"/>
                {name.length < 3 && <p className="text-end text-red-600 text-xs">username must be greater than 3 letter</p>}
            </div>

            <div className="flex flex-col  mb-1" >
                <label htmlFor="firstname">First Name</label>
                <input type="text" minLength={3} maxLength={30} required placeholder="John" value={firstName} onChange={(e)=> setFirstName(e.target.value)} className="p-1 text-gray-700 border-2 rounded border-black-400"/>
                {firstName.length < 3 && <p className="text-end text-red-600 text-xs">First Name must be greater than 3 letter</p>}
            </div>

            <div className="flex flex-col  mb-1" >
                <label htmlFor="lastname">Last Name</label>
                <input type="text" minLength={3} maxLength={30} required placeholder="Doe" value={lastName} onChange={(e)=> setLastName(e.target.value)} className="p-1 text-gray-700 border-2 rounded border-black-400"/>
                {lastName.length < 3 && <p className="text-end text-red-600 text-xs">Last Name must be greater than 3 letter</p>}
            </div>

            <div className="flex flex-col  mb-1" >
                <label htmlFor="lastname">Email</label>
                <input type="email" minLength={3} maxLength={30} required placeholder="abc@gmail.com" value={email} onChange={(e)=> setEmail(e.target.value)} className="p-1 text-gray-700 border-2 rounded border-black-400"/>
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
            firstName.length < 3 ||
            lastName.length < 3 ||
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

            <p className="text-center text-sm ">Already have an account? <Link to="/signin"  className="text-blue-400">Sign in </Link></p>
       </form>

    </div>
}