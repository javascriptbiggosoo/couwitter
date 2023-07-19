import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

export interface ICouweet {
  createdAt: CreatedAt;
  text: string;
  id: string;
  createrId: string;
}

export interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

export default function NewsFeed() {
  const [couweets, setCouweets] = useState<ICouweet[]>([]);

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
      {couweets.map((couweet) => (
        <div key={couweet.id}>
          <h4>{couweet.text}</h4>
        </div>
      ))}
    </div>
  );
}
