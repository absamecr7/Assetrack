pragma solidity >=0.4.25;
pragma experimental ABIEncoderV2;

contract assetMonitor {

    //to store who created this contract
    address public administrator;

    //to store number of tokens/assets stored.
    uint public no_of_assets;

    //Stores all the tokenIDs
    string[] public Tokens;

    struct AssetData {                                                                                  //Stores the hashes of assets
        string dataHash;
        string ipfsHash;
    }

    //Maps each tokenID to its data and ipfs hash.
    mapping(string => AssetData) private AssetDataDetails;

    //Stores all previous actions.
    string[] public dashBoard;

    //custom modifier to check if the sendr is the administrator or not
    modifier restrictedToAdministrator() {

        require(
            msg.sender == administrator,
            "Sendor is not administrator"
        );
        _;
    }

    constructor() public {
        administrator = msg.sender;
        no_of_assets = 0;
    }


    // Add a token in contract
    function addToken(string memory tokenID, string memory dataHash, string memory ipfsHash) public  {

        // Check if token is already present or not
        require(
            !isTokenPresent(tokenID),
            "Token is already present"
        );

        // create a new struct instance
        AssetData memory newAsset = AssetData({
            dataHash: dataHash,
            ipfsHash: ipfsHash
        });

        // AssetData memory newAsset = AssetData(dataHash, ipfsHash);

        // add the tokenID=>struct mapping to AssetDataDetails
        AssetDataDetails[tokenID] = newAsset;

        // add the tokenID to Tokens array
        Tokens.push(tokenID);

        // increment no of tokens by 1
        no_of_assets = no_of_assets + 1;

    }

    //get the data about a particular tokenID
    function getDetails(string memory tokenID) public view returns(AssetData memory) {

       AssetData memory asset = AssetDataDetails[tokenID];

        return asset;
    }

    function changeDataHash(string memory tokenID, string memory newDataHash) public restrictedToAdministrator {

        AssetData storage assetToChange = AssetDataDetails[tokenID];

        assetToChange.dataHash = newDataHash;

    }

    function changeIpfsHash(string memory tokenID, string memory newIpfsHash) public restrictedToAdministrator {

        AssetData storage assetToChange = AssetDataDetails[tokenID];

        assetToChange.ipfsHash = newIpfsHash;

    }


    // get the data hash of a particular token
    function getDataHash(string memory tokenID) public view returns (string memory){

        AssetData memory tempAsset = AssetDataDetails[tokenID];

        return tempAsset.dataHash;
    }

    // get the ipfs hash of a particular token
    function getIpfsHash(string memory tokenID) public view returns (string memory){

        AssetData memory tempAsset = AssetDataDetails[tokenID];

        return tempAsset.ipfsHash;
    }

    //check if the token is present or not
    function isTokenPresent(string memory tokenID) private view returns (bool) {

        string memory givenTokenID = tokenID;

        //Loop through array, check to see if we have a string whose hash matches the hash of given string.
        for(uint8 i = 0; i < no_of_assets; i++) {
            
            if(keccak256(abi.encodePacked(Tokens[i])) == keccak256(abi.encodePacked(givenTokenID))) {
                return true;
            }
      }

        return false;

    }

    // Add actions to dashBoard
    function addToDashBoard(string memory message) public {
        dashBoard.push(message);
    }

    //Return dashBoard which has all actions.
    function getAllActions() public view returns(string[] memory) {
        return dashBoard;
    }

    function getDashBoard() public view returns(string memory){

        string memory dashBoard_string = dashBoard[0];

        for(uint i = 1; i < dashBoard.length; i++){
            dashBoard_string = append(dashBoard_string, '||||', dashBoard[i]);
        }

        return dashBoard_string;

    }

    function append(string memory a, string memory b, string memory c) internal pure returns (string memory) {

        return string(abi.encodePacked(a, b, c));

    }

}

