import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { authService } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Auth from "../Auth/Index";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../atoms";
import Loading from "../../components/UI/Loading";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 890px;

  margin: 0 auto;
  margin-top: 80px;
`;

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authService, (user) => {
      if (user) {
        const { uid, email, photoURL, displayName } = user;
        // console.log(user);
        // console.log(uid, email, photoURL, displayName);
        setIsLoggedIn(true);
        setCurrentUser({
          uid,
          email,
          displayName,
          photoURL,
        });
      } else {
        console.log("no user");
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);
  if (isLoggedIn === null) return <Loading></Loading>;
  // console.log(auth.currentUser);
  return (
    <Container>
      {isLoggedIn ? (
        <>
          <Navigation></Navigation>
          <Outlet></Outlet>
        </>
      ) : (
        <Auth></Auth>
      )}
    </Container>
  );
}
