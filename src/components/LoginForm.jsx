import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = ({ onCloseLogin }) => {
  const formRef = useRef();
  const onClose = (e) => {
    if (!formRef.current.contains(e.target)) {
      onCloseLogin();
    }
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = async (data) => {
    try {
      console.log(data);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      onCloseLogin();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div onClick={onClose} className="loginForm">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="form">
        <h1 className="signUp__title title__form"> Login </h1>
        <div className="input__block">
          <input
            type="email"
            placeholder="Email"
            className="input__login"
            {...register("email", {
              required: "Invalid email",
            })}
          />

          <span className="error__style">
            {errors?.email && <p>{errors?.email.message}</p>}
          </span>
        </div>

        <div className="input__block">
          <input
            type="password"
            placeholder="Password"
            className="input__login"
            {...register("password", {
              required: "Wrong password",
            })}
          />
          <span className="error__style">
            {errors?.password && <p>{errors?.password.message}</p>}
          </span>
        </div>
        <button disabled={!isValid} type="submit" className="loginForm__btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
