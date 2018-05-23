import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import Search from './components/search/Search';
import Grid from '@material-ui/core/Grid';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Grid container spacing={24} style={{ padding: 20 }}>
          <Grid item xs={12}>
            <Search />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
