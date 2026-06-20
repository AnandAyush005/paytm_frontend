import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import UserCard from "./userCard.tsx";
import AddBalanceModal from "./addBalance.tsx";
import TransferModal from "./TransferModal.tsx";

interface UserInterface {
  username: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export default function DashboardBody() {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [transferUserId, setTransferUserId] = useState<string | null>(null);
  const [addBalanceOpen, setAddBalanceOpen] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function filterUser() {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/user/bulk?filter=${filter}`,
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );

        setUsers(response.data.users);
      } catch (e) {
        console.log(e);
      }
    }

    filterUser();
  }, [filter]);

  useEffect(()=>{

    async function getBalance() {
      
      try{

        let data = await axios.get(`${BACKEND_URL}/account/balance`,{
          headers : {
            token : localStorage.getItem('token')
          }
        });

        let balance = Number(data.data.Balance.replace("₹", ""));
        setBalance(balance);

      }
      catch(e){
        alert("Error while fetching the balance");
        console.log(e);
      }
    }

    getBalance();
  }, [])

  return (
    <div className="flex flex-col p-4">
      <div className="text-4xl font-bold flex justify-between w-full">
        <div>Your Balance ₹{balance}</div>

        <button
          onClick={() => setAddBalanceOpen(true)}
          className="p-2 bg-black rounded text-white font-semibold cursor-pointer"
        >
          Add Balance
        </button>
      </div>

      <div className="mt-4">
        <div className="text-3xl font-semibold mb-4">Users</div>

        <input
          type="text"
          placeholder="Search User"
          className="w-full p-2 border rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="mt-4">
        {users.map((u) => (
          <UserCard
            key={u._id}
            user={u}
            onTransfer={setTransferUserId}
          />
        ))}
      </div>

      {transferUserId && (
        <TransferModal
          Balance={setBalance}
          userId={transferUserId}
          onClose={() => setTransferUserId(null)}
        />
      )}

      {addBalanceOpen && (
        <AddBalanceModal addBalance={setBalance}
          onClose={() => setAddBalanceOpen(false)}
        />
      )}
    </div>
  );
}