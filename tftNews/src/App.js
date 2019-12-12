import React, { Component } from 'react';
import PostList from './components/postList/';
import Form from './components/postForm/';
import * as api from './api';
import _ from 'lodash';

export default class App extends Component {

  state = { posts: [{}] };

  componentDidMount() {
    api.getAll().then(resp => {
      this.setState({
        posts: resp.posts
      });
    }).catch(console.error);
  };


  addPostItem = (title, author, link) => {
    api.add(title, author, link)
      .then(resp => {
        const newPost = { "id": resp.id, "title": title, "author": author, "link": link, "upvotes": 0, "comments": [] };
        this.setState({ posts: this.state.posts.concat([newPost]) });
      })
  };

  incrementUpvote = (id) => {
    api.upvote(id).then(resp => {
      var upvotedPost = _.find(this.state.posts, post => post.id == id);
      upvotedPost.upvotes++;
      this.setState({})
    });
  };

  decrementUpvote = (id) => {
    api.upvote(id).then(resp => {
      var upvotedPost = _.find(this.state.posts, post => post.id == id);
      upvotedPost.upvotes--;
      this.setState({})
    });
  };

  removePost = (id) => {
    api.delete(id);
    this.setState({});
  }

  render() {
    const posts = _.sortBy(this.state.posts, post =>
      post.upvotes);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-9 col-md-offset-1">
            <PostList posts={posts} upvoteHandler={this.incrementUpvote}
              downvoteHandler={this.decrementUpvote} deleteHandler={this.removePost} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 col-md-offset-1">
            <Form handleAdd={this.addPostItem} />
          </div>
        </div>
      </div>
    );
  }
}