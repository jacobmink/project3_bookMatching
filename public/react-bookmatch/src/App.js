import React, { Component } from 'react';
import './App.css';
import BookList from './BookList';
import Login from './Login';

const API_KEY = 'iDqJvSmeFc0pM6g4qThg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
        <BookList />

      </div>
    );
  }
}

export default App;
