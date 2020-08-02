import React, { Component } from 'react'
import { connect } from 'react-redux'

import Userlist from '../../components/userlist/userlist'

import {getUsers} from '../../redux/actions'

export class Dashen extends Component {
  componentDidMount(){
    this.props.getUsers('dashen')
  }
  render() {
    return (
      <div>
        <Userlist userlist={this.props.userlist} history={this.props.history}/>
      </div>
    )
  }
}
export default connect(
  (state) => ({userlist:state.userlist}), 
  {getUsers}
)(Dashen)
