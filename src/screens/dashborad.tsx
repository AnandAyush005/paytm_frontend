import DashboardBody from "@/components/DashboardBody";
import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";

type UserData = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    accountDetails : {
        balance : number
    }
};

export default function Dashboard() {
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(
                    `${BACKEND_URL}/user/user-details`,
                    {
                        headers: {
                            token: localStorage.getItem("token")
                        }
                    }
                );

                setUserData(response.data);
            } catch (error: any) {
                console.log(error.response?.data || error.message);
            }
        }

        fetchUserData();
    }, []);

    return (
        <div>
            <Header name={userData?.firstName || "User"} />
            <DashboardBody />
        </div>
    );
}