import React, { useEffect } from 'react';
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './ManageBooks.css'
import loader from '../../images/loader.gif'
import remove from "../../images/remove.png"
import edit from "../../images/edit.png"
import { Link } from 'react-router-dom';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/books")
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])

    const handleDelete = (event, id) => {
        fetch(`http://localhost:5000/delete/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    event.target.parentNode.style.display = "none"
                }
            })
        window.alert("Your Book is Deleted")
    }

    const updateBook = (id) => {
        console.log('update button clicked',id);
    }
    return (
        <div className="row">
            <div className="col-md-3">
                <Sidebar />
            </div>
            <div className="col-md-9">
                <div className="shadow p-3">
                    <h1 className="text-center text-uppercase mb-3">Manage Books</h1>
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Book Name</th>
                                <th scope="col">Author Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {
                            books.length > 0 ? books.map(book =>
                                <tbody>
                                    <tr>
                                        <td>{book.bookName}</td>
                                        <td>{book.authorName}</td>
                                        <td>${book.price}</td>
                                        <img onClick={(event) => handleDelete(event, book._id)} style={{ cursor: "pointer", height: "30px", marginRight: "10px", marginTop: '3px' }} src={remove} alt="" />
                                        <Link to="/editBook"><img onClick={() => updateBook(book._id)} style={{ cursor: "pointer", marginTop: "3px", height: "30px" }} src={edit} alt="" /></Link>
                                    </tr>
                                </tbody>
                            )
                                :
                                <img style={{ display: "block", marginLeft: "300px", height: '200px' }} src={loader} alt="" />
                        }
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBooks;