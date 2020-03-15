import React, { Component } from 'react';
import axios from '../../axios';
import Post from '../../components/Post/Post';
import { Link, Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost';
import './Posts.css';
class Posts extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    console.log(this.props);
    axios
      .get('/posts')
      .then(response => {
        console.log(response);
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return { ...post, author: 'Max' };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch(err => {
        console.log(err);
        // this.setState({ error: true });
      });
  }

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
    //ALTERNATIVE TO adding Link in Return map func below, and this.setState above, just do
    // this.props.history.push({ pathname: '/posts/' + id });
  };
  render() {
    let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          <Link to={'/posts/' + post.id} key={post.id}>
            <Post
              clicked={() => this.postSelectedHandler(post.id)}
              author={post.author}
              title={post.title}
            />
          </Link>
        );
      });
    }
    // return
    // <section className="Posts">{posts}</section>; WITHOUT NESTED ROUTES

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route
          path={this.props.match.url + '/:id'}
          exact
          component={FullPost}
        />
      </div>
    );
  }
}

export default Posts;
