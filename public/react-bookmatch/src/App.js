import React, { Component } from 'react';
import './App.css';
import BookContainer from './BookContainer';
import BooksInDatabase from './BooksInDatabase';
import Profile from './Profile';
import Login from './Login';
import Header from './Header';
import Footer from './Footer';
import { Route, Switch, withRouter } from 'react-router-dom';

const My404 = ()=>{
  return(
    <div>
      You are lost!!!
    </div>
  )
}

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
  }
  getUserInfo = (userInfo)=>{
    this.setState({
      user: userInfo
    })
  }
  logout = async ()=>{
    try{
      await fetch('http://localhost:9000/auth/logout', {
        method: 'GET',
        credentials: 'include'
      })
      this.props.history.push('/')
    }catch(err){
      console.log(err);
      return err;
    }
  }
  render(){
    return(
      <main className="App">
      <Header logout={this.logout}/>
      {JSON.stringify(this.state.user) === "{}" ?  <Login getUserInfo={this.getUserInfo}/>: 
      <Switch>
        <Route exact path="/" render={props => <Login getUserInfo={this.getUserInfo}/> } />
        <Route exact path="/profile" render={props => <Profile user={this.state.user}/> } />
        <Route exact path="/books" render={props => <BookContainer user={this.state.user}/> } />
        <Route exact path="/booksindb" render={props => (<BooksInDatabase user={this.state.user}/>) } />
        <Route component={ My404 } />
      </Switch>
      }
      <Footer />
    </main>
    )
    
  }
}

export default withRouter(App);
