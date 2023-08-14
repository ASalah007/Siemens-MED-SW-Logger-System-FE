import React from "react";

function NonActivatedTable() {
  const users = [
    { name: "Ahmed Gamal" },
    { name: "Rana Mohamed" },
    { name: "Ahmed Ashraf" },
    { name: "Rana" },
    { name: "Ahmed" },
    { name: "Rana" },
    { name: "Ahmed" },
    { name: "Rana" },
    { name: "Ahmed" },
    { name: "Rana" },
    { name: "Ahmed" },
    { name: "Rana" },
    { name: "Ahmed" },
    { name: "Rana" },
    { name: "Ahmed" },
    { name: "Rana" },
    { name: "Ahmed" },
    { name: "Rana" },
  ];

  return (
    <div className="w-full bg-white flex ">
      <table className="w-full">
        <thead>
          <tr>
            <th className="font-poppins font-semibold text-3xl">Users</th>
            <th className="font-poppins font-semibold text-3xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b ">
              <td className="text-center font-poppins font-medium text-xl py-6 capitalize">
                {user.name}
              </td>
              <td className="text-center">
                <button 
                className="border-2 border-red-500 text-red-500 hover:bg-red-50 hover:shadow-inner font-bold py-2 px-4 rounded-lg uppercase">
                  Decline
                </button>
                <button
                className="bg-success hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-lg uppercase ml-6">
                Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NonActivatedTable;
