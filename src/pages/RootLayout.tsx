import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Auth from "./Auth";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser !== null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(user);
      setIsLoggedIn(true);
    } else {
      console.log("no user");
      setIsLoggedIn(false);
    }
  });
  console.log(auth.currentUser);
  return (
    <>
      {isLoggedIn ? (
        <>
          <Navigation></Navigation>
          <Outlet></Outlet>
        </>
      ) : (
        <Auth></Auth>
      )}
    </>
  );
}
