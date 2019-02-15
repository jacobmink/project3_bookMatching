import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class BookListing extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.book.volumeInfo.title,
            author: this.props.book.volumeInfo.authors,
            image: this.props.book.volumeInfo.imageLinks === undefined ? null : this.props.book.volumeInfo.imageLinks.smallThumbnail
        }
    }
    handleClick = ()=>{
        this.props.addBook(this.state);
    }
    render(){
        return(
            <div>
                {this.state.image === null ? null:<img src={this.state.image} alt={this.state.image}/>}
                <p>
                    {this.state.title} <br/>
                    <small>by {this.state.author}</small> 
                </p>
                <button onClick={this.handleClick}>Add book to favorites</button>
            </div>
        )
    }
}
export default withRouter(BookListing);