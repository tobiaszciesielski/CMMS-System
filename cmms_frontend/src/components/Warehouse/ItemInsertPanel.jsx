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

const ItemInsertPanel = ({categories, isFetching}) => {
  const styleForInput = {maxWidth: 300, margin: "10px auto 0"}

  const [propertiesValuesList, setPropertiesValuesList] = useState([
  {property:"kolor", value:"czerwony",},
  {property:"moc", value:"200W",}
  ])
  const [image, setImage] = useState(null)
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
    console.log(picture)
    setImage(picture)
  }

  const renderFormField = (InputType, placeholder,  description = "", list=[], style) => {
    return <>
      <InputType value={formData[toCamelCase(placeholder)]} placeholder={placeholder} changeHandler={handleChange} style={{...styleForInput, ...style}} list={list}/>
      {description !== "" && <small id={`${toCamelCase(placeholder)}Helper`} class="form-text text-muted mt-0 mb-2">
        {description}
      </small>}
    </>
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
          onChange={onImgDrop}
          buttonText='Upload image'
          imgExtension={['.jpg', '.jpeg', '.png']}
          maxFileSize={5242880}
          singleImage={true}
          withPreview={true}
        />

        <div className="d-flex justify-content-center align-items-center mb-3">
          {renderFormField(Input, "Property","", [], {margin:"0 10px 0 0px", maxWidth:120})}
          {renderFormField(Input, "Value", "", [], {margin:0, maxWidth:240})}
          {<button disabled={!validateProperty()} className="btn btn-primary ml-2" onClick={handleAddProperty}>Add property</button>}
        </div>
        <ul style={{margin:0, padding:0, display:"inline-block"}}>
          {propertiesValuesList.map(({property, value}) => <PropertyValueItem key={property+value}>
            <FontAwesomeIcon onClick={() => handleDelete(property)} icon={faMinusCircle} style={{color:"#ff4040", margin:"5px 18px 0 0", cursor:"pointer", fontSize:"17px"}}/>
            <h5 style={{ color: "#007bff", marginRight:12}}>{property}:</h5>
            <h5 style={{color:"#4b4b4b"}}>{value}</h5>
          </PropertyValueItem> )}
        </ul>


        <button className="btn btn-success btn-block" style={{maxWidth: 200, margin:"0 auto"}}>Insert item</button>
      </form>
    </Card>
  </div>
}

export default ItemInsertPanel