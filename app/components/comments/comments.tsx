"use client";
import { useContext, useState } from "react";
import { postsContext } from "../posts/posts";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Comments() {
  const [user, userLoading, userError] = useAuthState(auth);
  const id = useContext(postsContext);
  const [comments, comLoading, comError] = useCollection(
    collection(db, "posts", id, "comments")
  );

  function addComment() {
    addDoc(collection(db, "posts", id, "comments"), {
      userId: user?.displayName || "guest",
      comment: comment,
    });
  }

  const [comment, setComment] = useState("");
  return (
    <div>
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
        type="text"
      />
      <button onClick={addComment} type="submit">
        add comment
      </button>
      {comments?.docs.map((doc) => (
        <div key={doc.id}>
          {" "}
          {<React.Fragment>{JSON.stringify(doc.data())}</React.Fragment>}
        </div>
      ))}
    </div>
  );
}
