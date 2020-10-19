import React from 'react'
import moment from 'moment'
import { Comment, Tooltip } from 'antd'

function ChatCard(props) {
    return (
        <div style={{ width: '100%' }}>
            <Comment 
                author={props.sender.name}
                content={
                    <p>
                        {props.message}
                    </p>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                    </Tooltip>
                }
            />
        </div>
    )
}

export default ChatCard