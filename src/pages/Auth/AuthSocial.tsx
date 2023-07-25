import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "../../firebase";

export default function AuthSocial() {
  const handleSocialClick = () => {
    const provider = new GoogleAuthProvider();
    const socialSignIn = async () => {
      const result = await signInWithPopup(authService, provider);
      console.log(result);
    };
    socialSignIn().catch((err) => {
      console.log(err);
    });
  };
  return (
    <div>
      <button onClick={handleSocialClick} name="google">
        Google 계정으로 이용하기
      </button>
    </div>
  );
}
