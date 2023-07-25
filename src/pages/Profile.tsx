import { signOut, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { authService, dbService } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUidState, currentUserState } from "../atoms";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Profile() {
  const navigate = useNavigate();
  const currentUid = useRecoilValue(currentUidState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [newDisplayName, setNewDisplayName] = useState("");

  useEffect(() => {
    const getMyCouweets = async () => {
      const couweetCollection = collection(dbService, "couweets");
      const q = query(couweetCollection, where("creatorId", "==", currentUid));
      const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      // });
    };

    void getMyCouweets();
  }, [currentUid]);

  useEffect(() => {
    console.log(currentUser);
    if (currentUser?.displayName) {
      setNewDisplayName(currentUser.displayName);
    }
  }, [currentUser]);

  const handleClick = () => {
    signOut(authService)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setNewDisplayName(ev.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updateDisplayName = async () => {
      await updateProfile(authService.currentUser!, {
        displayName: newDisplayName,
      });
    };

    if (newDisplayName !== "" && currentUser?.displayName !== newDisplayName) {
      updateDisplayName()
        .then(() => {
          if (authService.currentUser) {
            const { email, photoURL, displayName, uid } =
              authService.currentUser;
            setCurrentUser({ email, photoURL, displayName, uid });
          }
          setNewDisplayName("");
          console.log("updated");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <h4>{currentUser?.displayName}</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름"
          onChange={handleChange}
          value={newDisplayName}
        />
        <input type="submit" value="프로필 편집" />
      </form>
      <button onClick={handleClick}>로그아웃</button>
    </>
  );
}
