import React from 'react';
import Form from './Form';
import Post from './Post';

function Main({ posts,captureFile,createPost,tipPostOwner }) {

    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '70vw' }}>
            <div className="content mr-auto ml-auto">

              <h2 className="text-center">Share post</h2>
              
              <Form captureFile={captureFile} createPost={createPost} />

              { posts && posts.map((post, key) => (
                  <Post key={key} post={post} tipPostOwner={tipPostOwner} />
                )
              )}

            </div>
          </main>
        </div>
      </div>
    );

  }

export default Main;