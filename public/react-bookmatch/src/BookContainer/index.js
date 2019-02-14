import React, { Component } from 'react';
import SearchBar from '../SearchBar';
import BookListing from '../BookListing';
import Header from '../Header';
const convert = require('xml-js');
const https = require('https');


const googleApiKey = 'AIzaSyD5zcjV-lFByHtpi7rTPMN-i-fQrlKtepw';

class BookContainer extends Component{
    constructor(){
        super();
        this.state = {
            searchTerm: '',
            searchGenre: '',
            bookList: []
        }
    }
    // getBooks = async (title)=>{
    //     https.get(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=${API_KEY}&search[genre]=fiction&per_page=200`, (res) => {
    //     const options = {
    //         xml: {
    //             normalizeWhitespace: true
    //         }
    //     }
    //     let error;
    //     if (res.statusCode !== 200) {
    //         error = new Error('Request Failed.\n' +
    //             `Status Code: ${res.statusCode}`);
    //     }
    //     if (error) {
    //         console.log(error.message);
    //         res.resume();
    //         return;
    //     }

    //     res.setEncoding('utf8');
    //     let rawData = '';
    //     res.on('data', (chunk) => rawData += chunk);
        
    //     res.on('end', () => {
    //         try {
    //             const parsed = convert.xml2json(rawData, {compact: true, spaces: 4});
    //             const reviews = JSON.parse(parsed).GoodreadsResponse.search.results.work;

    //             this.setState({
    //                 bookList: reviews
    //             })
    //         } catch (e) {
    //             console.log(e.message);
    //         }
    //     });
        
    //     }).on('error', (e) => {
    //         console.log(`Got error: ${e.message}`);
    //     });
    // }
    getGoogleBooks = async (state)=>{
        const genre = state.searchGenre.length > 0 ? `+subject:${state.searchGenre}` : '';
        const searchTerm = state.titleOrAuthor === 'title' ? state.searchTerm : `inauthor:${state.searchTerm}`;
        try{
            const foundBook = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}${genre}&key=${googleApiKey}&country=US`)
            if(!foundBook.ok){
                throw Error(foundBook.statusText);
            }

            const parsed = await foundBook.json();
            console.log("DID THE SEARCH");
            console.log(parsed.items);
            this.setState({
                bookList: parsed.items,
                searchTerm: searchTerm,
                searchGenre: genre
            })

        }catch(err){
            console.log(err);
            return err;
        }
    }
    addBook = async (data)=>{
        try{
            const response = await fetch(`http://localhost:9000/books`, {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(!response.ok){
                throw Error(response.statusText);
            }
            const parsed = await response.json();
            console.log('added ', parsed, ' to database');
        }catch(err){
            console.log(err);
            return err;
        }
    }
    deleteBook = async (id)=>{
        try{
            const deletedBook = await fetch(`http://localhost:9000/books/${id}`, {
                method: "DELETE",
                credentials: 'include'
            })

            if(!deletedBook.ok){
                throw Error(deletedBook.statusText);
            }
            const parsed = await deletedBook.json();
        }catch(err){
            console.log(err);
            return err;
        }
    }
    render(){
        console.log(this.state);
        const bookArray = this.state.bookList === undefined ? <h1>Oops! That book title wasn't found...</h1> : this.state.bookList.map((book, i)=>{
            console.log("MAPPING AGAIN");
            console.log(book)
            return(
                <li key={book.id}>
                    <BookListing addBook={this.addBook} book={book}/>
                </li>
            )
        })
        
        return(
            <div className="book-container">
                <SearchBar getBooks={this.getGoogleBooks} />
                {this.state.bookList.length > 0 ? <h1>Search Results for "{this.state.searchTerm}"</h1> : null}
                {bookArray}
            </div>
        )
    }
}



export default BookContainer;