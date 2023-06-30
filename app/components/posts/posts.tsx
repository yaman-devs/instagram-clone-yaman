"use client";
import React, { createContext, useContext } from "react";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "@/firebase";
import Image from "next/image";
import Comments from "../comments/comments";

export const postsContext = createContext("");
export default function Posts() {
  const [posts, postsLoading, postsError] = useCollection(
    collection(getFirestore(app), "posts"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div>
      <p>
        {postsError && <strong>Error: {JSON.stringify(postsError)}</strong>}
        {postsLoading && <span>Collection: Loading...</span>}
        {posts && (
          <ul>
            Collection:{" "}
            {posts?.docs
              .sort((a, b) => (a.data().addDate > b.data().addDate ? -1 : 1))
              .map((doc) => (
                <postsContext.Provider value={doc.id}>
                  <li key={doc.id}>
                    <Image
                      src={doc.get("imageUrl")}
                      alt=""
                      width={400}
                      height={400}
                    />
                  </li>
                  <Comments />
                </postsContext.Provider>
              ))}
          </ul>
        )}
      </p>
    </div>
  );
}
