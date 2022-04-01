import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
import { keyframes } from "styled-components";
import CancelIcon from "@material-ui/icons/Cancel";
import { useDispatch } from "react-redux";
import useFetchUsers from "../hooks/useFetchUsers";
import { popupSwitch } from "../features/appSlice";

import { db, auth } from "../firebase";

function CreateChannel() {
  const dispatch = useDispatch();

  const [channelName, setChannelName] = useState("");
  const [participants, setParticipants] = useState([]);
  const { users, error } = useFetchUsers("users");
  const employees2 = [];
  users.forEach((user) => {
    employees2.push({ label: user.email, value: user.email });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const admin = auth.currentUser.email;

    db.collection("rooms").doc().set({
      admin: admin,
      participants: participants,
      channelName: channelName,
    });
    setChannelName("");
    setParticipants([]);
  };

  return (
    <CreateContainer>
      <h1>Create Channel:</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Name of the Channel:</span>

          <input
            min={3}
            type="text"
            value={channelName}
            onChange={(e) => {
              setChannelName(e.target.value);
            }}
            required
          />
        </label>
        <br />
        <label>
          <span className="selector">Select participants:</span>
          <div>
            <Select
              onChange={(option) => {
                setParticipants(option);
              }}
              options={employees2}
              value={participants}
              isMulti
            />
          </div>
        </label>
        <button type="submit">Submit</button>
        <div
          onClick={() => {
            dispatch(popupSwitch({ status: false }));
          }}
        >
          <CancelIcon />
        </div>
      </form>
    </CreateContainer>
  );
}

export default CreateChannel;
const breatheAnimation = keyframes`
0%{opacity:0;}100%{opacity:1}`;

const CreateContainer = styled.div`
  position: relative;
  max-width: 600px;
  min-height: 400px;
  background-color: var(--slack-color);
  color: white;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10vh;
  text-align: center;
  overflow: auto;
  border-radius: 5px;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  animation-name: ${breatheAnimation};
  animation-duration: 1s;

  > form > div {
    position: absolute;
    top: 3%;
    right: 2%;
    opacity: 0.7;
    :hover {
      opacity: 1;
    }
  }

  > h1 {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  > form > label > span {
    display: block;
    font-weight: bold;
    font-size: medium;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  > form > label > .selector {
    display: inline-block;
    margin-top: 20px;
  }

  > form > label > div {
    display: block;
    width: 80%;

    margin: auto;
    color: black !important;
    font-weight: bold;
  }

  > form > label > input {
    outline: none;
    width: 48%;
    padding: 5px;
    font-size: large;
    border-radius: 4px;
  }

  > form > button {
    position: absolute;
    bottom: 10%;
    left: 45%;
    border-radius: 4px;
    background-color: var(--slack-color);
    color: white;
    box-shadow: 4px 4px 2px 0px rgba(0, 0, 0, 0.75);
    font-size: large;
    font-weight: 400;
    padding: 10px;
  }
`;
