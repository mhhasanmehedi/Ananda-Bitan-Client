import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import './Checkout.css'

const Checkout = () => {
    const [checkout, setCheckout] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const { id } = useParams();
    console.log(checkout);

    useEffect(() => {
        fetch(`https://mighty-depths-74562.herokuapp.com/book/${id}`)
            .then(res => res.json())
            .then(data => setCheckout(data))
    }, [id])


    const handleCheckOut = () => {
        const date = (new Date().toDateString('dd/mm/yyyy'))
        const newOrder = { ...loggedInUser, ...checkout, date }
        delete newOrder._id
        fetch('https://mighty-depths-74562.herokuapp.com/checkout', {
            method: "POST",
            headers: {
                'Content-Type': "Application/json"
            },
            body: JSON.stringify(newOrder)
        })
            .then(res => res.json)
            .then(data => {
                console.log(data);
            })
        window.alert("Your Order Successfully")
    }

    return (
        <div className="checkout shadow">
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Book Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{checkout.bookName}</td>
                        <td>1</td>
                        <td>${checkout.price}</td>
                    </tr>
                </tbody>
            </table>
            <button className="float-right btn btn-info" onClick={handleCheckOut}>Checkout</button>
        </div>
    );
};

export default Checkout;