import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import VendorOptions from './VendorOptions';

class Vendor extends React.Component {
    
    

    constructor(props) {
        super(props);

        this.state = {
            vendorID : '',            //this id will be passes to vendoroptions 
            company: '',
            isMounted: '',
        }
    }

    // onInputChange = (event) => {
    //     this.setState({vendorID : event.target.value })
    // }
    componentDidMount() {
        
        const vid = this.props.location.state.vendorID;
        // console.log('vid: ',vid);

        const cname = this.props.location.state.company;
        // console.log('cname: ',cname);

        this.setState({
            vendorID: vid,
            company: cname,
            isMounted: true
        });


        
    }
    

    render() {

        return (
                <div className="ui container">

                  {this.state.isMounted ? <VendorOptions vendorID={this.state.vendorID} company={this.state.company}/> : null}  
                    
                </div>

        );
    }

}

export default Vendor;