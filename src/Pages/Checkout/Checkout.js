import React from 'react';
import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const {title, price, _id}= useLoaderData()
    const {user}=useContext(AuthContext)

    const handlePlaceOrder = event =>{
        event.preventDefault()
        const form = event.target
        const  name = `${form.firstName.value} ${form.lastName.value}`
        const email = user?.email || 'unregister'
        const message = form.message.value
        const phone = form.phone.value

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            message,
            phone
        }
        // if(phone.length > 10){
        //     alert('Phone Number Should Be 10 Characters')
        // }

        fetch('http://localhost:5000/orders',{
            method: 'post',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                alert('Order placed successfully')
                form.reset()
            }
        })
        .catch(er => console.error(er))
    }

    return (
        <div>
           <form onSubmit={handlePlaceOrder}>
            <h2 className='text-4xl'>You are about to order: {title}</h2>
            <h4 className='text-3xl'>Price: {price}</h4>
           <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-3'>
           <input name='firstName' type="text" placeholder="First Name" className="input input-bordered w-full " />
           <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered w-full " />
           <input name='phone' type="text" placeholder="Your Phone" className="input input-bordered w-full " required/>
           <input name='email' type="text" placeholder="Your email" defaultValue={user?.email} className="input input-bordered w-full " readOnly />
           
           </div>
           <textarea name='message' className="textarea textarea-primary h-24 w-full" placeholder="Your Massage" required></textarea>
           <input type="submit" value="place your order" className='btn' />
           </form>
        </div>
    );
};

export default Checkout;