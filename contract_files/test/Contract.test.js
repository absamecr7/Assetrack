const assert = require('assert');
const ganache = require('ganache-cli');

//Web3 is a constructor.
const Web3 = require('web3');

//get a provider from ganache and give it to web3
const provider = ganache.provider();
//create an instance with the help of the constructor
const web3 = new Web3(provider);

//Get the ABI and Bytecode from the compiled contract.
const compiledScript = require('../compile');
const abi_interface = compiledScript.abi_interface;
const bytecode = compiledScript.bytecode;


/*
Mocha funcitons =>
    it => run a test and make an assertion.
    describe => group together multiple "it" functions.
    beforeEach => anything inside here will be ran before running every "it" statement of the tests.
*/

let accounts;
let assetContract; 

beforeEach(async () => {
    
    //get list of all accounts
    accounts = await web3.eth.getAccounts();                                        // get a list of all accounts provided by ganache cli.

    assetContract = await new web3.eth.Contract(JSON.parse(abi_interface))          //only tells that there is a contract which has an interface as given.
                    .deploy({data: '0x'+ bytecode})                                 //does not deploy - only creates a transaction object to be sent, and tells web3 that we want to deplay a contract.
                    .send({from: accounts[0], gas: 1500000});                       //tells web3 to send the transaction object that wwill create this contract.


});


