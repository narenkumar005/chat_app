import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase";

function useChannelUsers(roomId) {
  const [channelUsers, setChannelUsers] = useState([]);

  useEffect(() => {
    if (roomId) {
      const ref = db.collection("rooms").doc(roomId.toString());

      const unsub = ref.onSnapshot(
        (snapshot) => {
          let result = [];

          snapshot.data().participants.forEach((participant) => {
            result.push(participant.value);
          });
          setChannelUsers(result);
        },
        (err) => {
          console.log(err.name);
        }
      );
    }
  }, [roomId]);

  return { channelUsers };
}

export default useChannelUsers;
