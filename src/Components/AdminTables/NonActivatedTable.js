import React from "react";
import AdminTable from "./AdminTable";

function NonActivatedTable() {
  const users = [
    { name: "User1", email: "test1@gmail.com" },
    { name: "User2", email: "test2@gmail.com" },
    { name: "User3", email: "test3@gmail.com" },
    { name: "User4", email: "test4@gmail.com" },
    { name: "User5", email: "test5@gmail.com" },
    { name: "User6", email: "test6@gmail.com" },
    { name: "User7", email: "test7@gmail.com" },
    { name: "User8", email: "test8@gmail.com" },
  ];

  return (
    <AdminTable
      columns={["Name", "Email", "Actions"]}
      rows={users.map((u) => [
        u.name,
        u.email,
        <div>
          <button className="border-2 border-red-500 text-red-500 hover:bg-red-50 hover:shadow-inner font-bold py-2 px-4 rounded-lg uppercase">
            Decline
          </button>
          <button className="bg-success hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg uppercase ml-6">
            Approve
          </button>
        </div>,
      ])}
    />
  );
}

export default NonActivatedTable;
