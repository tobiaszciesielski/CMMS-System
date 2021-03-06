import React from 'react';
import { useState, useEffect } from 'react';

import ImageUploader from 'react-images-upload'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import { Card, PropertyValueItem } from '../../styleComponents';
import { CircularProgress } from '@material-ui/core';

import ExitButton from './../common/ExitButton';
import ListInput from "../common/ListInput";
import Input from '../common/Input';

import { toCamelCase } from '../../utils/helpers';
import { get, post } from "../../services/httpService"

const ItemInsertPanel = ({categories, isFetching: isFetchingCategories}) => {
  let subSubCatList = []

  const styleForInput = {maxWidth: 300, margin: "10px auto 0"}
  const reader = new FileReader()
  const [producers, setProducers] = useState([])
  const [storingLocations, setStoringLocations] = useState([])
  const [propertiesValuesList, setPropertiesValuesList] = useState([])
  const [image, setImage] = useState(null)
  const [isFetchingFormData, setIsFetchingFormData] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  useEffect(() => {
    async function fetchData() {
      try {
        const {data: producers} = await get('/producers');
        const {data: storingLocations} = await get('/locations')
        setProducers(producers)
        setStoringLocations(storingLocations)
        setIsFetchingFormData(false);
        console.log(storingLocations)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, []);

  const validateProperty = () => {
    return (formData.property !== '' && formData.value !== '')
  }

  const findSelectedProducer = name => {
    const found = producers.filter(obj => obj.producerName === name)[0]
    return found
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    let formDataTmp = { ...formData }
    formDataTmp[name] = value
    if (name === 'producer') {
      let producer = findSelectedProducer(value)
      if (producer) {
        if (producer.producerCode !== undefined)
          formDataTmp['producerId'] = producer.producerCode 
      } else {
        formDataTmp['producerId'] = ''
      } 
    }
    setFormData({...formDataTmp})
  };

  const handleSubmit = async (event) => {
    setIsSubmitting(true)
    event.preventDefault()
    let {property, value, category, ...form} = formData
    form.properties = propertiesValuesList
    form.image = image
    form.subSubCategoryId = subSubCatList.filter(
      obj => obj.name === formData.category
    )[0].id
    
    console.log(JSON.stringify(form))
    console.log('finished')
    await post("/items/add", form)
    setIsSubmitting(false)
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

  const getSubSubCategories = () => {
    let aviableSubSubCats = []
    let catList = categories.categoryList
    for (let i = 0; i < catList.length; i++) {
      let category = catList[i]
      for (let j = 0; j < category.children.length; j++) {
      let subCategory = category.children[j]
      for (let k = 0; k < subCategory.children.length; k++) {
        let subSubCategory = subCategory.children[k]
        if (subSubCategory) {
          aviableSubSubCats.push({
            name: category.name+'>'+subCategory.name+'>'+subSubCategory.name,
            id: subSubCategory.id
          })
        }
      }
    }
  }
    subSubCatList = aviableSubSubCats
    return aviableSubSubCats.map(i => i.name)
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
      
      {
        (isFetchingCategories || isFetchingFormData) 
        ? <div style={{textAlign: "center", padding: "10px 0 10px 0"}}><CircularProgress style={{color: "#dddddd"}} size={25}/></div>
        : <form className="text-center" action="submit" onSubmit={handleSubmit}>
        {renderFormField(Input, true, "Item Name")}
        {renderFormField(Input, true, "Serial Number")}
        {renderFormField(ListInput, true, "Producer", "", producers.map(p => p.producerName))}
        {renderFormField(ListInput, false, "Producer Id")}
        {renderFormField(ListInput, true, "Category", "", getSubSubCategories())}
        {renderFormField(Input, true, "Quantity")}
        {renderFormField(ListInput, false, "Storing Location", "Position ID in warehouse.", storingLocations.map(s => s.storingLocationName))}
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

        <button className={`btn btn-success btn-block`+ (!isSubmitting? "": " disabled")} 
          style={{maxWidth: 200, margin:"0 auto"}}>
        {isSubmitting
          ? "Submitting..."
          : "Insert item"}
        </button>
      </form>}
    </Card>
  </div>
}

export default ItemInsertPanel