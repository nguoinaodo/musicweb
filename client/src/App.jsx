import React, { Component } from 'react';
import './style/css/main.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';
import SongList from './components/SongList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />        
        <Signup />
        <Login />
        <SongList />
      </div>
    );
  }
}

export default App;
