import { Icon } from "./Header";

export default function UserCard({
  user,
  onTransfer
}: any) {
  return (
    <div className="flex items-center justify-between p-4 mt-2 border rounded">
      <div className="flex">
        <Icon name={user.firstName || "U"} />
        <h2 className="text-2xl font-semibold ml-4">
          {user.firstName.toUpperCase()} {user.lastName.toUpperCase()}
        </h2>
      </div>

      <button
        onClick={() => onTransfer(user.username)}
        className="p-2 bg-black rounded text-white font-semibold cursor-pointer"
      >
        Send Money
      </button>
    </div>
  );
}