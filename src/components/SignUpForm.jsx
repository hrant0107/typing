import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const SignUpForm = ({ onCloseSignUp }) => {
  const formRef = useRef();
  const onClose = (e) => {
    if (!formRef.current.contains(e.target)) {
      onCloseSignUp();
    }
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: "all",
  });

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      onCloseSignUp();
    } catch (err) {
      console.log(err.message);
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <div onClick={onClose} className="loginForm">
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit, onError)}
        className="form"
      >
        <h1 className="signUp__title title__form"> Sign up </h1>
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
              required: "Invalid password",
              minLength: {
                value: 5,
                message: "minimum 5",
              },
            })}
          />
          <span className="error__style">
            {errors?.password && <p>{errors?.password.message}</p>}
          </span>
        </div>
        <button disabled={!isValid} type="submit" className="loginForm__btn">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
