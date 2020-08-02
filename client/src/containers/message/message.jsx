import React from 'react'
import { connect } from 'react-redux'

import {
  List
} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

  const useMessage = (chats) => {
    // chats.map()
    const lastchats = chats.reduce((all, one) => [one['creat_time'] > (all[one["chat_id"]] ? all[one["chat_id"]]['creat_time'] : 0) ? all[one["chat_id"]] = one : null, all][1], {})
    const lastmessages = Object.values(lastchats)
    lastmessages.sort((a, b) => b.creat_time - a.creat_time)
    return lastmessages
  }



const Message = ({ user, chat }) => {
  const lastmessages = useMessage(chat.chats)
  return (
    <div>
      <List style={{ margin: "40px 0" }}>
        {
          lastmessages.map(lastmes => {
            const url = lastmes.from === user._id ? lastmes.to : lastmes.from
            return (
              <Item key={lastmes.creat_time} thumb={require(`../../assets/imgs/${chat.allusers[url]['avatar']}.png`)}
                arrow="horizontal"
                // extra={<Badge text={3}/>}
                onClick={() => this.props.history.push(`/chat/${url}`)}>
                {chat.allusers[lastmes.to]['username']}
                <Brief>{lastmes.content}</Brief>
              </Item>
            )
          })
        }
      </List>
    </div>
  )
}

export default connect(
  (state) => ({ user: state.user, chat: state.chat }),
  {}
)(Message)
