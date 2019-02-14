import React, { Component } from 'react';
import Header from '../Header';

class BooksInDatabase extends Component{
    constructor(){
        super();
        this.state = {
            bookList: []
        }
    }
    getDbBooks = async ()=>{
        try{
            const response = await fetch('http://localhost:9000/books', {
                method: 'GET',
                credentials: 'include'
            });
            if(!response.ok){
                throw Error(response.statusText);
            }
            const parsed = await response.json();
            this.setState({
                bookList: parsed.data
            })
        }catch(err){
            console.log(err);
            return err;
        }
    }
    deleteBook = async (id)=>{
        try{
            const response = await fetch(`http://localhost:9000/books/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if(!response.ok){
                throw Error(response.statusText);
            }
            await response.json();
            this.setState({
                bookList: this.state.bookList.filter(book => book._id !== id)
            })

        }catch(err){
            console.log(err);
            return err;
        }
    }
    componentDidMount(){
        this.getDbBooks();
    }
    render(){
        const books = this.state.bookList.map((book, i)=>{
            return(
                <li key={book._id}>
                    <img src={book.image === undefined ? null : book.image} alt={book.image}/>
                     <br/>
                    {book.title} <br/>
                    by: {book.author} <br/>
                    <button onClick={this.deleteBook.bind(null, book._id)}>Delete book from database</button>
                </li>
            )
        })
        return(
            <div className="book-container">
                <h1>Books our Users have Loved!</h1>
                <ul>
                    {books}
                </ul>
            </div>
        )
    }
}
export default BooksInDatabase;