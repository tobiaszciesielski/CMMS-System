import React from 'react';
import { Card } from '../../styleComponents';
import ExitButton from './../common/ExitButton';
import ListInput from "../common/ListInput";
import Input from '../common/Input';
import { toCamelCase } from '../../utils/helpers';


const ItemInsertPanel = ({categories, isFetching}) => {
  const styleForInput = {maxWidth: 300, margin: "10px auto 0"}

  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value)
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event.target)
  }

  const renderFormField = (InputType, placeholder,  description = "", list=[]) => {
    return <>
      <InputType placeholder={placeholder} changeHandler={handleChange} style={styleForInput} list={list}/>
      {description !== "" && <small id={`${toCamelCase(placeholder)}Helper`} class="form-text text-muted mt-0 mb-2">
        {description}
      </small>}
    </>
  }

  return <div className="container">
    <Card className="mt-4 mx-auto position-relative text-center">
      <ExitButton />
      <h2 className="mb-4">Item Formula</h2>
      <form className="text-center" action="submit" onSubmit={handleSubmit}>
        {renderFormField(Input, "Item Name")}
        {renderFormField(ListInput, "Producer", "", ['ABB', 'Simens'])}
        {renderFormField(Input, "Serial Number")}
        {renderFormField(ListInput, "Category", "", ['Wires', 'Engines', 'Tools'])}
        {renderFormField(ListInput, "Storing Location", "Position ID in warehouse.", ['X-1', 'X-2', 'X-4'])}
        {renderFormField(Input, "Destiny", "Where it will be used? Ex. L6")}
        {renderFormField(Input, "Description", "Additional notes about product.")}
        
        <button className="btn btn-success">Add new item</button>
      </form>
    </Card>
  </div>
}

export default ItemInsertPanel