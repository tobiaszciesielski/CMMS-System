import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
// import authService from "../services/authService.js";
import { useAuth } from "../context/AuthProvider";
import { Input } from "./common/Input";

export const SubmitForm = () => {
  const [data, setData] = useState({ login: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const isMounted = useRef(true);
  const { login } = useAuth();

  const getCurrentYear = () => new Date().getFullYear();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    let loginData = { ...data };
    loginData[name] = value;
    setData(loginData);
  };

  useEffect(() => () => (isMounted.current = false), []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isSubmiting) return;
      setIsSubmiting(true);

      let error = await login(data.login, data.password);
      // update only if component is mounted
      if (isMounted.current) {
        // first setState than exact url change to avoid memory leaks
        setLoginError(error);
        setIsSubmiting(false);
      }
    },
    [isSubmiting, data, login]
  );

  const renderInput = (name, placeholder, type, isAutofocused = false) => {
    return (
      <Input
        name={name}
        placeholder={placeholder}
        type={type}
        changeHandler={handleChange}
        autoFocus={isAutofocused}
      />
    );
  };

  return (
    <FormWrapper className="login-form">
      <Form className="text-center" onSubmit={handleSubmit}>
        <img
          src={require("./assets/gestamp_logo.png")}
          width="100%"
          alt="Gestamp Logo"
        />
        <h2 className=" mb-4 mt-2 text-muted">CMMS System</h2>
        {renderInput("login", "Login", "text", true)}
        {renderInput("password", "Password", "password")}
        {loginError && <div className="alert alert-danger">{loginError}</div>}
        <button
          className="btn btn-primary btn-block mt-3"
          type="submit"
          disabled={isSubmiting}
        >
          {isSubmiting ? "Submiting..." : "Submit"}
        </button>
        <p className="mt-5 mb-0 small text-muted">
          &copy; {getCurrentYear()} Tobiasz Ciesielski
        </p>
      </Form>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  max-width: 350px;
  margin: auto;
  display: flex;
  align-items: center;
  height: 100%;
`;

const Form = styled.form`
  padding: 25px 15px;
  background-color: whitesmoke;
  border-radius: 6px;
  box-shadow: 3px 3px 8px rgb(0, 0, 0, 0.1);
`;

export default SubmitForm;
