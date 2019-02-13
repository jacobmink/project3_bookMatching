import React, { Component } from 'react';
import './App.css';
import BookContainer from './BookContainer';
import Login from './Login';

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
        {this.state.loggedIn ? <BookContainer />:<Login handleLogin={this.handleLogin} />}
        
        

      </div>
    );
  }
}

export default App;
