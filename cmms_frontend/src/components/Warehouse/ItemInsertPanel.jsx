import React from 'react';
import { useState } from 'react';

import ImageUploader from 'react-images-upload'

import { Card } from '../../styleComponents';

import ExitButton from './../common/ExitButton';
import ListInput from "../common/ListInput";
import Input from '../common/Input';

import { toCamelCase } from '../../utils/helpers';


const ItemInsertPanel = ({categories, isFetching}) => {
  const styleForInput = {maxWidth: 300, margin: "10px auto 0"}

  const [propertiesValuesList, setPropertiesValuesList] = useState([])
  const [formData, setFormData] = useState({
    itemName:"",
    producer:"",
    serialNumber: "",
    category: "",
    storingLocation: "",
    destiny: "",
    description: "",
    property:"", 
    value:"",
  })

  const handleChange = ({ target }) => {
    const { name, value } = target;
    let formDataTmp = { ...formData }
    formDataTmp[name] = value
    setFormData({...formDataTmp})
  };

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const renderFormField = (InputType, placeholder,  description = "", list=[], style) => {
    return <>
      <InputType value={formData[toCamelCase(placeholder)]} placeholder={placeholder} changeHandler={handleChange} style={{...styleForInput, ...style}} list={list}/>
      {description !== "" && <small id={`${toCamelCase(placeholder)}Helper`} class="form-text text-muted mt-0 mb-2">
        {description}
      </small>}
    </>
  }

  const handleAddProperty = (event) => {
    event.preventDefault()
    const { property, value } = formData
    if (property != '' && value != '') {
      let propertiesValuesListTmp = propertiesValuesList
      propertiesValuesListTmp.push({
        property: property, 
        value: value
      })
      let formDataTmp = { ...formData }
      formDataTmp.property = ''
      formDataTmp.value = ''
      setFormData({...formDataTmp})
      setPropertiesValuesList([...propertiesValuesListTmp])
    }
  }

  return <div className="container">
    <Card className="mt-4 mx-auto position-relative text-center">
      <ExitButton />
      <h2 className="mb-4">New Item</h2>
      <form className="text-center" action="submit" onSubmit={handleSubmit}>
        {renderFormField(Input, "Item Name")}
        {renderFormField(ListInput, "Producer", "", ['ABB', 'Simens'])}
        {renderFormField(Input, "Serial Number")}
        {renderFormField(ListInput, "Category", "", ['Wires', 'Engines', 'Tools'])}
        {renderFormField(ListInput, "Storing Location", "Position ID in warehouse.", ['X-1', 'X-2', 'X-4'])}
        {renderFormField(Input, "Destiny", "Where it will be used? Ex. L6")}
        {renderFormField(Input, "Description", "Additional notes about product.")}
        
        <ImageUploader
          style={{maxWidth: 400, margin: "20px auto"}}
          withIcon={true}
          buttonText='Upload image'
          imgExtension={['.jpg', '.jpeg', '.png']}
          maxFileSize={5242880}
        />

        <div className="d-flex justify-content-center align-items-center mb-3">
          {renderFormField(Input, "Property","", [], {margin:"0 10px 0 0px", maxWidth:120})}
          {renderFormField(Input, "Value", "", [], {margin:0, maxWidth:240})}
          {<button className="btn btn-primary ml-2" onClick={handleAddProperty}>Add property</button>}
        </div>
        {propertiesValuesList.map( ({property, value}) => <h5 key={property+value}>{property} : {value}</h5> )}


        <button className="btn btn-success btn-block" style={{maxWidth: 200, margin:"0 auto"}}>Insert item</button>
      </form>
    </Card>
  </div>
}

export default ItemInsertPanel