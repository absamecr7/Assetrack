import React from 'react';
import { 
            BrowserRouter, 
            Route,
            Redirect
        } from 'react-router-dom';

// import web3 from '../web3';
import Navbar from './Navbar';
import Certificate from './Certificate';
import DashBoard from './DashBoard';
import HomeComponent from './HomeComponent';
import VendorLogin from './Vendor/VendorLogin';
import Vendor from '../components/Vendor/Vendor';
import TransferAsset from './Vendor/TransferAsset';
import CreateAsset from './Vendor/CreateAsset';
import AdminLogin from '../components/AdminLogin';
import AdminOptions from './AdminOptions';
// import NoMatch from './NoMatch';



class App extends React.Component {

    render(){

        

        return (
            <div className="ui container" style={{marginTop: '10px'}}>
            <BrowserRouter>
                    <div>
                    <Navbar />

                            <Route exact path="/Home"  component={HomeComponent} />

                            <Route exact path="/">
                                <Redirect to="/Home" />
                            </Route>

                            <Route exact path="/dashboard" component={DashBoard} />
                            <Route exact path="/certificate" component={Certificate} />

                            

                            <Route exact strict path="/vendorlogin" component={VendorLogin} />
                            <Route exact strict path="/vendor" component={Vendor} />

                            <Route exact strict path="/adminlogin" component={AdminLogin} />
                            <Route exact strict path="/adminpage" component={AdminOptions} />

                            <Route exact strict path="/transferassets" component={TransferAsset} />
                            
                            <Route exact path="/createasset" strict component={CreateAsset} />
                            
                            
                    </div>
                </BrowserRouter>
            </div>
        );
    }

};

export default App;