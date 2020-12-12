import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const NoAssetsWarning = () => {
	return (
		<div className="ui warning message">
			<div className="header">It seems you don't have enough assets to transfer as of now!!</div>
			<p>Come back once you have some.</p>
		</div>
	);
}

class DropdownMultiple extends React.Component {

    state = {
        allTokens: [],
        option: [],
        tokens : [],
        haveAssets: true,
        optionsUpdated: false,
        doneClicked: false
    }

    onTokenSubmit= (event) => {
        event.preventDefault();
        this.setState({
            doneClicked: true
        });
        this.props.onSubmit(this.state.tokens);
    }

    componentDidMount() {

        this.setState({
            allTokens: this.props.allTokens,
            options: this.props.options,
            optionsUpdated: true
        });

        if(this.props.allTokens.length === 0) {
            this.setState({
                haveAssets: false
            });
        }

    }

    render() {

        console.log("passed options: ",this.props.options);
        console.log("alltokens: ",this.state.allTokens);
        console.log("hasAssets: ", this.state.haveAssets);
        
        if(this.state.optionsUpdated){
            return (
                <div className="ui container text-center">
                    
                    {this.state.haveAssets ? <div className="ui">
                        <Dropdown placeholder="Select tokens to transfer" fluid multiple selection 
                            options={this.props.options} 
                            onChange={(e, {value}) => {
                                            this.setState({
                                                tokens: value
                                            })
                                        }
                            }       
                        />

                    </div> : <NoAssetsWarning />}
                    
                    <div className="ui icon button m-4 p-2 text-center positive basic" 
                            onClick={this.onTokenSubmit}
                            data-tooltip="Make sure you select all the assets you need!" 
                            data-position="bottom center"
                            data-inverted="">
                        <p className=""><i className="check icon"></i>DONE</p>
                    </div>

                    {this.state.doneClicked ? <div className="ui w-25 p-1 m-auto teal message">{this.state.tokens.length} assets selected.</div> : null}
                    
                </div>
            );
        }
        else{
            return (null);
        }
    }
}

export default DropdownMultiple;