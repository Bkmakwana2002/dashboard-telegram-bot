import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [cityInput, setCityInput] = useState('');
  const [apiCountInput, setApiCountInput] = useState('');

  // Function to fetch user data
  const fetchData = async () => {
    try {
      // Your data
      const token = localStorage.getItem('auth');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      // Send a GET request to the API
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-users`, { headers });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if(error.message === "Request failed with status code 403"){
        alert("Unauthorized")
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateClick = (userId, city, apiCount) => {
    setSelectedUserId(userId);
    setCityInput(city);
    setApiCountInput(apiCount);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('auth');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/update`,
        {
          userId: selectedUserId,
          city: cityInput,
          apiCallCount: apiCountInput,
        },
        { headers }
      );

    console.log(cityInput,selectedUserId,apiCountInput)

      fetchData();

      setShowModal(false);
    } catch (error) {
      console.error('Error updating user data:', error);
      if(error.message === "Request failed with status code 403"){
        alert("Unauthorized")
      }
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem('auth');
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/delete?id=${userId}`, { headers });

      setData(response.data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  return (
    <div className="text-white">
      {data.map((item, index) => (
        <div key={index} className="max-w-sm m-3 bg-white rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-black text-xl mb-2">{item.userId}</div>
            <p className="text-gray-700 text-base">
              <span className="font-bold">City:</span> {item.city}
            </p>
            <p className="text-gray-700 text-base">
              <span className="font-bold">API count:</span> {item.apiCallCount}
            </p>
          </div>
          <button
            onClick={() => handleDelete(item.userId)}
            className="text-black p-2 hover:bg-red-400 bg-red-300 m-2 rounded-md"
          >
            Delete
          </button>
          <button
            onClick={() => handleUpdateClick(item.userId, item.city, item.apiCallCount)}
            className="text-black p-2 hover:bg-yellow-400 bg-yellow-300 m-2 rounded-md"
          >
            Update
          </button>
        </div>
      ))}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal bg-gray-300 p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-4">Update User Data</h2>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
              City:
            </label>
            <input
              type="text"
              id="city"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="apiCount" className="block text-gray-700 font-bold mb-2">
              API Count:
            </label>
            <input
              type="text"
              id="apiCount"
              value={apiCountInput}
              onChange={(e) => setApiCountInput(e.target.value)}
              className="w-full px-3 text-black py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleCloseModal}
              className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Update
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Users;
