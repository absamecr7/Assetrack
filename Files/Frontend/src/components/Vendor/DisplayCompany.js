import React from 'react';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

class DisplayCompany extends React.Component {
    
    
    render() {
        return (
            <div className="ui raised segment header text-capitalize p-5 animated flipInY">
                Hii {this.props.name} !<br/>
                Welcome Back. Let's take you straight to your account.<br/>
                
                {/* <Link to="/vendor/">Let's GO!!</Link><br/> */}

                <Link to={{ 
                        pathname:'/vendor', 
                        state:{vendorID : this.props.vendorID, company: this.props.name}
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

}

export default DisplayCompany;