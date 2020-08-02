import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  List,
  NavBar,
  InputItem,
  Grid,
  Icon
} from 'antd-mobile'
import { sendmsg } from '../../redux/actions'

import './chat.css'

const Item = List.Item
class Chat extends Component {
  state = {
    content: "",
    isshow: false
  }
  componentDidMount() {
    const emojis = ["😀", "😁", "😂", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙",
      "😚", "😇", '😐', "😑", "😶", '😏', "😣", "😥", "😮", '😯', "😪", '😫', "😴", "😌", "😛", "😜", '😝', '😒', '😓',
      '😔', '😕', '😲', '😷', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😬', '😰', '😱', '😳', '😵', '😡',
      '😠']
    this.emojis = emojis.map(emoji => ({ text: emoji }))
    window.scrollTo(0,document.body.scrollHeight)
  }
  componentDidUpdate(){
    window.scrollTo(0,document.body.scrollHeight)
  }
  click = () => {
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content.trim()
    if (content) {
      this.props.sendmsg(from, to, content)
    }
    this.setState({ content: "",isshow:false })
  }
  toggleshow = () => {
    const isshow = !this.state.isshow
    this.setState({isshow})
    if(isshow){
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0);
    }
  }
  render() {
    const { user } = this.props
    const { allusers, chats } = this.props.chat

    const meid = user._id
    const targetid = this.props.match.params.userid
    if (!allusers[meid]) {
      return null
    }
    const avatar1 = allusers[meid].avatar
    const { username, avatar } = allusers[targetid]
    const p1 = avatar1 ? require(`../../assets/imgs/${avatar1}.png`) : null
    const p2 = avatar ? require(`../../assets/imgs/${avatar}.png`) : null
    const chatid = [targetid, meid].sort().join('_')
    const mychats = chats.filter(chat => chat.chat_id === chatid)
    return (
      <div style={{ overflow: "hidden" }}>
        <NavBar icon={<Icon type="left" />}
          onLeftClick={()=>this.props.history.goBack()}
        >{username}</NavBar>
        <List style={{ margin: "40px 0" }} onClick={this.toggleshow}>
          {
            mychats.map(chat => {
              if (chat.to === meid) {
                return <Item key={chat.creat_time} thumb={p1}>{chat.content}</Item>
              } else {
                return <Item key={chat.creat_time} thumb={p2} className="me">{chat.content}</Item>
              }
            })
          }
        </List>
        <div  className="msg">
          <InputItem placeholder="请输入"
            extra={
              <>
                <span role="img" aria-label="imgs" onClick={this.toggleshow} style={{ marginRight: 10 }}>😀</span>
                <span onClick={() => this.click()}>发送</span>
              </>
            } value={this.state.content} maxLength="45" onChange={(content) => this.setState({ content })} />
          {
            this.state.isshow ? (
              <Grid
                data={this.emojis}
                columnNum={8}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={(emoji) => this.setState({ content: this.state.content + emoji.text })}
              />) : null
          }
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({ user: state.user, chat: state.chat }),
  { sendmsg }
)(Chat)