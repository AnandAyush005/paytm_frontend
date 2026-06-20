import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../../config";

export default function AddBalanceModal({
  onClose, addBalance
}: {
  onClose: () => void;
  addBalance: (updater: (prev: number) => number) => void;
}) {
  const [amount, setAmount] = useState("");

  async function handleAddBalance() { // add logic
    try{

      const add = await axios.post(`${BACKEND_URL}/account/addBalance`,{
        amount : Number(amount)
      },{
        headers : {
          token : localStorage.getItem('token')
        }
      })

      alert(`Added ₹${amount}`);
      addBalance((prev: number) => prev + Number(amount));
      onClose();
    }
    catch(e){

      alert("Something went wrong")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h1 className="text-2xl font-bold mb-4">Add Balance</h1>

        <input
          type="number"
          className="w-full border p-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleAddBalance}
            className="bg-black text-white p-2 rounded cursor-pointer"
          >
            Add
          </button>

          <button
            onClick={onClose}
            className="bg-red-500 text-white p-2 rounded cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}