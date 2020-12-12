import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

// import web3 from '../web3';
import assetContract from '../assetContract';

import CardsComponent from '../extraComponents/CardsComponent';

class DashBoard extends React.Component {
    
    state = {
        allActions: [],
        gotActions: false
    }

    componentDidMount = async () => {
        
        try{
            // const accounts = await web3.eth.getAccounts();

            console.log("up");
            const actions_from_contract = await assetContract.methods.getAllActions().call();
            console.log(actions_from_contract);
            console.log("down");

            const actions = [];
            for(var i = actions_from_contract.length - 1; i >= 0 ; i--) {

                var part1 = actions_from_contract[i].split("||")[0].trim();
                var part2 = actions_from_contract[i].split("||")[1].trim();

                var obj = {
                    key: i,
                    header: part1.substring(0,9),
                    description: part2,
                    meta: part1.substring(11)  
                }

                actions.push(obj);                

            }

            this.setState({
                allActions : actions,
                gotActions: true
            });
            
        }
        catch{
            console.log("Error getting the actions!!!");
        }

    }

    render() {

        return (
            <div className="ui container background-image-black text-center p-5">
                
                <div className="ui container pt-4 pb-2 mb-4 text-center w-50" style={{border: "3px solid black", borderRadius:"20px"}}>
                    <h2 className="ui center aligned icon header">
                        <i className=" massive dolly flatbed icon header"></i>
                        <p style={{color: "black"}}>See what has happened till date!!</p>
                    </h2>
                </div>

                <div className="ui segment w-100 m-auto header text-center">
                    {this.state.gotActions ? <CardsComponent items={this.state.allActions}/> : null }
                </div>
                
                

            </div>
        );
    }

}

export default DashBoard;