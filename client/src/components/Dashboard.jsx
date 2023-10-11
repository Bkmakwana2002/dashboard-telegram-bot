import React from 'react';
import Users from './Users';
import { useState } from 'react';
import API from './API';

const Dashboard = () => {
  const [select, setSelect] = useState("Users");

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900">
      <aside className="md:w-64 bg-blue-300 text-black p-6">
        <div className="text-4xl font-semibold mb-4">Dashboard</div>
        <ul>
          <li className="mb-2 cursor-pointer">
            <p
              onClick={() => setSelect("Users")}
              className={`block text-xl hover:text-white py-2 px-4 ${
                select === "Users" ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
              }`}
            >
              Users Settings
            </p>
          </li>
          <li className="mb-2 cursor-pointer">
            <p
              onClick={() => setSelect("Bot Settings")}
              className={`block text-xl hover:text-white py-2 px-4 ${
                select === "Bot Settings" ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'
              }`}
            >
              Bot Settings
            </p>
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-6">
        {select === "Users" ? <Users /> : <API />}
      </main>
    </div>
  );
};

export default Dashboard;
