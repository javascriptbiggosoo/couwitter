/* eslint-disable @typescript-eslint/no-misused-promises */
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../firebase";
import { useRecoilValue } from "recoil";
import { currentUidState } from "../../atoms";

export default function FeedInput() {
  const [couweet, setCouweet] = useState("");
  const currentUid = useRecoilValue(currentUidState);

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    await addDoc(collection(db, "couweets"), {
      text: couweet,
      createdAt: new Date(),
      creatorId: currentUid,
    });
    setCouweet("");
  };
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.currentTarget.value;
    setCouweet(value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="무엇을 공유하시겠어요?"
        maxLength={300}
        onChange={handleChange}
        value={couweet}
      />
      <input type="submit" value="Couweet" />
    </form>
  );
}
