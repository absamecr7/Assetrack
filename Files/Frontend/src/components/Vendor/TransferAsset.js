import React from 'react';
import axios from 'axios';

import DropdownMultiple from '../../extraComponents/Dropdown';

import Spinner from '../../Spinner';

import web3 from '../../web3';
import assetContract from '../../assetContract';

const options = [];

const ConfirmWarning = () => {
	return (
		<div className="ui warning message">
			<div className="header">Please make sure you select the correct assets to transfer!!</div>
			<p>Click on 'Transfer' if you are sure.</p>
		</div>
	);
}

class TransferAsset extends React.Component {

	state = {
		vendorID: '',
		company: '',
		receiver: '',
		allTokens: [],	//tokens to be transferred
		showConfirmation: false,
		passOptions: false,
		showSpinner: false,

		account: null
    };
	
	
	//Once the component is mounted, take the values passed using LINK and setState using those values.
	//using axios, we obtain all the currently owned assets by the current vendor, and set it to => allTokens.
	//All assets are added to OPTIONS variable so that we can pass it to Dropdown to show them in the list.
	componentDidMount = async () => {

		const accounts = await web3.eth.getAccounts();

		const temp_vendorID = this.props.location.state.vendorID;
		const temp_company = this.props.location.state.company;

		this.setState({
			vendorID: temp_vendorID,
			company: temp_company,
			account: accounts[0]
		});

		try {
			const result = await axios.get(
				'http://localhost:5000/entities/getownedassets/' + this.props.location.state.vendorID
			);
			console.log("Assets owned by vendor: ",result.data);
			
			this.setState({
				allTokens: result.data,
				passOptions: true
			});

		
			for(var i = 0; i < this.state.allTokens.length; i++) {
		
				var obj = {
					key: i,
					text: this.state.allTokens[i],	//these values will be shown in the dropdown
					value: this.state.allTokens[i]	//thes are important for multiple selections. We are able to see which values are selected based on this.
				};
	
				options.push(obj);
			}
			
        } catch {
			console.log('Error getting assets');
        }
        
	};


	//Callback function, to be called from child, and child passes the tokens to be transferred to  parent.	
	onTokenConfirm = (tokens) => {

		console.log("Tokens returned by dropdown child: ",tokens);

		this.setState({
			allTokens: tokens
		});

	}

	//Execute the transfer of assets once user clicks "transfer"
	executeTransferAsset = async (event) => {

		this.setState({
			showSpinner: true
		});

		const request = {
			sender: this.state.vendorID,
			receiverID: this.state.receiver,
			assetsToTransfer: this.state.allTokens
		};

		console.log('request: ',request);

		try{
			const result = await axios.post('http://localhost:5000/assets/transfer', request);
			console.log(result.data);
			
			const transferredAssets= [];
			if(result.data.isDone) {

				this.state.allTokens.map((token) => transferredAssets.push(token));

				var allAssetString = transferredAssets.join();

					await assetContract.methods
						.addToDashBoard(`${(new Date()).toLocaleString()} || Assets ${allAssetString} were transfered from vendor ${this.state.vendorID} to vendor ${this.state.receiver}.`)
						.send({
							from: this.state.account
						});	
		
				this.setState({
					showSpinner: false
				});	
			}
		}	
		catch(err){
			console.log("Error transfering the assets!");
			alert("Error transferring the assets!!");
		}
	}

	render() {
		return (
			<div className="ui container animated fadeInLeft ">

				<div className="ui segment text-right">
					<i className="user icon large d-inline"></i>
					<p className="p-0 m-0 text-capitalize">{this.state.company}</p>
					<p className="p-0 m-0">{this.state.vendorID}</p>
				</div>

				<div className="ui segment">

					{this.state.passOptions ? <DropdownMultiple options={options} allTokens={this.state.allTokens} onSubmit={this.onTokenConfirm} /> : null}

					<div className="ui divider">

					</div>

					<div className="ui center aligned basic segment">
						<div className="ui left icon action input">
							<i className="share icon"></i>

							<input type="text"
									placeholder="User ID of receiver"
									value={this.state.receiver}
									onChange={
											(e) => this.setState({
														receiver: e.target.value
													})
											}>
							</input>

							<div className="ui blue submit button" 
								onClick={
										(e) => this.setState({
											showConfirmation :true
										})
								}
							>Go</div>
						</div>

						{this.state.showConfirmation ? <ConfirmWarning /> : null}

						<div className="ui horizontal divider">
							<i className="ui icon truck"></i>
						</div>

						<div className="ui teal labeled icon button" onClick={this.executeTransferAsset}>
							Transfer
							<i className="paper plane icon"></i>
						</div>

					</div>
					
					
				</div>

				<div>
					{this.state.isAddedToDashBoard ? <Spinner message="Please wait a while we transfer." warn="Check your metamask extension to confirm transaction." /> : null} 
				</div>
			</div>
		);
	}
}

export default TransferAsset;
