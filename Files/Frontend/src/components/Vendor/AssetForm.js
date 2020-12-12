import React from 'react';
import axios from 'axios';

import sha256 from 'sha256';

import ipfs from '../../ipfs';
import Spinner from '../../Spinner';
import AssetAdded from './AssetAdded';

import web3 from '../../web3';
import assetContract from '../../assetContract';

class AssetForm extends React.Component {

    state = {
        vendorID:'',

        name: '',
        tokenID : '',
        material: '',
        description: '',
        weight: '',

        isAdded: false,
        onSubmitClick: false,

        ipfsHash: null,
        dataHash: null,
        buffer:''
    }
    

    componentDidMount = async() => {

        console.log('vendorId: ', this.props.vendorID);

        this.setState({
            vendorID: this.props.vendorID,
            name: this.props.name
        });

        const result = await axios.get('http://localhost:5000/assets/');
        // console.log(result.data);

        const allObjects = result.data;
        const allTokenID = [];

        allObjects.map((obj) => 
            allTokenID.push(obj.tokenID)
            );

        var number = result.data.length+1;
        var temp = Math.random().toString(36).substr(2, 5);
        var newTokenId = `Tkn${temp}${number}`;

        while(true){
            if(newTokenId in allTokenID){
                temp = Math.random().toString(36).substr(2, 5);
                newTokenId = `Tkn${temp}${number}`;
                continue;
            }
            else{
                this.setState({
                    tokenID: newTokenId
                });
                break;
            }
        }

        console.log("Component loaded & isAdded value: ",this.state.isAdded);

    };

    captureFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const file = event.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => this.convertToBuffer(reader);
    };
  
    convertToBuffer = async(reader) => {
        const buffer = await Buffer.from(reader.result);
        this.setState({
            buffer  
        });
    };

    onFormSubmit = async(event) => {

        this.setState({
            onSubmitClick: true
        });

        event.preventDefault();

        //add th file to iphs hash and get result back
        const iph =  await ipfs.add(this.state.buffer);
        
        //we get an array; so set the iphs hash appropriately
            this.setState({
                ipfsHash:iph[0].hash 
            });

        //create a date to be stored.
        var dateCreatedLocale = (new Date()).toLocaleTimeString();

        //create temporary variables for AASETDETAILS.
        var t_tokenID = this.state.tokenID;
        var t_description = this.state.description;
        var t_material = this.state.material;
        var t_weight = this.state.weight;
        var t_dateCreated = dateCreatedLocale;
        
        const newToken = {
            vendorID: this.state.vendorID,  //to add to specific vendor only

            tokenID: t_tokenID,             //to store in database - the details
            description: t_description,
            material: t_material,
            weight: t_weight,
            dateCreated: t_dateCreated
        }

        //  axios.post('http://localhost:5000/assets/add',newToken)
        //     .then((res) => {
        //                 this.setState({isAdded: true});
        //                 console.log('isadded is true');
        //                 console.log("RESPONSE: ",res);
        //             })
        //     .catch((err) => console.log('error!'));

        try{
            const addResult = await axios.post('http://localhost:5000/assets/add',newToken);
            
            console.log("RESPONSE: ",addResult);

            const assetD = addResult.data.fetchAsset;

            this.setState({
                dataHash: sha256(assetD)
            });

            const dataToAdd = {
                tokenID: this.state.tokenID,
                ipfsHash: this.state.ipfsHash,
                dataHash: this.state.dataHash,
            }

            try{
                const addDataResult = await axios.post('http://localhost:5000/assets/addData',dataToAdd);
                console.log(addDataResult.data.message);
                console.log(addDataResult.data);

                //=================================================================================================================
                //=================================================================================================================
                //                                         ADDING TO BLOCKCHAIN!!!!!!!!
                //=================================================================================================================
                //=================================================================================================================

                try{
                    const accounts = await web3.eth.getAccounts();

                    // addToken(string memory tokenID, string memory dataHash, string memory ipfsHash)
                    const txObj = await assetContract.methods
                                    .addToken(this.state.tokenID, this.state.dataHash, this.state.ipfsHash)
                                    .send({
                                        from: accounts[0]
                                    });

                    //add the action to dashboard.
                    const actionString = `${(new Date()).toLocaleString()} || Asset ${this.state.tokenID} was created by vendor ${this.state.vendorID}`; 
                    
                    console.log(actionString);

                    var added = null;
                    added = await assetContract.methods
                                    .addToDashBoard(actionString)
                                    .send({
                                        from: accounts[0]
                                    }); 
                    
                    //no of assets.
                    const noofa = await assetContract.methods.no_of_assets().call();

                    if(added !== null){
                        this.setState({
                            isAdded: true,
                            onSubmitClick: false
                        });
                    }
                    
                    console.log("HERE'S the transcation: ",txObj);

                    console.log("No of assets: ",noofa);

                }catch {
                    console.log("Error writing the data onto the blockchain!!")
                }   
                


            } catch{
                console.log("Error adding the asset data (hash) details.")
            }
            
        }
        catch{
            console.log('Rrror in adding asset!');
        }

            console.log("Asset added & isAdded value: ",this.state.isAdded);
            

    }
    

    render() {
        return (
            <div className="ui container center p-5">
                
                <form className="ui form w-75 m-auto" onSubmit={this.onFormSubmit}>

                    <div className="field">
                        <label>TokenId</label>
                        <input required value={this.state.tokenID} style={{backgroundColor: 'darkgray', color: 'black'}} readOnly/>
                    </div>

                    <div className="field">
                        <label>Material</label>
                        <input required placeholder="Material" value={this.state.material} onChange={(e)=>this.setState({material: e.target.value})}/>
                    </div>
                    
                    <div className="field">
                        <label>Weight</label>
                        <input required placeholder="Weight" value={this.state.weight} onChange={(e)=>this.setState({weight: e.target.value})} />
                    </div>

                    <div className="field">
                        <label>Description</label>
                        <textarea required rows="2" style={{marginTop: '0px', marginBottom: '0px', height: '72px'}} 
                                    value={this.state.description} onChange={(e)=>this.setState({description: e.target.value})}></textarea>
                    </div>
                    


                    <div className="ui divider">

                    </div>

                    {/* <div className="ui m-2">
                        <p>Please select a certificate here.</p>
                        <input type="file"
                                onChange={this.captureFile}
                        />
                    </div> */}

                    <div className="ui container m-2 header">
                        <div className="column">
                            <div className="ui raised segment">
                                <p className="ui red ribbon label m-0"> Please choose a certificate. (.pdf, .xlsx, .jpg, .jpeg, .doc, .docx) </p>
                            
                                <input className="ui transparent m-0 p-1 border-0" type="file" accept=".pdf, .xlsx, .jpg, .jpeg, .doc, .docx"
                                onChange={this.captureFile}
                                />   
                            
                            </div>
                        </div>
                    </div>
 
                    <div className="ui divider">

                    </div>    
                      
                    <button type="submit" className="ui button">Submit</button>

                </form>
                
                <div className="ui divider"></div>
                <div>
                    {this.state.isAdded ? <AssetAdded tokenID={this.state.tokenID} vendorID={this.state.vendorID} name={this.state.name} /> : null}
                    {(this.state.onSubmitClick && !this.state.isAdded) ? <Spinner message="Please wait while we update..." warn="Check your metamask extension and confirm Both transaction!!" /> : null}

                </div>
            </div>
        );
    }

}

export default AssetForm;