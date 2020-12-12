
import React, { Component } from 'react'
import {Header, Modal } from 'semantic-ui-react'

export default class Spinner extends Component {
  state = { modalOpen: true }


  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Modal className="ui text-center w-100 m-auto"
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='' content='' />
        <Modal.Content>
         <div className="ui active dimmer text-center w-100 m-auto">
                <div className="ui massive text loader">{this.props.message} <p style={{color: 'red'}}>{this.props.warn}</p></div><br/>
                </div>
        </Modal.Content>
      </Modal>
    )
  }
}

