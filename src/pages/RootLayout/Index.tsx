import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { authService } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Auth from "../Auth";
import { useRecoilState } from "recoil";
import { currentUidState } from "../../atoms";
import Loading from "../../components/UI/Loading";

export default function RootLayout() {
  // 로딩도 따로 만들자
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  const [currentUid, setCurrentUid] = useRecoilState(currentUidState);

  onAuthStateChanged(authService, (user) => {
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
  if (isLoggedIn === null) return <Loading></Loading>;
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
