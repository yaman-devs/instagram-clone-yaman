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
        {postsLoading && <span>Loading...</span>}
        {posts && (
          <ul className="flex flex-col gap-4">
            {" "}
            {posts?.docs
              .sort((a, b) => (a.data().addDate > b.data().addDate ? -1 : 1))
              .map((doc) => (
                <postsContext.Provider value={doc.id}>
                  <li className="border flex flex-col w-[500px]" key={doc.id}>
                    <div className="w-full p-2 border-b-2 ">
                      {doc.get("userId")}
                    </div>
                    <Image
                      className="self-center"
                      src={doc.get("imageUrl")}
                      alt=""
                      width={400}
                      height={400}
                    />
                    <Comments />
                  </li>
                </postsContext.Provider>
              ))}
          </ul>
        )}
      </p>
    </div>
  );
}
