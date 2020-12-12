import React from 'react';
import {Link} from 'react-router-dom';

import '../style.css';

class Card extends React.Component {

    state = {
        entity: '',
        title: '',
        linkto: '',
        imgUrl: '',
        description: ''
    }

    componentDidMount = () => {

        this.setState({
            entity: this.props.entity
        });

        if(this.props.entity === "admin") {
            this.setState({
                linkto : "/adminlogin",
                imageUrl: "https://cdn3.iconfinder.com/data/icons/business-vol-21/100/Artboard_9-512.png",
                description: "This is the administrator's login. Please click below if you are a administrator only!" 
            });
        }

        if(this.props.entity === "vendor") {
            this.setState({
                linkto : "/vendorlogin",
                imageUrl: "https://cdn1.iconfinder.com/data/icons/line-design-business-set-4/21/report-vendor-512.png",
                description: "This is the Vendor's login. Please click below if you are a Vendor only!" 
            });
        }

    }

    render() {
        return (
            <div className="ui raised card">

                <div className="image">
                    <img alt="img" src={this.state.imageUrl}/>
                </div>

                <div className="content">
                    <a className="header">{this.state.title}</a>
                    <div className="description">
                        {this.state.description}
                    </div>
                </div>
                
                <div className="extra content">
                    <Link to={this.state.linkto}>
                        <button className="ui right labeled icon button">
                            <i className="right arrow icon"></i>
                            Login
                        </button>
                    </Link>
                </div>

            </div>
        );
    }

}

export default Card;