import React, { useEffect } from 'react';
import Book from '../Book/Book';
import spinner from "../../images/loader.gif";
import { useState } from 'react';
import Footer from '../Footer/Footer';


const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("https://mighty-depths-74562.herokuapp.com/books")
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])
    return (
        <>
            <div className="container">
                <div className="row">
                    {
                        books.length > 0 ? books.map(book => <Book book={book} />)
                            :
                            <img style={{ width: '300px' }} className="text-center m-auto" src={spinner} alt="..." />
                    }
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;