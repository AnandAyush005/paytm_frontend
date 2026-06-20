import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config";

export default function Passbook(){

    const [passbook, setPassbook] = useState([]);

    useEffect(()=>{
        async function savePassbook() {
            
            try {
                
                const data = await axios.get(`${BACKEND_URL}/account/passbook`,{
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })

            setPassbook(data.data.transactions);

            } catch (error) {

                alert("Error while loading the database");
                
            }


        }

        savePassbook();
    },[])

    return <div>
        {passbook.map((m,i)=><div key={i} className="p-2 border text-4xl m-2 rounded">
            {m}
        </div>)}
    </div>
}