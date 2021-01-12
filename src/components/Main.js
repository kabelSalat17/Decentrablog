import React from 'react';

import PostForm from './PostForm';
import Posts from './Posts';

function Main({ posts,captureFile,createPost,tipPostOwner }) {

    return (
      <div className="wrapper">
        <div className="split left">
          <div className="centered">
            <PostForm captureFile={captureFile} createPost={createPost} />  
          </div>
        </div>

        <div className="split right">
            <Posts posts={posts} tipPostOwner={tipPostOwner} />
        </div>
      </div>
    );

  }

export default Main;