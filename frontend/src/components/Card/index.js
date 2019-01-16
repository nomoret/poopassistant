import React, { Component } from "react";
// import PropTypes from "prop-types";
import styles from "./styles.module.scss";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "reactstrap";

//need to jpeg image binary data
//https://bootsnipp.com/snippets/featured/elegant-bootstrap-4-message-chat-box-template
class ChatCard extends Component {
  render() {
    return (
      <Card className={styles.card}>
        <CardHeader className={styles.cardHeader}>
          <div className={`d-flex bd-highlight ${styles.userProfile}`}>
            <div className={styles.imgCont}>
              <img
                className={`rounded-circle ${styles.userImg}`}
                src="https://devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg"
                alt="user header profile"
              />
              <span className={styles.onlineIcon} />
            </div>
            <div className={styles.userInfo}>
              <span>Chat with 테스트봇</span>
              <p>1767 Messages</p>
            </div>
          </div>
        </CardHeader>
        <CardBody className={styles.cardBody}>
          {/* send, response message list */}
          <BotMessage />
          <UserMessage />
        </CardBody>
        <CardFooter className={styles.cardFooter}>
          <InputGroup>
            <InputGroupAddon addonType="append">
              <InputGroupText className={styles.attachBtn}>
                photo
              </InputGroupText>
            </InputGroupAddon>
            <Input
              className={styles.typeMsg}
              type="textarea"
              name=""
              placeholder="Type your message..."
            />
            <InputGroupAddon addonType="append">
              <InputGroupText className={styles.sendBtn}>send</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </CardFooter>
      </Card>
    );
  }
}

const BotMessage = () => {
  //   const { src, msg, time } = props;
  return (
    <div className="d-flex justify-content-start mb-4">
      <div className={styles.imgContMsg}>
        <img
          className={`rounded-circle ${styles.userImgMsg}`}
          src="https://devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg"
          alt="bot chat profile"
        />
      </div>
      <div className={styles.msgCotainer}>
        Hi, how are you samim?
        <span className={styles.msgTime}>8:40 AM, Today</span>
      </div>
    </div>
  );
};

const UserMessage = () => {
  return (
    <div className="d-flex justify-content-end mb-4">
      <div className={styles.msgCotainerSend}>
        Ok, thank you have a good day
        <span className={styles.msgTimeSend}>9:10 AM, Today</span>
      </div>
      <div className={styles.imgContMsg}>
        <img
          className={`rounded-circle ${styles.userImgMsg}`}
          src="https://devilsworkshop.org/files/2013/01/enlarged-facebook-profile-picture.jpg"
          alt="user chat profile"
        />
      </div>
    </div>
  );
};

// Card.propTypes = {};

export default ChatCard;
