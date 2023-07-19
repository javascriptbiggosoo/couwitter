import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Auth from "../Auth";
import { useRecoilState } from "recoil";
import { currentUidState } from "../../atoms";

export default function RootLayout() {
  // 로딩도 따로 만들자
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser !== null);
  const [currentUid, setCurrentUid] = useRecoilState(currentUidState);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(user);
      setIsLoggedIn(true);
      setCurrentUid(uid);
    } else {
      console.log("no user");
      setIsLoggedIn(false);
    }
  });
  // console.log(auth.currentUser);
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
