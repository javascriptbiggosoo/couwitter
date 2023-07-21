import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { dbService, storageService } from "../../firebase";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { currentUidState } from "../../atoms";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { set } from "firebase/database";

export default function FeedInput() {
  const [couweet, setCouweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const currentUid = useRecoilValue(currentUidState);

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    let attachmentUrl = "";
    if (attachment) {
      const storageRef = ref(storageService, `${currentUid!}/${uuidv4()}`);
      const snapshot = await uploadString(storageRef, attachment, "data_url");
      console.log(snapshot);
      attachmentUrl = await getDownloadURL(storageRef);
    }

    addDoc(collection(dbService, "couweets"), {
      text: couweet,
      createdAt: new Date(),
      creatorId: currentUid,
      attachmentUrl,
    })
      .then(() => {
        setCouweet("");
        setAttachment("");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.currentTarget.value;
    setCouweet(value);
  };

  const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.currentTarget.files;
    if (files !== null) {
      const theFile = files[0];
      // console.log(theFile);
      const reader = new FileReader();
      reader.onload = (finishedEvent) => {
        const result = finishedEvent.target?.result;
        setAttachment(result as string);
      };
      reader.readAsDataURL(theFile);
    }
  };

  const handleImageCancel = () => {
    setAttachment("");
  };
  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="무엇을 공유하시겠어요?"
        maxLength={300}
        onChange={handleChange}
        value={couweet}
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <input type="submit" value="Couweet" />
      {attachment && (
        <div>
          <img src={attachment} alt="preview" width="auto" height="80px" />
          <button onClick={handleImageCancel}>사진 취소</button>
        </div>
      )}
    </form>
  );
}
