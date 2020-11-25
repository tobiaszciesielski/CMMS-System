import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Card } from "./../styleComponents";

const AccountPage = () => {
  const { user, token } = useAuth();

  console.log(user)
  return (
    <div className="container">
      <Card className="text-break text-center mt-4 mx-auto">
        <h4>Your JSON Web Token is:</h4>
        <p>{`${token}`}</p>
        <h4>Your role is:</h4>
        <p>{`${user.role}`}</p>
        <h4>Your email is:</h4>
        <p>{`${user.email}`}</p>
        <h4>Your full name is:</h4>
        <p>{`${user.firstName} ${user.lastName}`}</p>
      </Card>
    </div>
  );
};

export default AccountPage;
