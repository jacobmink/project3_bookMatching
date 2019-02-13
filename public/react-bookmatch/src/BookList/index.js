import React, { Component } from 'react';
import SearchBar from '../SearchBar';
const convert = require('xml-js');
const https = require('https');

const API_KEY = 'iDqJvSmeFc0pM6g4qThg'
// const usernameFormat = 'https://www.goodreads.com/user/show/?key=BLAH&username=greggmarshall&format=xml';

class BookList extends Component{
    constructor(){
        super();
        this.state = {
            bookList: [],
            userId: '7286856'
        }
    }
    getBooks = async (title)=>{
        https.get(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/search/index.xml?key=${API_KEY}&q=${title}`, (res) => {
        const options = {
            xml: {
                normalizeWhitespace: true
            }
        }
        let error;
        if (res.statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                `Status Code: ${res.statusCode}`);
        }
        if (error) {
            console.log(error.message);
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => rawData += chunk);
        
        res.on('end', () => {
            try {
                const parsed = convert.xml2json(rawData, {compact: true, spaces: 4});
                const reviews = JSON.parse(parsed).GoodreadsResponse.search.results.work;

                this.setState({
                    bookList: reviews
                })
            } catch (e) {
                console.log(e.message);
            }
        });
        
        }).on('error', (e) => {
            console.log(`Got error: ${e.message}`);
        });
    }
    render(){
        console.log(this.state.bookList);
        const bookArray = this.state.bookList === undefined ? <h1>Oops! That book title wasn't found...</h1> : this.state.bookList.map((book, i)=>{
            return(
                <li key={i}>
                    <img src={book.best_book.small_image_url._text} alt={book.best_book.small_image_url._text}/>
                    <p>
                        {book.best_book.title._text} <br/>
                        <small>by {book.best_book.author.name._text}</small> 
                    </p>
                </li>
            )
        })
        
        return(
            <div>
                <SearchBar getBooks={this.getBooks} />
                <h1>Search Results for ""</h1>
                    {bookArray}
            </div>
        )
    }
}



export default BookList;