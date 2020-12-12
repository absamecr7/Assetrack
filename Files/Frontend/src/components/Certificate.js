import React from 'react';
import ViewCertificate from './ViewCertificate';
import axios from 'axios';

class Certificate extends React.Component {

    state = {
        tokenID: '',
        link: null
    }
    
    onInputChange = (event) => {
        this.setState({tokenID: event.target.value});
    }

    getLink = async () => {
        console.log("you clicked");

        try{
            const result = await axios.get('http://localhost:5000/assets/getipfs/'+ this.state.tokenID);
            console.log(result);
            
            const ipfshash = result.data.ipfsHash;
            console.log(ipfshash);

            const prefix = "https://gateway.ipfs.io/ipfs/";


            console.log(prefix + ipfshash);

            this.setState({
                    link: String(prefix+ipfshash
                )});

            console.log(this.state.link);
        }
        catch(err){
            console.log('Error getting hash!');
            this.setState({
                link: "Could not fetch the ipfs link for the above tokenID"
            })
        }

    }

    render() {
        return (
            <div className="ui container">
                <div className="ui placeholder segment">
                    <div className="ui icon header">
                        <i className="search icon"></i>
                        <p>Please Enter the Token Id of your product below.</p>
                        < br/>
                        <h6>It is a number given to you along with the material. Scan the QR code if unable to find.</h6>
                    </div>
                    <div className="field">
                        <div className="ui search">
                            <div className="ui icon input">
                                <input className="prompt" type="text" value={this.state.tokenID} onChange={this.onInputChange} placeholder="Enter token id"/>                                    
                                <i className="search icon"></i>
                            </div>
                            
                            <div className="ui vertical animated button segment">
                                <div className="visible content">View Certificate</div>
                                <div className="hidden content">
                                    <i className="right arrow icon" onClick={this.getLink}></i>
                                </div>
                            </div>                           
                            <div className="results"></div>
                        </div>
                                
                    </div>
                </div>
                <div className="ui divider"></div>

                <ViewCertificate link={this.state.link}/>
            
            </div>

            
        );
    }

}

export default Certificate;