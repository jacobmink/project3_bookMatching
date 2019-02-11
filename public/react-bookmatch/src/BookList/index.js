import React, { Component } from 'react';
const convert = require('xml-js');
const goodReadsJSONResponse = require('goodreads-json-api');
const https = require('https');

const API_KEY = 'iDqJvSmeFc0pM6g4qThg'

class BookList extends Component{
    constructor(){
        super();
        this.state = {
            bookList: [],
            userId: '7286856'
        }
    }
    getBooks = async ()=>{
        https.get(`https://cors-anywhere.herokuapp.com/https://www.goodreads.com/review/list/${this.state.userId}.xml?v=2&shelf=read&per_page=200&key=${API_KEY}`, (res) => {
        const options = {
            xml: {
                normalizeWhitespace: true
            }
        }
        const statusCode = res.statusCode;
        const contentType = res.headers['content-type'];
        let error;
        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' +
                `Status Code: ${statusCode}`);
        }
        if (error) {
            console.log(error.message);
            // consume response data to free up memory
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => rawData += chunk);
        
        res.on('end', () => {
            try {
                const parsed = convert.xml2json(rawData, {compact: true, spaces: 4});
                const reviews = JSON.parse(parsed).GoodreadsResponse.reviews.review;
                // console.log(JSON.parse(parsed).GoodreadsResponse);

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
    componentDidMount(){
        this.getBooks();
    }
    render(){
        console.log(this.state);
        const bookArray = this.state.bookList.map((book, i)=>{
            return(
                <li key={i}>
                    {book.book.title._text} <br/>
                    <small>by: {book.book.authors.author.name._text}</small>
                </li>
            )
        })
        return(
            <div>
                <h1>These are your books</h1>
                <ul>
                    {bookArray}
                </ul>
            </div>
        )
    }
}

export default BookList;