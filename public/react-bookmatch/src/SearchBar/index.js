import React, { Component } from 'react';

class SearchBar extends Component{
    constructor(){
        super();
        this.state = {
            searchTerm: ''
        }
    }
    handleChange = (e)=>{
        const title = e.target.value;
        const regex = / /gi;
        title.replace(regex, '+');
        this.setState({
            searchTerm: title
        })
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.getBooks(this.state.searchTerm);
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="searchTerm" onChange={this.handleChange}/>
                <input type="submit"/>
            </form>
        )
    }
}
export default SearchBar;