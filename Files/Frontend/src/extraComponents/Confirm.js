import React, { Component } from 'react'
import { Button, Confirm } from 'semantic-ui-react'

class ConfirmDialog extends Component {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  render() {
    return (
      <div>
        <Button onClick={this.open}>{this.props.message}</Button>
        
        <div class="ui icon button" data-content="The default theme's basic popup removes the pointing arrow." data-variation="basic">
            <i class="check icon"></i>
        </div>

      </div>
    )
  }
}

export default ConfirmDialog;