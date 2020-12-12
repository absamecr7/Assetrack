import React from 'react';
import '../style.css';

import Card from '../extraComponents/NormalCard';

class HomeComponent extends React.Component {
    
    render() {
        return (
            <div className="ui">

                <div className="ui text-center segment mt-1">
                
                    <div className="ui huge header m-0" style={{fontSize: "4em"}}>
                        Welcome to AssetTracker.
                    </div>

                    <div className="ui medium header m-3">
                        We keep track of your assets for you.
                    </div>

                    {/* <div className="ui  grid mt-4">
                        <div class="ui two column row ">
                            <div class="column">
                                <Card entity={"admin"}/> 
                            </div>
                            <div class="column">
                                <Card entity={"vendor"}/> 
                            </div>

                        </div>                       
                    </div> */}

                    <div className="ui two cards w-50 m-auto">
                        <Card entity={"admin"}/> 
                        <Card entity={"vendor"}/> 
                    </div>



                </div>
                
            </div>
            
        );
    }

}

export default HomeComponent;