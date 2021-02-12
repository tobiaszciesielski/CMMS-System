import React from 'react';
import { useState } from 'react';

import ImageUploader from 'react-images-upload'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import { Card, PropertyValueItem } from '../../styleComponents';

import ExitButton from './../common/ExitButton';
import ListInput from "../common/ListInput";
import Input from '../common/Input';

import { toCamelCase } from '../../utils/helpers';
import { post } from "../../services/httpService"

const ItemInsertPanel = ({categories, isFetching}) => {
  const styleForInput = {maxWidth: 300, margin: "10px auto 0"}
  const reader = new FileReader()
  const [propertiesValuesList, setPropertiesValuesList] = useState([])
  const [image, setImage] = useState(null)
  const [formData, setFormData] = useState({
    itemName:"",
    producer:"",
    producerId:"",
    serialNumber: "",
    category: "",
    quantity: "",
    storingLocation: "",
    destiny: "",
    description: "",
    property:"", 
    value:"",
  })

  const validateProperty = () => {
    return (formData.property !== '' && formData.value !== '')
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    let formDataTmp = { ...formData }
    formDataTmp[name] = value
    setFormData({...formDataTmp})
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    let {property, value, ...form} = formData
    form.properties = propertiesValuesList
    form.image = image
    const json_form = JSON.stringify(form)
    console.log(json_form)
    post("/items/add", json_form)
  }

  const handleAddProperty = (event) => {
    event.preventDefault()
    const { property, value } = formData
    if (validateProperty()) {
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
  
  const handleDelete = (property) => {
    let propValList = propertiesValuesList
    var result = propValList.filter(obj => {
      return obj.property !== property
    })
    setPropertiesValuesList([...result])
  }
  
  const onImgDrop = (picture) => {
    reader.readAsDataURL(picture[0]);
    reader.onload = () => {
      setImage(reader.result)
    }
  }

  const renderFormField = (InputType, required, placeholder,  description = "", list=[], style) => {
    return <>
      <InputType required={required} value={formData[toCamelCase(placeholder)]} placeholder={placeholder} changeHandler={handleChange} style={{...styleForInput, ...style}} list={list}/>
      {description !== "" && <small id={`${toCamelCase(placeholder)}Helper`} className="form-text text-muted mt-0 mb-2">
        {description}
      </small>}
    </>
  }
  
  return <div className="container">
    <Card className="mt-4 mx-auto position-relative text-center">
      <ExitButton />
      <h2 className="mb-4">New Item</h2>
      <form className="text-center" action="submit" onSubmit={handleSubmit}>
        {renderFormField(Input, true, "Item Name")}
        {renderFormField(ListInput, true, "Producer", "", ['ABB', 'Simens'])}
        {renderFormField(ListInput, false, "Producer Id")}
        {renderFormField(Input, true, "Serial Number")}
        {renderFormField(ListInput, true, "Category", "", ['Wires', 'Engines', 'Tools'])}
        {renderFormField(Input, true, "Quantity")}
        {renderFormField(ListInput, false, "Storing Location", "Position ID in warehouse.", ['X-1', 'X-2', 'X-4'])}
        {renderFormField(Input, false, "Destiny", "Where it will be used? Ex. L6")}
        {renderFormField(Input, false, "Description", "Additional notes about product.")}
        
        <ImageUploader
          style={{maxWidth: 400, margin: "20px auto"}}
          withIcon={true}
          onChange={onImgDrop}
          buttonText='Upload image'
          imgExtension={['.jpg', '.jpeg', '.png']}
          maxFileSize={5242880}
          singleImage={true}
          withPreview={true}
        />

        <div className="d-flex justify-content-center align-items-center mb-3">
          {renderFormField(Input, false, "Property","", [], {margin:"0 10px 0 0px", maxWidth:133})}
          {renderFormField(Input, false, "Value", "", [], {margin:0, maxWidth:133})}
          {<button disabled={!validateProperty()} className="btn btn-primary ml-2" onClick={handleAddProperty}>Add property</button>}
        </div>
        <ul style={{margin:0, padding:0, display:"inline-block"}}>
          {propertiesValuesList.map(({property, value}) => <PropertyValueItem key={property+value}>
            <FontAwesomeIcon onClick={() => handleDelete(property)} icon={faMinusCircle} style={{color:"#ff4040", margin:"5px 18px 0 0",  cursor:"pointer", fontSize:"17px"}}/>
            <h5 style={{color: "#007bff", margin:"0 15px 0 0"}}>{property}:</h5>
            <h5 style={{color:"#4b4b4b", margin:0}}>{value}</h5>
          </PropertyValueItem> )}
        </ul>

        <button className="btn btn-success btn-block" style={{maxWidth: 200, margin:"0 auto"}}>Insert item</button>
      </form>
    </Card>
  </div>
}

export default ItemInsertPanel