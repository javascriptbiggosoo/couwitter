import React from "react";
import { ICouweet } from "../../types.d";
import styled from "styled-components";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

interface IProps {
  couweetObj: ICouweet;
  isOwner: boolean;
}

const Container = styled.div`
  display: flex;
`;

export default function Couweet({ couweetObj, isOwner }: IProps) {
  async function deleteCouweet(id: string) {
    const couweetRef = doc(db, "couweets", id);
    await deleteDoc(couweetRef);
  }
  const handleDeleteClick = () => {
    const ok = window.confirm("게시글을 지우시겠습니까?");
    ok &&
      deleteCouweet(couweetObj.id)
        .then(() => console.log("User deleted"))
        .catch((error) => console.error("Error deleting user: ", error));
  };

  return (
    <Container>
      <h4>{couweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={handleDeleteClick}>지우기</button>
          <button>수정하기</button>
        </>
      )}
    </Container>
  );
}
