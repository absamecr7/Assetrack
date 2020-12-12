import React from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import history from '../components/history';

class ModalBasicExample extends React.Component{

    state = {
        vendorID : "",
        password : ""
    }

    onFormSubmit = (event) => {

        event.preventDefault();

        
        this.props.onSubmit(this.state);
    }

    render(){
        return (
			<Modal trigger={<Button>Login</Button>} basic size="small">
				<Header icon="archive" content="Enter credentials" />
				<Modal.Content className="text-center">
					<Form>
						<Form.Field>
							<label  className="text-center justify-content">Vendor ID</label>
							<input  className="text-center" value={this.state.vendorID} placeholder="Vendor ID" onChange={(e) => {this.setState({vendorID : e.target.value})}} />
						</Form.Field>
						<Form.Field>
							<label  className="text-center">Password</label>
							<input  className="text-center" placeholder="Password" value={this.state.password} onChange={(e) => {this.setState({password : e.target.value})}} />
						</Form.Field>
						<Button type="submit" onClick={this.onFormSubmit} >Submit</Button>
					</Form>
				</Modal.Content>

			</Modal>

		);
}
}

export default ModalBasicExample;

