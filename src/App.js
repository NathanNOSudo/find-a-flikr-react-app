import React, { Component }  from 'react';
// import React from 'react'; 
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import App from './App';

import SearchForm from './components/SearchForm';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';

// var apiKey = {
//     MY_KEY : 'b71c1a17497d55c6f8d6cd8049628a77',
//     SECRET_KEY : 'db766cf189e68999',
//     KEY_2 : '101010'
//   }
// THIS WAS FROM CREATE_REACT_APP
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// This is the main Container component that handles keyword, api key, and fetches photos from the API

class App extends Component {
  
  constructor(){
    super(); 
    
    this.state = {
      photos: [], 
      tag: 'coding',
      loading: true
    }; 
    
  }
  componentDidMount(){
    // this asynchronous and will return a promise
    // .then() method will only run once teh request is completed.
    // pass a callback function to the .then() method which takes the response object
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b71c1a17497d55c6f8d6cd8049628a77&media=photo&tags=${this.state.tag}&safe_search=1&per_page=12&format=json&nojsoncallback=1`)
      .then(res => {
        // console.log(res.data.photos.photo);
        //update loading state
        this.setState({
          photos: res.data.photos.photo,
          loading: false
        // console.log(res)
        });
      });
    
}

componentDidUpdate(PrevProps, prevState) {

  // check if prev props match current prps; if not, refetch the data and re-render the pics
  if (this.state.tag !== prevState.tag) {

    this.setState({ loading: true });

    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=b71c1a17497d55c6f8d6cd8049628a77&media=photo&tags=${this.state.tag}&safe_search=1&per_page=12&format=json&nojsoncallback=1`)
      .then(res => {
        //set the state to the new photos array
        this.setState({
          photos: res.data.photos.photo,
          tag: this.state.tag,
          loading: false
        });
      });
  }
}

//TODO: Create teh function to accdcept search term
  searchTags = (searchTermObj) => {
    this.setState({
      tag: searchTermObj.search
    })
  }
    

  // function to update the tag when a user clicks the nav buttons
  addTag = (button) => {
    this.setState({
      tag: button
    });
  }
    
  render() {
    return (
      <BrowserRouter>
        <div className="container">

          <SearchForm searchTags={this.searchTags} />
          <Navbar addTag={this.addTag} />

          {/* Test the loading state before rendering the gallery component instede the Routes */}

          { (this.state.loading)
            ? (<p>Loading results now...</p>)
            : (
              <Switch>
                  <Route exact path="/" render={ () => <Gallery photos={this.state.photos} tag={this.state.tag} loading={this.state.loading} />} />
                  <Route path="/search/:topic" render={ () => <Gallery photos={this.state.photos} tag={this.state.tag} loading={this.state.loading} />} />
                  <Route component={NotFound} />
                </Switch>
            )
          }
        </div>
      </BrowserRouter>
    );
  }
  
  // CLOSING CURLY FOR LINE 44
}

export default App;

