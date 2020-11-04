import React from 'react'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol } from 'mdbreact';
import Identicon from 'identicon.js';

function Post({post, tipPostOwner}) {
    
    return (
        <MDBCol >
            <MDBCard className="mx-auto my-5 " style={{ width: "40vw" }}>
            <div className="card-header">
                    <img
                    className='mr-2'
                    width='30'
                    height='30'
                    src={`data:post/png;base64,${new Identicon(post.author, 30).toString()}`}
                    alt=""
                />
                    <small className="text-muted">{post.author}</small>
                    <br/>
            </div>
            <MDBCardImage style={{width:"100%",height:"50vh"}} src={`https://ipfs.infura.io/ipfs/${post.imgHash}`} waves />
                <MDBCardBody>
                <MDBCardText style={{borderBottom:"1px grey solid"}} className="pb-3">
                    {post.body}
                </MDBCardText>
                    <small className="float-left mt-1 text-muted">
                        TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                    </small>
                    <button
                        className="btn btn-link btn-sm float-right pt-0"
                        name={post.id}
                        onClick={(event) => {
                        let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                        console.log(event.target.name, tipAmount)
                        tipPostOwner(event.target.name, tipAmount)
                        }}
                    >
                        TIP 0.1 ETH
                    </button>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
    )
}

export default Post
