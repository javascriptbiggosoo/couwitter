import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService, storageService } from "../../firebase";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { currentUidState } from "../../atoms";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { CouweetInput } from "../../components/CouweetInput";
import { FormBtn } from "../../components/FormBtn";

export default function FeedInput() {
  const [couweet, setCouweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const currentUid = useRecoilValue(currentUidState);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    let attachmentUrl = "";
    const getAttachmentUrl = async (attachment: string) => {
      const storageRef = ref(storageService, `${currentUid!}/${uuidv4()}`);
      const snapshot = await uploadString(storageRef, attachment, "data_url");
      console.log(snapshot);
      attachmentUrl = await getDownloadURL(storageRef);
    };

    if (attachment) {
      getAttachmentUrl(attachment).catch(console.error);
      console.log(attachmentUrl);
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
    <form onSubmit={handleSubmit}>
      <CouweetInput
        type="text"
        placeholder="무엇을 공유하시겠어요?"
        maxLength={300}
        onChange={handleChange}
        value={couweet}
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <FormBtn type="submit" value="Couweet" />
      {attachment && (
        <div>
          <img src={attachment} alt="preview" width="auto" height="80px" />
          <button onClick={handleImageCancel}>사진 취소</button>
        </div>
      )}
    </form>
  );
}
