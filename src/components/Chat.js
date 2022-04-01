import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import ChatInput from "./ChatInput";
import { popupStatus, selectRoomId } from "../features/appSlice";
import { db } from "../firebase";
import Message from "./Message";
import CreateChannel from "./CreateChannel";
import useInitial from "../hooks/useInitial";
import useChannelUsers from "../hooks/useChannelUsers";

const Chat = () => {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const popUp = useSelector(popupStatus);

  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView();
  }, [roomId, loading]);
  const { users, currentUser } = useInitial();

  const { channelUsers } = useChannelUsers(roomId);

  //console.log("users:", users, "currentUser:", currentUser);
  //console.log("currentChannelUsers", channelUsers);
  //console.log(channelUsers.indexOf("apple"));

  return (
    <ChatContainer>
      {!roomMessages && !popUp && (
        <LoadingContainer>
          <div>
            <h1>Select a channel to chat</h1>
            <img
              src="https://i.pinimg.com/originals/27/9d/a0/279da0eddd5cf914d29ec923e837e3fe.gif"
              alt="loading..."
            />
          </div>
        </LoadingContainer>
      )}
      {popUp && <CreateChannel />}

      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().channelName}</strong>
              </h4>
              <StarBorderIcon />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon />
                Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {!(channelUsers.indexOf(currentUser) >= 0) && (
              <h1>you are not the authorised user</h1>
            )}

            {channelUsers.indexOf(currentUser) >= 0 &&
              roomMessages?.docs.map((doc) => {
                const { message, timestamp, user, userImage } = doc.data();
                return (
                  <Message
                    key={doc.id}
                    message={message}
                    timestamp={timestamp}
                    user={user}
                    userImage={userImage}
                  />
                );
              })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>

          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().channelName}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;

const ChatMessages = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  position: relative;
`;

const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  > h1 {
    margin-bottom: 20px;
  }
`;
