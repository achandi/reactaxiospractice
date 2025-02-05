import React, { Component } from 'react';
//import axios from '../../axios';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import Posts from '../Posts/Posts';
//import NewPost from '../NewPost/NewPost';

import './Blog.css';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
  return import('../NewPost/NewPost');
});

class Blog extends Component {
  state = {
    auth: true
  };
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink exact to="/posts/">
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: '/new-post',
                    hash: '#submit',
                    search: '?quick-submit=true'
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/new-post" exact component={NewPost} />   ///WITHOUT NESTING FULLPOST IN POSTS
          <Route path="/:id" exact component={FullPost} />
        </Switch> */}

        <Switch>
          {/* <Route path="/new-post" exact component={NewPost} /> */}

          {this.state.auth ? (
            <Route path="/new-post" exact component={AsyncNewPost} />
          ) : null}
          <Route path="/posts" component={Posts} />
          <Redirect from="/" to="/posts" />
          {/* <Route render={() => { <h1>Note found</h1>}} /> */}
        </Switch>
        {/* rendering full posts in posts now, need to switch order of 
        '/new-post' with '/' and remove '/' exact, otherwise '/:id will be interpreted as new-post otherwise */}
      </div>
    );
  }
}

export default Blog;
