import React, { Component } from 'react'
import {TabBar} from 'antd-mobile'
import Icon from '../icon/icon'

import './mytabbar.css'

const Item=TabBar.Item

export default class Mytabbar extends Component {
  render() {
    return (
      <div>
        <TabBar>
          {this.props.navlist.map((nav)=>(
            <Item key={nav.path} title={nav.text} icon={<Icon type={nav.icon}/>}
            selectedIcon={<Icon type={`${nav.icon}-select`}/>}
            selected={nav.path===this.props.pathname}
            onPress={()=>this.props.replace(nav.path)}
          />
          ))}
        </TabBar>
      </div>
    )
  }
}
