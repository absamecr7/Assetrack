import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import ChangeAsset from './ChangeAsset';

class AdminOptions extends React.Component {

    state = {
        admin: '',
        name: '',
        adminAccount: '',

        addNewEntity: false,
        changeAsset: false,
        changeEntity: false
    }

    componentDidMount = async() => {
        this.setState((prevState, props) => ({
            addNewEntity: false,
            changeAsset: false,
            changeEntity: false
          })
        );
    }

    onAddNewEntity = () => {
        this.setState((prevState, props) => ({
            addNewEntity: true,
            changeAsset: false,
            changeEntity: false
          })
        );
    }

    onChangeAsset = () => {
        this.setState((prevState, props) => ({
            addNewEntity: false,
            changeAsset: true,
            changeEntity: false
          })
        );
    }

    onChangeEntity = () => {
        this.setState((prevState, props) => ({
            addNewEntity: false,
            changeAsset: false,
            changeEntity: true
          })
        );
    }

    render() {
        
        return (
            <div className="ui animated fadeIn">

                <div className="ui segment text-right">
                    <i className="user icon  large d-inline"></i>
                </div>

                <div className="ui success message text-center w-50 m-auto">
                  
                    <div className="header">
                        Welcome Admin!!
                    </div>
                    <p>Choose from the below functions.</p>
                </div>


                <div className="ui three cards m-auto">

                    {/* ADD NEW ENTITY */}
                    <div className="ui blue raised card">
                        <div className="content">
                            <div className="header text-center">Add entities</div>
                            <div className="ui divider"></div>
                            <div className="description">
                                <p>You can add new entities here.</p>
                                <p>Be sure to first have all the details of the entity you want to add.</p>
                            </div>
                        </div>
                        <div className="ui bottom attached button" onClick={this.onAddNewEntity}>
                            <i className="add icon"></i>
                            Add new Entity
                        </div>
                    </div>

                    {/* CHANGE ENTITY DETAILS */}
                    <div className="ui blue raised card">
                        <div className="content">
                            <div className="header text-center">Change entity details</div>
                            <div className="ui divider"></div>
                            <div className="description">
                                <p>You can change the details of any of the entities here.</p>
                                <p>Changes made here <b>are not</b> reflected in the previously added data.</p>
                            </div>
                        </div>
                        <div className="ui bottom attached button" onClick={this.onChangeEntity}>
                            <i className="write icon"></i>
                            Change entity details
                        </div>
                    </div>

                    {/* CHANGE ASSET DETAILS */}
                    <div className="ui blue raised card">
                        <div className="content">
                            <div className="header text-center">Change asset details</div>
                            <div className="ui divider"></div>
                            <div className="description">
                                <p>You can change the details of any of the assets here.</p>
                                <p>Changes made here will be reflected in the database as well as <b>blockchain</b>.</p>
                                <p>Change the data, only if you are absolutely sure, as it <b>will</b> cost you money.</p>
                            </div>
                        </div>
                        <div className="ui bottom attached button" onClick={(e) => {
                            this.setState({addNewEntity: false,
                                            changeAsset: true,
                                            changeEntity: false});
                        }} >
                            <i className="write icon"></i>
                                Change asset details
                        </div>
                    </div>

                </div>

                {/* SHOWING CONDITIONAL COMPONENTS */}
                
                <div className="ui divider"></div>

                <div>
                    {this.state.addNewEntity ? null: null}
                    {this.state.changeAsset ? <ChangeAsset /> : null}
                    {this.state.changeEntity ? null: null}
                </div>

            </div>
        );
    }

}

export default AdminOptions;