const { assert } = require('chai')

const Decentrablog = artifacts.require('./Decentrablog.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Decentrablog', ([deployer, author, tipper]) => {
  
  let decentrablog

  before(async () => {
    //instantiation contract
    decentrablog = await Decentrablog.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      //address not empty
      const address = await decentrablog.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await decentrablog.name()
      assert.equal(name, 'Decentrablog')
    })
  })

  describe('posts', async () => {
    let result, postCount
    const hash= 'hashtest'

    before( async () => {
      result = await decentrablog.createPost('Body', hash, { from: author})
      postCount = await decentrablog.postCount()
    })

    it('create posts', async () => {
      //sucess post creation ok
      assert.equal(postCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(event.body, 'Body', 'body is correct')
      assert.equal(event.imgHash, hash, 'Hash is correct')
      assert.equal(event.tipAmount, '0', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')
      
      //Post must have body
      await decentrablog.createPost('', 'Img hash', { from: author }).should.be.rejected;

      //Post must have Imghash
      await decentrablog.createPost('Body', '', { from: author }).should.be.rejected;

      //Post must have an author
      await decentrablog.createPost('Body', 'Img hash', { from: '0x0' }).should.be.rejected;

    });

    //check from struct
    it('lists Posts', async () => {
      const post = await decentrablog.posts(postCount)
      assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(post.body, 'Body', 'body is correct')
      assert.equal(post.imgHash, hash, 'Hash is correct')
      assert.equal(post.tipAmount, '0', 'tip amount is correct')
      assert.equal(post.author, author, 'author is correct')
    })
    
    it('allows users to post', async () => {
      // Track the author balance before purchase
      let oldAuthorBalance
      oldAuthorBalance = await web3.eth.getBalance(author)
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

      result = await decentrablog.tipPostOwner(postCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

      // SUCCESS
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(event.body, 'Body', 'body is correct')
      assert.equal(event.imgHash, hash, 'Hash is correct')
      assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')

      // Check that author received funds
      let newAuthorBalance
      newAuthorBalance = await web3.eth.getBalance(author)
      newAuthorBalance = new web3.utils.BN(newAuthorBalance)

      let tipPostOwner
      tipPostOwner = web3.utils.toWei('1', 'Ether')
      tipPostOwner = new web3.utils.BN(tipPostOwner)

      const expectedBalance = oldAuthorBalance.add(tipPostOwner)

      assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

      // FAILURE: Tries to tip a post that does not exist
      await decentrablog.tipPostOwner(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
    })

  })
  
})