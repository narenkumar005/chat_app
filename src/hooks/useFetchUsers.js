import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase";

function useFetchUsers(collection) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const ref = db.collection(collection);
  useEffect(() => {
    if (isAvailable) {
      const unsubscribe = ref.onSnapshot(
        (snapshot) => {
          let result = [];
          snapshot.docs.forEach((doc) => {
            result.push({ email: doc.data().email, name: doc.data().name });
          });
          setUsers(result);
          setError(null);
        },
        (err) => {
          setError(err.message);
        }
      );
    }
  }, [collection]);

  return { users, error };
}

export default useFetchUsers;
