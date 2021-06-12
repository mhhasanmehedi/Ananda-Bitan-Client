import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './AddBook.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AddBook = () => {
    const { register, handleSubmit } = useForm();

    const [imageURL, setImageURL] = useState(null);


    const onSubmit = data => {
        const eventData = {
            bookName: data.bookName,
            price: data.price,
            authorName: data.authorName,
            imageURL: imageURL
        };
        console.log(eventData);
        fetch(`http://localhost:5000/addBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(res => console.log('server side response', res))            
            window.alert("Your Book added successfully")

    };


    const handleImgUpload = event => {
        const imageData = new FormData();
        imageData.set('key', '6067ebeae798dcbd138e0036c7be5e85');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(res => {
                setImageURL(res.data.data.display_url);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="row">
            <div className="col-md-3">
                <Sidebar />
            </div>
            <div className="col-md-9">
                <form onSubmit={handleSubmit(onSubmit)} className="shadow">
                    <h2 className="text-uppercase text-center pt-5">Add Book</h2>
                    <div style={{ padding: "50px" }}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <h5 htmlFor="">Book Name</h5>
                                    <input style={{color:"red"}} className="form-control" placeholder="Enter Name" {...register("bookName")} />
                                </div>
                                <div className="form-group">
                                    <h5 htmlFor="">Price</h5>
                                    <input className="form-control" placeholder="Enter Price" {...register("price")} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <h5 htmlFor="">Author Name</h5>
                                    <input className="form-control" placeholder="Enter Name" {...register("authorName")} />
                                </div>
                                <div className="form-group">
                                    <h5 htmlFor="">Book Cover Photo</h5>
                                 <input className="d-block" type="file" onChange={handleImgUpload} />
                                </div>
                            </div>
                        </div>
                        {
                            imageURL ? 
                            <input className="btn btn-info float-right" type="submit" />
                            :
                            <input className="btn btn-info float-right" type="submit" disabled />
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBook;