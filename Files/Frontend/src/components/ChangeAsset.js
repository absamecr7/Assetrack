import React from 'react';

import web3 from '../web3';
import assetContract from '../assetContract';

import Spinner from '../Spinner';

import { Button, Header, Form } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';

// const SuccessMessage = (props) => {
//     return (
//         <div className="ui success message transition hidden">
//             <i className="close icon"></i>
//             <div className="header">
//                 Updating hash was successful.
//             </div>
//             <p>You may now go back from <Link to="/adminpage" style={{textDecoration: 'none'}}>here</Link></p>
//         </div>
//     );
// }

class ChangeAsset extends React.Component {
    state = {
        tokenID: '',
        account: null,
        newDataHash: '',
        newIpfsHash: '',

        showForm: false,
        formIsSubmitted: false,

        changeDataHash : false,
        changeIpfsHash : false,

        showSpinner: false,
        isErrorUpdating: false
        
    }

    componentDidMount = async() => {
        
        
        try{
            const accounts = await web3.eth.getAccounts();

            this.setState({
                account: accounts[0]
            })

        } catch {
            alert("Error fetching acocunts!!");
        }  

        console.log("accout: ", this.state.account);
    }

    onChangeDataHash = () => {

        this.setState({
            showForm: true,
            changeDataHash: true,
            changeIpfsHash: false
        });
        
    }

    onChangeIpfsHash = () => {

        this.setState({
            showForm: true,
            changeIpfsHash: true,
            changeDataHash: false
        });
    }

    onFormSubmit = async() => {

        this.setState({
            formIsSubmitted: true,
            showSpinner: true
        });

        try{
            if(this.state.changeDataHash && !this.state.changeIpfsHash) {

                const oldDataHash = await assetContract.methods.getDataHash(this.state.tokenID).call();
                console.log("oldDataHash:",oldDataHash);

                await assetContract.methods
                        .changeDataHash(this.state.tokenID, this.state.newDataHash)
                        .send({
                            from: this.state.account
                        });
                    
                const updatedDataHash = await assetContract.methods.getDataHash(this.state.tokenID).call();

                console.log("eneterd hash: ",this.state.newDataHash);
                console.log("updatedDataHash:",updatedDataHash);

                if(oldDataHash !== updatedDataHash && updatedDataHash === this.state.newDataHash) {
                    this.setState({
                        showSpinner:false,
                    });
                    alert("Updatedd the hash!!");
                }
    
            }
    
            if(!this.state.changeDataHash && this.state.changeIpfsHash) {

                const oldIpfsHash = await assetContract.methods.getIpfsHash(this.state.tokenID).call();
                console.log("oldIpfsHash:",oldIpfsHash);

                await assetContract.methods
                        .changeIpfsHash(this.state.tokenID, this.state.newIpfsHash)
                        .send({
                            from: this.state.account
                        });
                
                const updatedIpfsHash = await assetContract.methods.getIpfsHash(this.state.tokenID).call();

                console.log("updatedIpfsHash:",updatedIpfsHash);

                if(oldIpfsHash !== updatedIpfsHash && updatedIpfsHash === this.state.newIpfsHash) {
                    this.setState({
                        showSpinner:false
                    });
                    console.log("hash updated");
                    alert("updated hash");
                }
                }
                
            }
        catch{
            console.log("Error updating the hash!!");
            alert("Error updating the hash!!");

            this.setState({
                isErrorUpdating: true
            });

        }

        
    }

    render() {
        return (
            <div className="ui container">

                <div className="ui placeholder segment mb-3 p-4">

                    <div className="ui two column stackable center aligned grid">
                        <div className="ui vertical divider">Or</div>
                        
                            <div className="middle aligned row">

                                    <div className="column">
                                        <div className="ui icon header">
                                        <i className="pen square icon"></i>
                                            
                                        </div>
                                        <div className="field card-component">
                                        <div className="ui card">
                                        <div className="content">
                                            <div className="header">Data</div>
                                            <div>(In case you changed the data)</div>
                                        </div>
                                        <div className="content">
                                            <div className="ui small feed">
                                        
                                            <div className="event">
                                                <div className="content">
                                                <div className="summary p-2 text-center">
                                                    Click below to change the <span style={{color: 'red'}}>DATA</span> hash.
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        
                                        <div className="extra content" onClick={this.onChangeDataHash}>
                                            <div className="ui positive basic button pl-5 pr-5">
                                                Change
                                            </div>
                                        </div>

                                        </div>
                                        </div>
                                    </div>

                                    <div className="column">
                                        <div className="ui icon header">
                                        <i className="pen square icon"></i>
                                            
                                        </div>
                                        <div className="field card-component">
                                        <div className="ui card">
                                        <div className="content">
                                            <div className="header">Certificate</div>
                                            <div>(In case you changed the certificate)</div>
                                        </div>
                                        <div className="content">
                                            <div className="ui small feed">
                                        
                                            <div className="event">
                                                <div className="content">
                                                <div className="summary p-2 text-center">
                                                    Click below to change the <span style={{color: 'red'}}>IPFS</span> hash.
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        
                                        <div className="extra content" onClick={this.onChangeIpfsHash}>
                                            <div className="ui positive basic button pl-5 pr-5">
                                                Change 
                                            </div>
                                        </div>

                                        </div>
                                        </div>
                                    </div>
                            
                            </div>

                            <div className="ui row">
                            <div className="ui orange message">Make sure you have the correct hash.</div>
                            </div>
                        </div>
                    </div>

                    <div className="ui divider"></div>

                    <div>
                        {this.state.showForm ? 
                            <div className="ui card w-50 text-center p-3 m-auto">
                                {this.state.showForm && this.state.changeDataHash ? <div className="ui w-50 m-auto">
                                    <Header icon="archive" content="" className="ui text-center" />
                                        
                                        <Form className="ui text-center">
                                            <Form.Field>
                                                <label  className="text-center">Enter TokenID of the required asset</label>
                                                <input  className="text-center" value={this.state.tokenID} placeholder="Token ID" onChange={(e) => {this.setState({tokenID : e.target.value})}} />
                                            </Form.Field>
                                            <Form.Field>
                                                <label  className="text-center">Enter New Data hash</label>
                                                <input  className="text-center" placeholder="Data hash" value={this.state.newDataHash} onChange={(e) => {this.setState({newDataHash : e.target.value})}} />
                                            </Form.Field>
                                            <Button type="submit" onClick={this.onFormSubmit} >Submit</Button>
                                        </Form>
                                </div> : null }

                                {this.state.showForm && this.state.changeIpfsHash ? <div className="ui w-50 m-auto">
                                    <Header icon="archive" content="" className="ui text-center" />
                                        
                                        <Form className="ui text-center">
                                            <Form.Field>
                                                <label  className="text-center">Enter TokenID of the required asset</label>
                                                <input  className="text-center" value={this.state.tokenID} placeholder="Token ID" onChange={(e) => {this.setState({tokenID : e.target.value})}} />
                                            </Form.Field>
                                            <Form.Field>
                                                <label  className="text-center">Enter New Ipfs hash</label>
                                                <input  className="text-center" placeholder="Ipfs hash" value={this.state.newIpfsHash} onChange={(e) => {this.setState({newIpfsHash : e.target.value})}} />
                                            </Form.Field>
                                            <Button type="submit" onClick={this.onFormSubmit} >Submit</Button>
                                        </Form>
                                </div> : null }
                            </div> : null}
                        </div>

                    <div className="ui divider"></div>
                    
                    <div>
                        {(this.state.showSpinner && !this.isErrorUpdating) ? <Spinner message="Please wait. We are updating the data." warn="Check your metamask extension and confirm the transaction."/> : null }
                        
                        {/* {(!this.state.showSpinner && this.state.formIsSubmitted) ? <div> Go back from <Link to="/adminpage">here</Link></div> : null} */}
                        
                    </div>

            </div>

        );
    }
}

export default ChangeAsset;