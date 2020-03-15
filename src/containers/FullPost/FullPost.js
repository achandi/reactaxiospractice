import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
  state = {
    loadPost: null
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    console.log('update');
    if (this.props.match.params.id) {
      if (
        !this.state.loadPost ||
        (this.state.loadPost &&
          this.state.loadPost.id !== +this.props.match.params.id)
      ) {
        axios
          .get(
            'http://jsonplaceholder.typicode.com/posts/' +
              this.props.match.params.id
          )
          .then(response => {
            this.setState({ loadPost: response.data });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }

  deletePostHandler = () => {
    axios
      .delete(
        'http://jsonplaceholder.typicode.com/posts/' +
          this.props.match.params.id
      )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

    console.log(this.props.match.params.id);
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    if (this.state.loadPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadPost.title}</h1>
          <p>{this.state.loadPost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
