import React, { useEffect } from 'react';
import Book from '../Book/Book';
import spinner from "../../images/loader.gif";
import { useState } from 'react';
import Footer from '../Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


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
                <div class="input-group w-50 m-auto pt-5 mb-5">
                    <input type="text" class="form-control" placeholder="Search this blog" />
                    <div class="input-group-append">
                        <button class="btn btn-info" type="button">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
                <div className="row mt-5">
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