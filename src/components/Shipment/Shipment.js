import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser,setLoggedInUser]=useContext(userContext)
    const onSubmit = data => console.log(data);
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <form className={'ship-form'} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name:</label><br/>
        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder='Your Name' />
        {errors.name && <span className={'error'}>This field is required</span>} <br/>

        <label htmlFor="email">Email:</label><br/>
        <input type="email" name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='Your Email' />
        {errors.name && <span className={'error'}>This field is required</span>} <br/>

        <label htmlFor="address">Address:</label><br/>
        <input name="address" defaultValue={loggedInUser.address} ref={register({ required: true })} placeholder='Shipping address here' />
        {errors.name && <span className={'error'}>This field is required</span>} <br/>

        <label htmlFor="phone">Phone:</label><br/>
        <input name="phone" defaultValue={loggedInUser.phone} ref={register({ required: true })} placeholder='Phone Number' />
        {errors.name && <span className={'error'}>This field is required</span>} <br/>
        
        <input type="submit" className='btn' style={{padding:'5px',fontSize:'16px'}}/>
      </form>
    );
};

export default Shipment;