import React, { useState } from "react";
import { ICouweet } from "../../types.d";
import styled from "styled-components";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService, storageService } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";

interface IProps {
  couweetObj: ICouweet;
  isOwner: boolean;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background-color: white;
  width: 100%;
  max-width: 320px;
  padding: 20px;
  border-radius: 10px;
  color: rgba(0, 0, 0, 0.8);
`;

export default function Couweet({ couweetObj, isOwner }: IProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newCouweet, setNewCouweet] = useState(couweetObj.text);

  async function deleteCouweet(id: string, attachmentUrl: string) {
    const couweetRef = doc(dbService, "couweets", id);
    await deleteDoc(couweetRef);

    const urlRef = ref(storageService, attachmentUrl);
    await deleteObject(urlRef);
  }
  const handleDeleteClick = () => {
    const ok = window.confirm("게시글을 지우시겠습니까?");
    ok &&
      deleteCouweet(couweetObj.id, couweetObj.attachmentUrl)
        .then(() => console.log("User deleted"))
        .catch((error) => console.error("Error deleting user: ", error));
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setNewCouweet(ev.currentTarget.value);
  };

  const updateCouweet = async (id: string) => {
    const couweetRef = doc(dbService, "couweets", id);
    await updateDoc(couweetRef, {
      text: newCouweet,
    });
  };
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsEditing(false);
    updateCouweet(couweetObj.id)
      .then(() => console.log("User updated"))
      .catch((error) => console.error("Error updating user: ", error));
  };

  if (isOwner && isEditing)
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            required
            value={newCouweet}
          />
          <input type="submit" value="수정" />
        </form>
        <button onClick={handleEditClick}>취소</button>
      </>
    );

  return (
    <Container>
      <h4>{couweetObj.text}</h4>
      {couweetObj.attachmentUrl && (
        <img src={couweetObj.attachmentUrl} alt="" width="50px" height="auto" />
      )}
      {isOwner && (
        <>
          <button onClick={handleDeleteClick}>지우기</button>
          <button onClick={handleEditClick}>수정하기</button>
        </>
      )}
    </Container>
  );
}
