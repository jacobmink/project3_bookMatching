import React, { Component } from 'react';
import Header from '../Header';
import { withRouter } from 'react-router-dom';

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: this.props.user.username,
            user: this.props.user,
            likedBooks: [this.props.user.likedBooks],
            userData: ''
        }
    }
    getUser = async (id)=>{
        try{
            const foundUser = await fetch(`http://localhost:9000/users/${id}`, {
            method: 'GET',
            credentials: 'include'
            })
            if(!foundUser.ok){
                throw Error(foundUser.statusText);
            }
            const parsed = await foundUser.json();
            console.log(parsed);
            this.setState({
                userData: parsed
            })
        }catch(err){
            console.log(err);
            return err;
        }
    }
    deleteUser = async (id)=>{
        try{
            const response = await fetch(`http://localhost:9000/users/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if(!response.ok){
                throw Error(response.statusText);
            }
            this.props.history.push('/')
        }catch(err){
            console.log(err);
            return err;
        }
    }
    componentDidMount(){
        this.getUser(this.state.user._id);
    }
    render(){
        console.log(this.state, ' profile state');
        const likedBooks = this.state.userData.length === 0 ? 'None' : this.state.userData.data.likedBooks.map((book)=>{
            return(
                <ul key={book._id}>
                    <li><img src={book.image} alt={book.image}/></li>
                    <li>{book.title}</li>
                    <li>{book.author}</li>
                </ul>
                
                
            )
        });
        return(
            <div>
                <h1>Your Profile</h1>
                <ul>
                    <li>Username: {this.state.username}</li>
                    <li>Liked Books: {likedBooks} </li>
                </ul>
                <button onClick={this.deleteUser.bind(null, this.state.user._id)} >Delete your Account</button>
            </div>
        )
    }
}
export default withRouter(Profile);