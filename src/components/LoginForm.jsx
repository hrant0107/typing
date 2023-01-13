import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

const LoginForm = () => {
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState(null);
  const formRef = useRef();

  const { getData } = useContext(AppContext);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });
  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
      setMessageError(null);
      getData(data.email);
    } catch (err) {
      setMessageError(data.email);
      console.log(err.message);
    }
  };
  return (
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
      <div>{messageError && <span>{`${messageError} is not found`}</span>}</div>
      <button disabled={!isValid} type="submit" className="loginForm__btn">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
