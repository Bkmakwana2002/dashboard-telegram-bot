import axios from 'axios'
import React, { useEffect, useState } from 'react'

const API = () => {

    const [key, setKey] = useState("")
    const [host, setHost] = useState("")
    const [prevKey, setPrevKey] = useState("")
    const [selectedOption, setSelectedOption] = useState('30 2 * * *');


    const fetchData = async () => {
        try {
            const token = localStorage.getItem('auth');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-api`, { headers });
            const api = response.data[0]
            setPrevKey(api.RapidAPI_Key)
            setHost(api.RapidAPI_Host)
            setKey(api.RapidAPI_Key)

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

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('auth');
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            const data  = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/api-update`,
                {
                    key: key,
                    host: host,
                    prevKey: prevKey,
                    time : selectedOption
                },
                { headers }
            );

            console.log(data)
            alert("updated")
            fetchData();
        } catch (error) {
            console.error('Error updating user data:', error);
            if(error.message === "Request failed with status code 403"){
                alert("Unauthorized")
              }
        }
    };

    return (
        <div className='mt-10'>
            <label htmlFor="city" className="block text-gray-100 font-bold mb-2">
                Key:
            </label>
            <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full text-black px-3 py-2 mb-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <label htmlFor="city" className="block text-gray-100 font-bold mb-2">
                Host:
            </label>
            <input
                type="text"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                className="w-full mb-4 text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            {/* <div className="mt-2 mb-4">
                <label htmlFor="options" className="block text-gray-100 font-bold mb-2">
                    Select an option for setting timmer for daily updates of bot:
                </label>
                <select
                    id="options"
                    className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="30 2 * * *">8:00 AM IST</option>
                    <option value="30 3 * * *">9:00 AM IST</option>
                    <option value="30 4 * * *">10:00 AM IST</option>
                    <option value="30 5 * * *">11:00 AM IST</option>
                    <option value="30 6 * * *">12:00 PM IST</option>
                </select>
            </div> */}
             <div className="mt-2 mb-4">
                <label htmlFor="options" className="block text-gray-100 font-bold mb-2">
                    Select an option for setting timer for daily updates of the bot:
                </label>
                <select
                    id="options"
                    className="w-full text-black px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="30 2 * * *">8:00 AM IST</option>
                    <option value="30 3 * * *">9:00 AM IST</option>
                    <option value="30 4 * * *">10:00 AM IST</option>
                    <option value="30 5 * * *">11:00 AM IST</option>
                    <option value="30 6 * * *">12:00 PM IST</option>
                </select>
            </div>
            <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
                Update
            </button>
        </div>
    )
}

export default API