"use client";
import { StyledFirebaseAuth } from "react-firebaseui";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import firebase from "@/firebase";

export default function Auth() {
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
    ],
  };

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
}
