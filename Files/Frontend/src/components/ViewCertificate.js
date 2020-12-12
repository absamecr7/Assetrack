import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

class ViewCertificate extends React.Component {
    
    render() {
        if(this.props.link !== null){
            return (
                <div className="ui container animated flipInX">
                    <div className="ui placeholder segment">
                        <div className="ui icon header">
                            <i className="newspaper icon"></i>
                            Click the link below to view your document.
                        </div>

                        <div className="ui container">
                            {/* <a href={this.props.link}> {this.props.link} </a> */}
                            <button className="ui raised positive basic button p-2" onClick={()=>window.open(this.props.link)}> View Certificate </button>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return <div></div>
        }
    }

}

export default ViewCertificate;