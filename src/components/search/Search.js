import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';

class Search extends Component {
  state = {
    loading: false,
    searchText: '',
    amount: 5,
    provider: '1',
    pixabayUrl: 'https://pixabay.com/api',
    pixabayKey: '9072866-b2c02e73d048c1a347e2a8faa',
    unsplashUrl: 'https://api.unsplash.com',
    unsplashKey: '80e0f74abd0364e14c037afdb9b69fb8df82e45dec946878fe500503c926aa1f',
    unsplashAccessToken: 'c995b8f17b0122ea208c63b91e282afe113f62fad09bac8168f2981f4634fed6',
    images: []
  }

  onProviderChange = (e, index, value) => {
    const val = e.target.value;
    this.setState({ provider: val,
                    searchText: ``,
                    images: []
                 });
  };

  onTextChange = (e) => {
    const val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if(val === ``) {
        this.setState({ images: [] });
      } else {
        if(this.state.provider === `1`) {
          this.setState({ loading: true });
          axios
            .get(`${this.state.pixabayUrl}/?key=${
                this.state.pixabayKey}&q=${
                this.state.searchText}&image_type=photo&per_page=${
                this.state.amount}&safesearch=true
                `)
            .then(res => this.setState({ images: res.data.hits, loading: false }))
            .catch(err => console.log(err));
        } else if(this.state.provider === `2`) {
          this.setState({ loading: true });
          axios
            .get(`${this.state.unsplashUrl}/search/photos?query=${
                this.state.searchText}&per_page=${this.state.amount}/?client_id=${
                this.state.unsplashKey}&access_token=${this.state.unsplashAccessToken}
                `)
            .then(res => this.setState({ images: res.data.results, loading: false }))
            .catch(err => console.log(err));
        }
      }
    });
  };

  onAmountChange = (e, index, value) => this.setState({ amount: e.target.value });

  render() {
      console.log(this.state.provider);
      console.log(this.state.images);
      console.log(this.state.amount);
    return (
      <div>
        <FormControl style={{ minWidth: 500 }}>
          <InputLabel>Provider</InputLabel>
          <Select
              id="provider"
              name="provider"
              value={this.state.provider}
              onChange={this.onProviderChange}
              native
              >
              <option value={1}>Pixabay</option>
              <option value={2}>Unsplash</option>
          </Select>
        </FormControl>
        <TextField
          id="searchText"
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          label="Search For Images"
          placeholder="Images"
          
          fullWidth
        />
        <FormControl style={{ minWidth: 500 }}>
          <InputLabel>Amount</InputLabel>
            <Select
                id="amount"
                name="amount"
                value={this.state.amount}
                onChange={this.onAmountChange}
                native
                >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </Select>
        </FormControl>
        <br />
        {this.state.loading ? 'Fetching up all images...' : this.state.images.length > 0 ? (
            <ImageResults images={this.state.images} provider={this.state.provider} />
        ) : null}
      </div>
    )
  }
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

export default Search;