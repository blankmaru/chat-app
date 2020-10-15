import React, { Component } from 'react'
import { Form, Icon, Input, Button, Row, Col } from 'antd'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import moment from 'moment'

class ChatPage extends Component {

    state = {
        chatMessage: ""
    }

    componentDidMount() {
        let server = "http://localhost:5000"

        this.socket = io(server);
    }

    handleMessageChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault();

        let message = this.state.chatMessage;
        let userId = this.props.user.userData._id;
        let userName = this.props.user.userData.name;
        let time = moment();

        this.socket.emit('Input Chat Message', {
            message,
            userId,
            userName,
            time
        })

        this.setState({ chatMessage: "" })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <p style={{ fontSize: '2rem', textAlign: 'center' }}>Real Time Chat</p>
                </div>

                <div style={{maxWidth: '800px', margin: '0 auto'}}>
                    <div className="infinite-container">
                        <div 
                            ref={el => {
                                this.messagesEnd = el;
                            }}
                            style={{ float: 'left', clear: 'both'}}
                        />
                    </div>

                    <Row>
                        <Form layout="inline" onSubmit={this.submit}>
                            <Col span={18}>
                                <Input 
                                    id="message"
                                    prefix={<Icon type="message" style={{ color: 'rgba(0, 0, 0, ..25'}} />}
                                    placeholder="Lets start talking"
                                    type="text"
                                    value={this.state.chatMessage}
                                    onChange={this.handleMessageChange}
                                />
                            </Col>
                            <Col span={2}>

                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={this.submit} style={{width: '100%'}} htmlType="submit">
                                    <Icon type="enter" />
                                </Button>
                            </Col>
                        </Form>
                    </Row>

                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(ChatPage)
