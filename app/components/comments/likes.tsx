"use client";

import { db } from "@/firebase";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { postsContext } from "../posts/posts";
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";

export default function Like(inputRef: any) {
  const [firstRender, setFirstRender] = useState(0);
  const id = useContext(postsContext);
  const [like, setLike] = useState(localStorage.getItem("state" + id) || 0);
  const ref = doc(db, "posts", id);
  const [likes, likesLoading, likesError] = useDocument(ref);

  const useDidMountEffect = (func: Function, deps: any) => {
    const didMount = useRef(false);
    useEffect(() => {
      if (didMount.current) {
        func();
      } else {
        didMount.current = true;
      }
    }, deps);
  };

  useDidMountEffect(() => {
    updateLikes();
  }, [like]);

  async function updateLikes() {
    if (like) {
      await updateDoc(ref, {
        likes: increment(1),
      });
    } else {
      if ((await getDoc(ref)).get("likes") > 0)
        await updateDoc(ref, {
          likes: increment(-1),
        });
      else {
        await updateDoc(ref, {
          likes: 0,
        });
      }
    }
  }
  return (
    <div className="flex flex-col">
      <div>
        <button
          onClick={() => {
            if (like == 0) {
              setLike(1);
              localStorage.setItem("state" + id, "1");
            } else {
              setLike(0);
              localStorage.setItem("state" + id, "0");
            }
          }}
          className=""
        >
          {like == 1 ? <AiFillHeart size={24} /> : <AiOutlineHeart size={24} />}
        </button>
        <button onClick={() => inputRef.inputRef.current.focus()}>
          <AiOutlineComment size={24} />
        </button>
      </div>
      <div>{likes?.get("likes")} likes</div>
    </div>
  );
}
