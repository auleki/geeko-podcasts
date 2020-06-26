import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component {

  state = {
    title: '',
    description: '',
    posts: [],
    loading: false
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    this.getPodcast()
    this.setState({ loading: false });


    // console.log(this.state.posts);
  }

  getPodcast = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data})
        console.log('Data has been extracted!!!');
        console.log(this.state.posts);
    })
    .catch(() => {
      alert('Error receiving data!!!');
    });
  }


  handleChange = (event) => {    
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
    this.setState({
      [name]: value
    })
  }


  
  handleSubmit = (event) => {
    event.preventDefault();
    
    const payload = {
      title: this.state.title,
      description: this.state.description
    };

    axios({
      url: 'http://localhost:8000/api/save',
      method: 'POST',
      data: payload
    }).then(() => {
      console.log('Data has been sent to the server');
      this.resetUserInputs();
      this.getPodcast();
    })
      .catch(() => {
        console.log('Error occured with sending post');
      })
  };

  resetUserInputs = () => {
    this.setState({
      title: '',
      description: ''
    })
  }

  displayPodcasts = (casts) => {
    if (!casts.length) return null;

  

    return casts.map((cast, index) => (
      <div className="casts" key={index}>
        <h3>{cast.title}</h3>
        <p>{cast.description}</p>
      </div>
    ))
        
    

    
  }




  render() {

    // console.log('State: ' + this.state );

    return (
      <div className="pod-page">
        <h2>Create New Post</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='form-input'>
            <input 
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-input'>
            <textarea
              name="description"
              placeholder="Description"
              col="10"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className='form-input'>
            <button className="button" type="submit">Save Podcast</button>
          </div>
            {/* <p>{this.state.title} : {this.state.description}</p> */}
        </form>

        <div className="all-casts">
          <div className="title">
            <h2>All Posts</h2>
          </div>
          <div className="podcasts">
            {this.displayPodcasts(this.state.posts)}
          </div>

        </div>

        <div className="footer">
          <p>Created by <a rel="noopener noreferrer" target="_blank" href="https://wahabgiwa.dev">Wahab Giwa</a></p>
        </div>




      </div>
    )
  }

}

export default App;
