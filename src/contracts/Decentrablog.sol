pragma solidity ^0.5.0;

contract Decentrablog {
  string public name = "Decentrablog";

  //Structure of my Post

  struct Post {
    uint id;
    string body;
    string imgHash;
    uint tipAmount;
    address payable author;
  }
  
  /* Events */

  event PostCreated (
    uint id,
    string body,
    string imgHash,
    uint tipAmount,
    address payable author
  );

  event PostTipped (
    uint id,
    string body,
    string imgHash,
    uint tipAmount,
    address payable author
  );

  /* ========= */

  uint public postCount = 0;
  mapping(uint => Post) public posts;

  //create Post

  function createPost( string memory _body, string memory _imgHash ) public {

    //body not empty
    require(bytes(_body).length > 0);

    //hash img exists
    require(bytes(_imgHash).length > 0);


    //adress exists
    require(msg.sender != address(0x0));

    //increment post id
    postCount++;

    // create a post
    posts[postCount] = Post( postCount, _body, _imgHash, 0, msg.sender);

    // trigger post event
    emit PostCreated(postCount, _body, _imgHash, 0, msg.sender);
  }

  //tip post

  function tipPostOwner(uint _id) public payable {

    //id is valid?
    require(_id > 0 && _id <= postCount);

    //fetch the post
    Post memory _post = posts[_id];
    
    //fetch the author
    address payable _author = _post.author;

    //transfer eth when tip
    address(_author).transfer(msg.value);

    //update tip amount
    _post.tipAmount += msg.value;

    //update the post
    posts[_id] = _post;

     // trigger event tip
    emit PostTipped(_id, _post.body, _post.imgHash,_post.tipAmount, _author);
  }

}