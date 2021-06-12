import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { UserContext } from '../../App';
import loader from '../../images/loader.gif';
import remove from '../../images/delete.png';
import './Orders.css'

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    console.log(orders);

    useEffect(() => {
        fetch('http://localhost:5000/orders?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [])

    const handleOrderCancel = (event, id) => {
        fetch(`http://localhost:5000/cancelOrder/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    event.target.parentNode.style.display = "none"
                }
            })
        window.alert("Your Order Cancelled")

    }

    return (
        <div className="container">
            <div className="row">
                {
                    orders.length ? orders.map(order =>
                        <div className="col-md-6">
                            <div className="single-order-box">
                                <img src={order.imageURL} alt="" />
                                <div className="content">
                                    <h5><span>Name</span>: {order.name}</h5>
                                    <p><span>Email</span>: {order.email}</p>
                                    <p><span>Date</span>: {order.date}</p>
                                    <p><span>Book Name</span>: {order.bookName}</p>
                                    <p><span>Author Name</span>: {order.authorName}</p>
                                    <p><span>Price</span>: ${order.price}</p>
                                </div>
                                <img onClick={(event) => handleOrderCancel(event, order._id)} className="removeBtn" src={remove} alt="" />
                            </div>
                        </div>
                    )
                        :
                        <img src={loader} style={{display:'block',margin: 'auto'}} height="300px" alt="" />
                }
            </div>
        </div>
    );
};

export default Orders;