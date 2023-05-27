import React, { useContext, useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const Services = () => {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
  const [currentCard, setCurrentCard] = useState(null);
    const [seriesData, setSeriesData] = useState([]);
    const {user} = useContext(AuthContext)
    const form = useRef();
// console.log(seriesData);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo'
          );
          
          if (response.ok) {
            const json = await response.json();
            const data = json['Time Series (5min)'];
            const seriesDataArray = Object.entries(data);
          setSeriesData(seriesDataArray)
          } else {
            throw new Error('Error fetching data');
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);

    const handleShare = (key, value) => {
        setCurrentCard({ key, value });
        setShowModal(true);
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
        setCurrentCard(null);
        setEmail('');
      };
    
      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
    
      const handleShareSubmit = (event) => {
        event.preventDefault();
        // Implement your share functionality here
        const data ={
          email: user.email,
          currentCard
        }
        console.log('Share:', form.current);

        emailjs.sendForm('service_76e3fbm', 'template_6fce83ut', form.current, '8orPc_ggqysHnEuQV')
        
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      fetch('http://localhost:5000/orders',{
          method: 'POST',
          headers:{
              'content-type': 'application/json',
              
          },
          body: JSON.stringify(data)
      })
      .then(res => res.json())
            .then(result => {
                console.log(result);
                // toast.success(`${data.name} is added successfully`)
                // navigate('/dashboard/manageDoctor')
            })

        handleCloseModal();
      };

    return (
        <div className="container mx-auto p-4">
          <h1 className='font-extrabold text-5xl my-3 text-center'>IBM Stock Market Price</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {seriesData.map(([key, value]) => (
            <div key={key} className="card bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">{key}</h3>
              <p className="text-gray-500">Open: {value['1. open']}</p>
              <p className="text-gray-500">High: {value['2. high']}</p>
              <p className="text-gray-500">Low: {value['3. low']}</p>
              <p className="text-gray-500">Close: {value['4. close']}</p>
              <p className="text-gray-500">Volume: {value['5. volume']}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={() => handleShare(key, value)}
              >
                Share
              </button>
            </div>
          ))}
        </div>
        
        {showModal && currentCard && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 grid justify-center">
              <h2 className="text-lg font-semibold mb-4">Share Your Boss Email</h2>
              <div>
              <h3 className="text-lg font-semibold mb-2">{currentCard.key}</h3>
                
              <form ref={form} onSubmit={handleShareSubmit}>
      <label className="label">Your Name</label>
      <input type="text" name="user_name" className="input input-bordered input-primary mb-2 " placeholder='Your Name' required  />
      <br></br>
      <label className="label">Your Boss Email</label>
      <input type="email" name="user_email" className="input input-bordered input-primary  " placeholder='Your Boss Email' required /> <br></br>
      <label className="label">Stock Price</label>
      <textarea name="message" defaultValue={JSON.stringify(currentCard)}   className="textarea textarea-primary" /><br></br>
      <button
                    type="button"
                    className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Share
                  </button>
    </form>
                
              </div>
              
              
            </div>
          </div>
        )}
      </div>
    );
};

export default Services;