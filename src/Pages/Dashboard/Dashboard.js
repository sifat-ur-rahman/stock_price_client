import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const Dashboard = () => {
  const [data, setData] = useState();
    const {user} = useContext(AuthContext)
    useEffect(() => {
        fetchProduct(user?.email);
      }, [user]);
    async function fetchProduct(email) {
        const url = `https://emty-server.vercel.app/allEmail?email=${email}`;
      
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            // Process the received data
            console.log(data);
            setData(data)
            // Perform additional operations with the data
          } else {
            console.log('Error: ' + response.status);
          }
        } catch (error) {
          console.log('Error: ' + error);
        }
      }
    return (
        <div>
            <h1 className='text-center font-bold text-5xl my-3'>All Email For Boss </h1>
            <div className="overflow-x-auto">
  <table className="table w-full mb-9 px-16">
    
    <thead>
      <tr>
        <th></th>
        <th>Email</th>
        <th>Date</th>
        <th>Open</th>
        <th>Close</th>
        
      </tr>
    </thead>
    <tbody>
      
      {
        data?.map((info, i) => <tr  key={info._id} className="hover">
        <th>{i+1}</th>
        <td>{info.email}</td>
        <td>{info.currentCard.key}</td>
        <td>{info.currentCard.value['1. open']} </td>
        <td>{info.currentCard.value['4. close']} </td>
        
      </tr>)
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Dashboard;