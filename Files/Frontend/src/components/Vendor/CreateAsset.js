import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Message} from 'semantic-ui-react';

import AssetForm from './AssetForm';

class CreateAsset extends React.Component {
    
    render() {
        // console.log('location:',this.props.location);
        
        return (
            <div className="ui container">
            <div>
                <Message
                    attached
                    header='Welcome vendor!'
                    content='Please fill out the details below. You have already been given a TokenId'
                />
            </div>
            
            <div className="ui segment">
                <AssetForm vendorID={this.props.location.state.vendorID} name={this.props.location.state.company}/>
            </div>

            </div>
        );
    }

}

export default CreateAsset;