import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export default function TransferModal({
  Balance,
  userId,
  onClose
}: {
  Balance : (updater: (prev: number) => number) => void;
  userId: string;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState("");

  async function handleTransfer() {
    try {
      await axios.post(
        `${BACKEND_URL}/account/transfer`,
        {
          amount: Number(amount),
          username : userId
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      );

      Balance( b => b-Number(amount));
      alert("Transfer successful");
      onClose();
    } catch (e) {
      alert("Error while transferring the amount");
      console.log(e);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h1 className="text-2xl font-bold mb-4">Send Money</h1>

        <input
          type="number"
          placeholder="Enter amount"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleTransfer}
            className="bg-black text-white p-2 rounded cursor-pointer"
          >
            Submit
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