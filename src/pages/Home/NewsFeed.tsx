import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ICouweet } from "../../types";
import Couweet from "./Couweet";
import { useRecoilValue } from "recoil";
import { currentUidState } from "../../atoms";

export default function NewsFeed() {
  const [couweets, setCouweets] = useState<ICouweet[]>([]);
  const currentUid = useRecoilValue(currentUidState);

  useEffect(() => {
    const couweetCollection = collection(db, "couweets");
    const unsubscribe = onSnapshot(couweetCollection, (snapshot) => {
      const newCouweets: ICouweet[] = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as ICouweet[];
      // console.log(newCouweets);
      setCouweets(newCouweets);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {couweets.map((couweet) => {
        console.log(couweet.creatorId);
        return (
          <Couweet
            key={couweet.id}
            couweetObj={couweet}
            isOwner={couweet.creatorId === currentUid}
          ></Couweet>
        );
      })}
    </div>
  );
}
