"use client";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthCom from "./components/auth/auth";
import { UploadFile } from "./components/Upload/upload";
import Posts from "./components/posts/posts";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!user ? <AuthCom /> : <div>hello {user.displayName || "guest"}</div>}
      <UploadFile />
      <Posts />
    </main>
  );
}
