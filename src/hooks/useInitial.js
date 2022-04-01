import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";

function useInitial() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setCurrentUser(user.email);
    });
    const ref = db.collection("users");
    const unsubscribe = ref.onSnapshot((snapshot) => {
      let result = [];
      snapshot.docs.forEach((doc) => {
        result.push(doc.data().email);
      });
      setUsers(result);
    });
  }, []);
  return { users, currentUser };
}

export default useInitial;
