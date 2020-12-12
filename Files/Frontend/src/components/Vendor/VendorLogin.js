import React from 'react';
//import {Link, BrowserRouter, Redirect} from 'react-router-dom';
import { Button, Header, Form } from 'semantic-ui-react';
import axios from 'axios';
import DisplayCompany from './DisplayCompany';

const DisplayError= () => {
    return (
        <div className="ui negative message">
            <div className="header">We&#x27;re sorry we can&#x27;t find anyone with this vendorID</div>
            <p>Please try again</p>
        </div>
    );
}

class VendorLogin extends React.Component {
    
    state = {
        vendorID : '',
        password : '',
        company: '',
        isNotPresent: false
    }
    
    onFormSubmit = async () => {
        const result = await axios.get('http://localhost:5000/entities/find/'+this.state.vendorID);

        if(result.data === false) {
            this.setState({
                isNotPresent: true
            });
        }
        else{
            this.setState({
                company: result.data.company,
                isNotPresent: false
            });
            
        }
  
    }

    render() {
        return (
                <div className="ui segment text-center m-3 animated fadeIn">
                    
                    <div className="ui segment header text-center">
                        <p>Please provide login details</p>
                    </div>

                    <div className=" ui container text-center w-50">
                        <Header icon="archive" content="Enter credentials" />
                            <Form>
                                <Form.Field>
                                    <label  className="text-center">Enter vendor ID</label>
                                    <input  className="text-center" value={this.state.vendorID} placeholder="Vendor ID" onChange={(e) => {this.setState({vendorID : e.target.value})}} />
                                </Form.Field>
                                <Form.Field>
                                    <label  className="text-center">Enter password</label>
                                    <input  className="text-center" placeholder="Password" value={this.state.password} onChange={(e) => {this.setState({password : e.target.value})}} />
                                </Form.Field>
                                <Button type="submit" onClick={this.onFormSubmit} >Submit</Button>
                            </Form>

                            {this.state.company.length > 0 && this.state.company !== '' ? <DisplayCompany name={this.state.company} vendorID={this.state.vendorID} /> : null}
                            {this.state.isNotPresent === true ? <DisplayError/> : null}
                            
                    </div>


                    <br/>
                    

                    

                </div>
        );
    }

}

export default VendorLogin;