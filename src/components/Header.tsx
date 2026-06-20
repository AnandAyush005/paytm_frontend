import { useNavigate } from "react-router-dom";

export default function Header(props : {name : string}){

    const navigate = useNavigate();

    function logout(){
        localStorage.setItem("token", "");
        navigate('/signin')
    }

    return <div className="p-4 flex items-center justify-between border-b border-gray-400">
        <div className="text-2xl lg:text-4xl font-semibold">Payments App</div>
        <div className="flex justify-evenly items-center">
            <button className="p-2 bg-black text-white rounded mr-4 cursor-pointer" onClick={logout}>Log Out</button>
            <p className="text-xl lg:text-2xl mr-2">Hello, {props.name}</p>
           <Icon name={props.name} />
        </div>
    </div>
}

export function Icon(props : {name : string}){
    return <span className="rounded-full bg-gray-200 w-10 h-10 text-center flex items-center justify-center text-xl lg:text-2xl">{props.name.charAt(0).toUpperCase()}</span>
}