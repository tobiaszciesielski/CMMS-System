import React from "react";

export const Input = ({ changeHandler, ...rest }) => {
  return (
    <div className="mb-2">
      <input
        onChange={changeHandler}
        className="form-control"
        required={true}
        {...rest}
      />
    </div>
  );
};
