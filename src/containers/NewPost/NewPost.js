import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './NewPost.css';

class NewPost extends Component {
  state = {
    title: '',
    body: '',
    author: 'Max',
    submitted: false
  };
  postDataHandler = () => {
    const post = {
      ...this.state
    };
    axios
      .post('http://jsonplaceholder.typicode.com/posts/', post)
      .then(response => {
        console.log(response);
        //this.props.history.push('/posts'); // will redirect but clicking browser back button will go back to new-posts/
        this.props.history.replace('/posts'); //does the same as Redirect, cliking browser back button will not go back to new-posts/

        // this.setState({ submitted: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let redirect = null;
    if (this.state.submitted) {
      redirect = <Redirect to="/posts/" />;
    }
    return (
      <div className="NewPost">
        {redirect}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.body}
          onChange={event => this.setState({ body: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={event => this.setState({ author: event.target.value })}
        >
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
