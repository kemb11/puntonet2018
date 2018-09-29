import React, { Component } from 'react';

import Routes from './routes';

class App extends Component {

  render() {
    return (
        <div>
          <a href="/login">Login</a>
          <a href="/home">Home</a>
          <Routes />
        </div>
    );
  }
}

export default App;
