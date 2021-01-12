import React from 'react'
import Form from './Form';
import Card from 'react-bootstrap/Card'

function PostForm({captureFile, createPost}) {
    return (
        <div>
            <Card
                bg="Light"
                text={"dark"}
                style={{ width: '28rem' }}
                className="ml-auto mr-auto"
            >
                <Card.Header><h2 className="text-center">Share post</h2><p className="text-center">Nobody can't stop you!</p> </Card.Header>
                <Card.Body>
                    <Form captureFile={captureFile} createPost={createPost} />
                </Card.Body>
            </Card>
            
                
        </div>
    )
}

export default PostForm
