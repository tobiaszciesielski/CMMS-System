import React, { useState, useRef, useEffect, useCallback } from "react";
import { Form, FormWrapper } from "../styleComponents"
import { useAuth } from "../context/AuthProvider";
import Input from "./common/Input";

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

  const renderInput = (placeholder, type, isAutofocused = false) => {
    return (
      <Input
        style={{marginBottom: "10px"}}
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
        <h2 className="mb-4 mt-2 text-muted">CMMS System</h2>
        {renderInput("Login", "text", true)}
        {renderInput("Password", "password")}
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

export default SubmitForm;
