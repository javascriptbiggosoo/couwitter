/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { authService } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupping, setIsSignupping] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.name === "email") {
      setEmail(ev.target.value);
    } else {
      setPassword(ev.target.value);
    }
  };
  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // console.log(email, password);
    let data;
    try {
      if (isSignupping) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (err) {
      let message = "Unknown Error";
      if (err instanceof Error) message = err.message;
      setError(message);
    }
    // console.log(data);
  };
  const toggleAccount = () => setIsSignupping((prev) => !prev);
  const handleSocialClick = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(authService, provider);
    console.log(result);
    const user = result.user;
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          required
          placeholder="이메일"
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          required
          placeholder="비밀번호"
          value={password}
          onChange={onChange}
          minLength={6}
        />
        <input type="submit" value={isSignupping ? "계정 생성" : "로그인"} />
      </form>
      <span onClick={toggleAccount}>
        {isSignupping ? "로그인" : "계정 생성"}
      </span>
      <div>
        <button onClick={handleSocialClick} name="google">
          Google 계정으로 이용하기
        </button>
      </div>
    </div>
  );
}
