import React from 'react';
import { useHistory } from 'react-router-dom';

const Book = (props) => {
    const { bookName, authorName, price, imageURL, _id } = props.book;

    const history = useHistory();

    const handleOrder = () => {
        history.push(`/book/${_id}`)
    }

    return (
        <div className="col-md-4">
            <div className="single-book-box shadow p-4 rounded mt-4 mb-4">
                <div className="bg-secondary p-4 rounded" style={{height: "370px"}}>
                    <img height="100%" width="100%" src={imageURL} alt={bookName} />
                </div>
                <h5>{bookName}</h5>
                <small className="text-secondary">{authorName}</small>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <h4 className="text-primary">${price}</h4>
                    <button onClick={() => handleOrder()} className="btn btn-info">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default Book;