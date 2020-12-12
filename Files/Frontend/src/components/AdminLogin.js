import React from 'react';
//import {Link, BrowserRouter, Redirect} from 'react-router-dom';
import { Button, Header, Form } from 'semantic-ui-react';
// import axios from 'axios';
import { Link } from 'react-router-dom';

// const DisplayError= () => {
//     return (
//         <div className="ui negative message">
//             <div className="header">We&#x27;re sorry we can&#x27;t find anyone with this adminID</div>
//             <p>Please try again!!</p>
//         </div>
//     );
// }

const AdminDisplay = () => {
    return (
        <div className="ui raised segment header text-capitalize p-5 animated flipInY">
            Hii Admin!<br/>
            Welcome Back. Let's take you straight to your account.<br/>

            <Link to={{ 
                    pathname:'/adminpage'
                }} >

                <div className="ui animated button m-3">
                    <div className="visible content">Go to Account</div>
                    <div className="hidden content">
                        <i className="right arrow icon"></i>
                    </div>
                </div>

            </Link>

            <br/>
        </div>
    );
}

class AdminLogin extends React.Component {
    
    state = {
        adminID : '',
        password : '',
        isValid: false
    }
    
    onFormSubmit = async () => {

        // const result = await axios.get('http://localhost:5000/entities/find/'+this.state.adminID);
    
        //do something
        this.setState({
            isValid: true
        });
  
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
                                    <label  className="text-center">Enter credentials</label>
                                    <input  className="text-center" value={this.state.adminID} placeholder="Admin ID" onChange={(e) => {this.setState({adminID : e.target.value})}} />
                                </Form.Field>
                                <Form.Field>
                                    <label  className="text-center">Enter password</label>
                                    <input  className="text-center" placeholder="Password" value={this.state.password} onChange={(e) => {this.setState({password : e.target.value})}} />
                                </Form.Field>
                                <Button type="submit" onClick={this.onFormSubmit} >Submit</Button>
                            </Form>
    
                    </div>

                    {this.state.isValid ? <AdminDisplay /> : null}



                    <br/>
                    

                    

                </div>
        );
    }

}

export default AdminLogin;