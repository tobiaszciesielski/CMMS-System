import React from "react";
import SubmitForm from "./SubmitForm";
import { Redirect } from "react-router-dom";

const UnauthenticatedApp = () => {
  return (
    <React.Fragment>
      <SubmitForm />
      <Redirect from="*" to="/" />
    </React.Fragment>
  );
};

export default UnauthenticatedApp;