describe('Basic functions regarding to assets\' tests.',() => {
    
    it('We get the address of deployed contract.', () => {
        assert.ok(assetContract.options.address);
    });

    it('constructor() - We call the constructor correctly.', async () => {
       
        const admin = await assetContract.methods.administrator().call();
        assert.equal(accounts[0], admin);

        const initialAssets = await assetContract.methods.no_of_assets().call();
        assert.equal(0, initialAssets);

    });

    it('addToken() - It is able to add new Tokens.', async () => {

        var tokenId, dataHash, ipfsHash;

        tokenId = "Token 1"; dataHash = "Datahash 1"; ipfsHash = "Ipfshash 1";
        await assetContract.methods.addToken(tokenId, dataHash, ipfsHash).send({from: accounts[0], gas: 1000000});
        
        var assets = await assetContract.methods.no_of_assets().call();
        assert.equal(1, assets);

        tokenId = "Token 2"; dataHash = "Datahash 2"; ipfsHash = "Ipfshash 2";
        await assetContract.methods.addToken(tokenId, dataHash, ipfsHash).send({from: accounts[0], gas: 1000000});
        
        var assets = await assetContract.methods.no_of_assets().call();
        assert.equal(2, assets);

    });

    it('Tokens array - We can return tokenIDs if we provide index.',async () => {

        var tokenId, dataHash, ipfsHash;

        tokenId = "Token 1"; dataHash = "Datahash 1"; ipfsHash = "Ipfshash 1";
        await assetContract.methods.addToken(tokenId, dataHash, ipfsHash).send({from: accounts[0], gas: 1000000});

        const resultID = await assetContract.methods.Tokens(0).call();
        assert.equal(resultID, tokenId);

        tokenId = "Token 2"; dataHash = "Datahash 2"; ipfsHash = "Ipfshash 2";
        await assetContract.methods.addToken(tokenId, dataHash, ipfsHash).send({from: accounts[0], gas: 1000000});

        const resultID_2 = await assetContract.methods.Tokens(1).call();
        assert.equal(resultID_2, tokenId);

    });

    it('getDataHash() - We can get datahash of any tokenID', async () => {

        var tokenId, dataHash, ipfsHash;

        tokenId = "Token 1"; dataHash = "Datahash 1"; ipfsHash = "Ipfshash 1";
        await assetContract.methods.addToken(tokenId, dataHash, ipfsHash).send({from: accounts[0], gas: 1000000});

        const result_datahash_1 = await assetContract.methods.getDataHash(tokenId).call();
        assert.equal(result_datahash_1, dataHash);

        tokenId = "Token 2"; dataHash = "Datahash 2"; ipfsHash = "Ipfshash 2";
        await assetContract.methods.addToken(tokenId, dataHash, ipfsHash).send({from: accounts[0], gas: 1000000});

        const result_datahash_2 = await assetContract.methods.getDataHash(tokenId).call();
        assert.equal(result_datahash_2, dataHash);

    });

    it('getIpfsHash() - We can get ipfshash of any tokenID', async () => {

        var tokenId, dataHash, ipfsHash;

        tokenId = "Token 1"; dataHash = "Datahash 1"; ipfsHash = "Ipfshash 1";
        await assetContract.methods.addToken(tokenId, dataHash, ipfsHash).send({from: accounts[0], gas: 1000000});

        const result_ipfshash_1 = await assetContract.methods.getIpfsHash(tokenId).call();
        assert.equal(result_ipfshash_1, "Ipfshash 1");

        tokenId = "Token 2"; dataHash = "Datahash 2"; ipfsHash = "Ipfshash 2";
        await assetContract.methods.addToken(tokenId, dataHash, ipfsHash).send({from: accounts[0], gas: 1000000});

        const result_ipfshash_2 = await assetContract.methods.getIpfsHash(tokenId).call();
        assert.equal(result_ipfshash_2, ipfsHash);

    });

    it('getDetails() function - gives details when provided with tokenID', async () => {

        var tokenId1, dataHash1, ipfsHash1; var tokenId2, dataHash2, ipfsHash2;

        tokenId1 = "Token 1"; dataHash1 = "Datahash 1"; ipfsHash1 = "Ipfshash 1";
        await assetContract.methods.addToken(tokenId1, dataHash1, ipfsHash1).send({from: accounts[0], gas: 1000000});

        tokenId2 = "Token 2"; dataHash2 = "Datahash 2"; ipfsHash2 = "Ipfshash 2";
        await assetContract.methods.addToken(tokenId2, dataHash2, ipfsHash2).send({from: accounts[0], gas: 1000000});

        const token_1 = await assetContract.methods.getDetails(tokenId1).call();
        const token_2 = await assetContract.methods.getDetails(tokenId2).call();
        
        assert.equal(token_1.dataHash, dataHash1);
        assert.equal(token_1.ipfsHash, ipfsHash1);
        assert.equal(token_2.dataHash, dataHash2);
        assert.equal(token_2.ipfsHash, ipfsHash2);

    });

    it('changeIpfsHash() - one is able to change the ipfshash', async () => {

        var tokenId1, dataHash1, ipfsHash1; var tokenId2, dataHash2, ipfsHash2;

        tokenId1 = "Token 1"; dataHash1 = "Datahash 1"; ipfsHash1 = "Ipfshash 1";
        await assetContract.methods.addToken(tokenId1, dataHash1, ipfsHash1).send({from: accounts[0], gas: 1000000});

        tokenId2 = "Token 2"; dataHash2 = "Datahash 2"; ipfsHash2 = "Ipfshash 2";
        await assetContract.methods.addToken(tokenId2, dataHash2, ipfsHash2).send({from: accounts[0], gas: 1000000});

        var newIpfsHash_1 = "newIpfsHash 1";
        await assetContract.methods.changeIpfsHash(tokenId1, newIpfsHash_1).send({from: accounts[0], gas: 1000000});

        const result_1 = await assetContract.methods.getIpfsHash(tokenId1).call();

        assert.equal(result_1, newIpfsHash_1);
    });

    it('changeDataHash() - one is able to change the datahash', async () => {

        var tokenId1, dataHash1, ipfsHash1; var tokenId2, dataHash2, ipfsHash2;

        tokenId1 = "Token 1"; dataHash1 = "Datahash 1"; ipfsHash1 = "Ipfshash 1";
        await assetContract.methods.addToken(tokenId1, dataHash1, ipfsHash1).send({from: accounts[0], gas: 1000000});

        tokenId2 = "Token 2"; dataHash2 = "Datahash 2"; ipfsHash2 = "Ipfshash 2";
        await assetContract.methods.addToken(tokenId2, dataHash2, ipfsHash2).send({from: accounts[0], gas: 1000000});

        var newDataHash_2 = "newDataHash 2";
        await assetContract.methods.changeDataHash(tokenId2, newDataHash_2).send({from: accounts[0], gas: 1000000});

        const result_2 = await assetContract.methods.getDataHash(tokenId2).call();

        assert.equal(result_2, newDataHash_2);
    });

    it('changeIpfsHash() - ONLY ADMINISTRATOR CAN CHANGE IPFSHASH, OTHERS CAN\'T', async () => {

        var newIpfsHash_1 = "newIpfsHash 1";
        var tokenId1, dataHash1, ipfsHash1; var tokenId2, dataHash2, ipfsHash2;

        tokenId1 = "Token 1"; dataHash1 = "Datahash 1"; ipfsHash1 = "Ipfshash 1";
        tokenId2 = "Token 2"; dataHash2 = "Datahash 2"; ipfsHash2 = "Ipfshash 2";

        try{
            await assetContract.methods.addToken(tokenId1, dataHash1, ipfsHash1).send({from: accounts[0], gas: 1000000});

            await assetContract.methods.addToken(tokenId2, dataHash2, ipfsHash2).send({from: accounts[0], gas: 1000000});

            await assetContract.methods.changeIpfsHash(tokenId1, newIpfsHash_1).send({from: accounts[1], gas: 1000000});

            assert(false);
            console.log('It should not reach here.')
        }
        catch(err) {
            console.log('Error: The sender is not administrator!!!',);
            const ipfs_hash_1 = await assetContract.methods.getIpfsHash(tokenId1).call();
            
            console.log('original ipfs hash: ', ipfsHash1)
            console.log('after calling change in ipfs: ',ipfs_hash_1); 
        }

    });

    it('changeDataHash() - ONLY ADMINISTRATOR CAN CHANGE DATAHASH, OTHERS CAN\'T', async () => {

        var newDataHash_1 = "newDataHash 1";
        var tokenId1, dataHash1, ipfsHash1; var tokenId2, dataHash2, ipfsHash2;

        tokenId1 = "Token 1"; dataHash1 = "Datahash 1"; ipfsHash1 = "Ipfshash 1";
        tokenId2 = "Token 2"; dataHash2 = "Datahash 2"; ipfsHash2 = "Ipfshash 2";

        try{
            await assetContract.methods.addToken(tokenId1, dataHash1, ipfsHash1).send({from: accounts[0], gas: 1000000});

            await assetContract.methods.addToken(tokenId2, dataHash2, ipfsHash2).send({from: accounts[0], gas: 1000000});

            await assetContract.methods.changeDataHash(tokenId1, newDataHash_1).send({from: accounts[1], gas: 1000000});

            assert(false);
            console.log('It should not reach here.')
        }
        catch(err) {
            console.log('Error: The sender is not administrator!!!',);
            const data_hash_1 = await assetContract.methods.getIpfsHash(tokenId1).call();
            
            console.log('original data hash: ', dataHash1);
            console.log('after calling change in data: ',data_hash_1); 
        }

    });


});

describe('DashBoard Test.', () => {

    it('addToDashBoard(),getDetails(),Dashboard - One can add action strings to dashboard.', async () => {

        const action_1 = "Vendor 4215 created asset 'Tnk1256'";
        const action_2 = "Vendor 4215 transfered asset 'Tnk1256' to vendor 5623";

        await assetContract.methods.addToDashBoard(action_1).send({from: accounts[1], gas: 1000000});
        await assetContract.methods.addToDashBoard(action_2).send({from: accounts[1], gas: 1000000});
    
        const action_result = await assetContract.methods.getAllActions().call();
        
        console.log("All actions: ", action_result);
        assert.equal(action_result.length, 2);

        const get_first_action = await assetContract.methods.dashBoard(0).call();
        assert.equal(get_first_action, action_1);

        const get_second_action = await assetContract.methods.dashBoard(1).call();
        assert.equal(get_second_action, action_2);

    });
});


