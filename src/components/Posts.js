import React from 'react'
import Post from './Post';

function Posts({posts, tipPostOwner}) {
    return (
        <div>
            { posts && posts.map((post, key) => (
                <Post key={key} post={post} tipPostOwner={tipPostOwner} />
                )
            )}
        </div>
    )
}

export default Posts
