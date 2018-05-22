import React, { Component } from 'react';
import Album from './components/albumTitle'
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();



    this.state = {
      post: [],
      artist: '',
      songName: '',
      quote: '',
      author: ' '
    }

  }

  // is what you want to display on your page when you load up
  componentDidMount() {
      axios.get('/api/getPost/').then(res => {
      this.setState({ post: res.data })
    })
    axios.get('http://quotes.rest/qod.json').then(res => {
      let randomQuote = res.data.contents.quotes[0].quote;
      let randomAuthor = res.data.contents.quotes[0].author;
      this.setState({
        quote: randomQuote,
        author: randomAuthor
      })
    })
  }

  getLyrics(artist, songName, id) {
    // console.log("hit")
      axios.get(`https://api.lyrics.ovh/v1/${artist}/${songName}`).then(res => {
      console.log(res.data)
      this.addPlaylist(res.data)  
      // below is rendundant becuase we already have the data
      // axios.put(`/api/updateLyrics/${id}`, { lyrics: res.data }).then(res =>{
      //   this.setState({ post: res.data })
      // }
    
  })}
  


  addPlaylist(lyrics) {
    
    axios.post('/api/addPlaylist', {
        artist: this.state.artist,
        songName: this.state.songName,
        lyrics: lyrics.lyrics
    }).then(res => {
      // console.log(this.state)
        this.setState({
        post: res.data,
        artist: '',
        songName: ''
      })
    })
  }


  deletePost(id) {
    // console.log(id)
      axios.delete(`/api/deletePost/${id}`).then(res => {
      this.setState({ post: res.data })
    })
  }

  editPost(id) {
    axios.get(`https://api.lyrics.ovh/v1/${this.state.artist}/${this.state.songName}`).then(res => {

      axios.put(`/api/editPost/${id}`, { artist: this.state.artist, songName: this.state.songName, lyrics: res.data.lyrics }).then(res => {
        this.setState({ post: res.data })
      }
    )
    })


  }
// this makes it so I can press enter to submit my input boxes
  handleInput(e){
      this.setState({songName: e.target.value})
      if(e.which === 13 ){
      // console.log(this.state.artist, this.state.songName)
      this.getLyrics(this.state.artist, this.state.songName)
    }
  }

  render() {
    console.log(this.state)
    let mappedPost = this.state.post.map((currentPost, i) => {
      return (
        <div key={i}>
          <h3>{currentPost.artist}</h3>
          <h4>{currentPost.songName}</h4>
          <button onClick={() => this.deletePost(currentPost.id)}     >Delete</button>
          <button onClick={() => { this.editPost(currentPost.id) }}>Edit</button>
          <br />
          
          <input type="text" placeholder="Change Artist"onChange={event   => this.setState(
            { artist: event.target.value }
          )} />
          <input type="text" placeholder="Change Song Name"onChange={event => this.setState(
            { songName: event.target.value }
          )} />
          <h6>--------------------</h6>
          <h5>{this.state.quote}
            <br />
            {this.state.author}</h5>
            <br />
            {currentPost.lyrics}


        </div>

      )
    })
    return (
      <div className="App">
        <div>
          <h1>
            <Album />
          </h1>
          <div className="postTemplate">
              <p className="artist">Artist:
                  <input type="text" placeholder="Artist Name " onChange={event => this.setState(
                  { artist: event.target.value })} />
              </p>
                  
                  
              <p className="songTitle">Song Title:
                  <input type="text" placeholder="Is case sensitive" onKeyUp={event => this.handleInput(event)}
                />


              </p>
                  <button type="submit"onClick={() => this.getLyrics(this.state.artist, this.state.songName, 1)}>Get Lyrics </button>
            
          </div>
          <div className="results">
            {mappedPost}
          </div>
        </div>
        

      </div>
    );
  }
}



export default App;
