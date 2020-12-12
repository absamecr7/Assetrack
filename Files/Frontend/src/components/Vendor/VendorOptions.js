import React from 'react';
import {
        Link
        } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


class VendorOptions extends React.Component {

    state = {
        vendorID: '',
        name: ''
    }

    componentDidMount() {

        this.setState({
            vendorID: this.props.vendorID,
            name: this.props.company
        });
        
    }

    
    render() {
        
        return (
            <div className="ui container animated fadeIn">

                <div className="ui segment text-right">
                    <i className="user icon  large d-inline"></i>
                    <p className="p-0 m-0 text-capitalize">{this.props.company}</p>
                    <p className="p-0 m-0">{this.props.vendorID}</p>
                </div>

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
                            <div className="header">Assets Creation</div>
                        </div>
                        <div className="content">
                            <div className="ui small feed">
                           
                            <div className="event">
                                <div className="content">
                                <div className="summary p-2 text-center">
                                    Click below to Create new Assets
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="extra content">

                        <Link to={{
                                    pathname:'/createasset',
                                    state:{vendorID : this.props.vendorID, company: this.props.company}                                    
                            }} 
                            style={{textDecoration: 'none'}}>

                            <div className="ui positive basic button pl-5 pr-5" style={{}}>
                                Create
                            </div>

                            
                        </Link>
                           
                        </div>
                        </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui icon header">
                        <i className="truck icon"></i>
                        Transfer Assets
                        </div>

                        <div className="extra content">

                            <Link to={{
                                        pathname:'/transferassets', 
                                        state:{vendorID : this.props.vendorID, company: this.props.company}
                                    }}
                                    style={{textDecoration: 'none'}}>

                                <div className="ui positive basic button pl-5 pr-5">
                                Transfer
                                </div>

                            </Link>

                        </div>

                    </div>
                    </div>
                </div>
                </div>

            </div>
        );
    }

}

export default VendorOptions;