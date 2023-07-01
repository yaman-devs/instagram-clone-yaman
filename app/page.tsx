"use client";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthCom from "./components/auth/auth";
import { UploadFile } from "./components/Upload/upload";
import Posts from "./components/posts/posts";
import Image from "next/image";
import logo from "@/public/instagram-logo.png";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-4">
      {!user ? (
        <AuthCom />
      ) : (
        <>
          <nav className="flex justify-between w-screen px-4 border-b-2 fixed bg-white top-0 py-2">
            <Image src={logo} alt="instagram-clone" width={200} height={58} />
            <div className="flex gap-2">
              <UploadFile />
              <button
                className="bg-blue-500 rounded-lg text-white py-2 px-4 text-xs self-center"
                onClick={() => auth.signOut()}
              >
                SIGNOUT
              </button>
            </div>
          </nav>
          <div className="pt-16">
            <Posts />
          </div>
        </>
      )}
    </main>
  );
}
