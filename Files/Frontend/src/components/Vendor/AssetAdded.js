import React from 'react';
import {Link} from 'react-router-dom'; 

class AssetAdded extends React.Component {

    state = {
        vendorID: '',
        name: ''
    }

    componentDidMount = () => {

        this.setState({
            vendorID: this.props.vendorID,
            name: this.props.name            
        });
        // console.log(this.props.vendorID);
        // console.log(this.props.name);
    }

    render() {
        return (
            <div>
                        
                <div className="ui text-center success message m-5 p-5">
                    <div className="content">
                        <div className="header">Way to go vendor!</div>
                        <p> Asset with TokenID {this.props.tokenID} was succesfully added in inventory!</p>

                        <Link to={{
                                    pathname:'/vendor',
                                    state:{vendorID : this.props.vendorID, company: this.props.name}                                    
                            }} 
                            style={{textDecoration: 'none'}}>

                            <div className="ui positive basic button pl-5 pr-5">
                                Head's back to vendor
                            </div>                        

                        </Link>

                    </div>
                </div>
                

            </div>
        );
    }
  
}

export default AssetAdded;