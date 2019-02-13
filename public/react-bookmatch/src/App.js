import React, { Component } from 'react';
import './App.css';
import BookList from './BookList';
import Login from './Login';

const API_KEY = 'iDqJvSmeFc0pM6g4qThg';

class App extends Component {
  constructor(){
    super();
    this.state = {
      isAuthenticated: false,
      loggedIn: false,
      user: null,
      token: ''
    }
  }
  handleLogin = ()=>{


    this.setState({
      loggedIn: true
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? <BookList />:<Login handleLogin={this.handleLogin} />}
        
        

      </div>
    );
  }
}

export default App;
