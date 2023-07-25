import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authService } from "../../firebase";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupping, setIsSignupping] = useState(false);
  const [error, setError] = useState("");

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.name === "email") {
      setEmail(ev.target.value);
    } else {
      setPassword(ev.target.value);
    }
  };
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // console.log(email, password);
    const emailSignin = async (email: string, password: string) => {
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
    };
    emailSignin(email, password).catch((err) => {
      console.log(err);
    });
    // console.log(data);
  };
  const toggleAccount = () => setIsSignupping((prev) => !prev);
  return (
    <>
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
    </>
  );
}
