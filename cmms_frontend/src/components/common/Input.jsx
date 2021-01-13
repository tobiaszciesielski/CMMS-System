import React from "react";
import { toCamelCase } from '../../utils/helpers'

const Input = ({ changeHandler, ...rest}) => {
  return <input
    onChange={changeHandler}
    className="form-control"
    required={true}
    name={toCamelCase(rest.placeholder)}
    {...rest}
  />
};

export default Input
