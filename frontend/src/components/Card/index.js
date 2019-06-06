import React, { Component } from "react";
// import PropTypes from "prop-types";
import styles from "./styles.module.scss";
import Ionicon from "react-ionicons";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button
} from "reactstrap";

//need to jpeg image binary data
//https://bootsnipp.com/snippets/featured/elegant-bootstrap-4-message-chat-box-template
class ChatCard extends Component {
  state = {
    history: []
  };

  componentDidMount() {
    const trigger = { type: "bot", message: "hi ~ how are you?" };
    this.setState({
      history: [...this.state.history, trigger]
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    // console.log("cdu", this.myRef);

    if (this.myRef) {
      this.myRef.scrollTop = this.myRef.scrollHeight;
      this.myRef.scrollIntoView({ behavior: "smooth" });
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.response) {
      console.log("componentWillReceiveProps", nextProps);
      const { name, description, accuracy, entities } = nextProps.response;
      const response = {
        type: "bot",
        message: `${name} - ${description} 의도를 물어봤군요 정확도는 ${(
          accuracy * 100.0
        ).toFixed(2)}%`
      };

      this.setState({
        history: [...this.state.history, response],
        entities,
        loading: false
      });
    }
  };

  render() {
    console.log("대화 목록", this.state);
    console.log(this.props);
    return (
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <div className={`d-flex bd-highlight ${styles.userProfile}`}>
            <div className={styles.imgCont}>
              <img
                className={`rounded-circle ${styles.userImg}`}
                src={require("images/chatbot_profile.png")}
                alt="user header profile"
              />
              <span className={styles.onlineIcon} />
            </div>
            <div className={styles.userInfo}>
              <span>Chat with 테스트봇</span>
              <p>{`${this.state.history.length} Messages`}</p>
            </div>
            <Button
              className={styles.closeBtn}
              onClick={this.props.closeChatPanel}
            >
              <Ionicon icon="ios-close" fontSize="68px" color="#047cc0" />
            </Button>
          </div>
        </CardHeader>
        <CardBody
          className={styles.cardBody}
          innerRef={el => {
            this.myRef = el;
          }}
        >
          {/* send, response message list */}
          {this.state.history.map((conversation, index) => {
            const { type, message } = conversation;
            if (type === "user") {
              return <UserMessage key={index} message={message} />;
            } else {
              return <BotMessage key={index} message={message} />;
            }
          })}
          {this.state.entities &&
            this.state.entities.map(({ entity, origin }, index) => {
              return <div key={index}>{`@${entity}:${origin}`}</div>;
            })}
        </CardBody>
        <CardFooter className={styles.cardFooter}>
          {/* <Form onSubmit={this._sendMessage}> */}
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText className={styles.attachBtn}>
                photo
              </InputGroupText>
            </InputGroupAddon>
            <Input
              className={styles.typeMsg}
              type="textarea"
              name="message"
              placeholder="Type your message..."
              value={this.state.message}
              onChange={this._handleInputChange}
            />
            <InputGroupAddon addonType="append">
              <Button className={styles.sendBtn} onClick={this._sendMessage}>
                send
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </CardFooter>
      </Card>
    );
  }

  _handleInputChange = e => {
    const {
      target: { value, name }
    } = e;
    console.log(name, value);
    this.setState({
      [name]: value
    });
  };

  _sendMessage = () => {
    const { message } = this.state;

    if (message === "") {
      return;
    }
    console.log("Click", message);

    const { sendMessage } = this.props;

    sendMessage(message);

    const msg = { type: "user", message: message };

    this.setState({
      history: [...this.state.history, msg],
      message: "",
      loading: true
    });
  };

  _onScroll = () => {};
}

const BotMessage = props => {
  // const { src, msg, time } = props;
  const { message } = props;
  return (
    <div className="d-flex justify-content-start mb-4">
      <div className={styles.imgContMsg}>
        <img
          className={`rounded-circle ${styles.userImgMsg}`}
          src={require("images/chatbot_profile.png")}
          alt="bot chat profile"
        />
      </div>
      <div className={styles.msgCotainer}>
        {message}
        <span className={styles.msgTime}>8:40 AM, Today</span>
      </div>
    </div>
  );
};

const UserMessage = props => {
  const { message } = props;
  return (
    <div className="d-flex justify-content-end mb-4">
      <div className={styles.msgCotainerSend}>
        {message}
        <span className={styles.msgTimeSend}>9:10 AM, Today</span>
      </div>
      {/* <div className={styles.imgContMsg}>
        <img
          className={`rounded-circle ${styles.userImgMsg}`}
          src="https://devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg"
          alt="user chat profile"
        />
      </div> */}
    </div>
  );
};

// Card.propTypes = {};

export default ChatCard;
