import React, { Component } from 'react'

import { Grid } from 'antd-mobile';
import './avatar.css'

export default class Avatars extends Component {
  state = {
    icon: ''
  }
  render() {
    let data = []
    for (let i = 0; i < 19; i++) {
      data.push({ text: i + 1, icon: require(`../../assets/imgs/${i + 1}.png`) })
    }
    return (
      <div>
        {!this.state.icon ? '请选择头像' :
          (<div>
            已选择头像： <img alt="" src={this.state.icon} className='avatar' />
          </div>)
        }
        <Grid data={data} columnNum={3} carouselMaxRow={3} isCarousel onClick={(val) => {this.setState({ icon: val.icon });this.props.setAvatar(val.text);  }} />
      </div>
    )
  }
}