"use client";
import { useContext, useRef, useState } from "react";
import { postsContext } from "../posts/posts";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Likes from "./likes";

export default function Comments() {
  const [user, userLoading, userError] = useAuthState(auth);
  const id = useContext(postsContext);
  const [comments, comLoading, comError] = useCollection(
    collection(db, "posts", id, "comments")
  );
  const ref = useRef(null);

  function addComment() {
    addDoc(collection(db, "posts", id, "comments"), {
      userId: user?.displayName || "guest",
      comment: comment,
    });
  }

  const [comment, setComment] = useState("");
  return (
    <div className="">
      <ul className="p-4">
        <Likes inputRef={ref} />
        {comments?.docs.map((doc) => (
          <li className="flex justify-start gap-2" key={doc.id}>
            <div className="font-bold">{doc.get("userId")}</div>
            <div>{doc.get("comment")}</div>
          </li>
        ))}
      </ul>
      <div className="border-t-2 flex justify-between p-4">
        <input
          ref={ref}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          placeholder="add comment"
          type="text"
        />
        <button
          onClick={addComment}
          className="font- text-indigo-800 disabled:text-indigo-500/30"
          type="submit"
          disabled={!comment}
        >
          Post
        </button>
      </div>
    </div>
  );
}
