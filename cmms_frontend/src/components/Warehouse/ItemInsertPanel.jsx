import React from 'react';
import { Card, FormWrapper, InputForm } from '../../styleComponents';
import ExitButton from './../common/ExitButton';
import { Form } from './../../styleComponents';
import { Input } from './../common/Input';
import { useState } from 'react';


const ListInput = ({placeholder, changeHandler, list, ...rest}) => {

  const [itemId, setItemId] = useState(placeholder.toLowerCase().replace(' ', '_'))
  return <>
    <Input
      name={itemId} // replace 'Item Name' with 'item_name'
      placeholder={placeholder}
      type="text"
      changeHandler={changeHandler}
      list={itemId} 
      {...rest}
    />
    <datalist id={itemId}>
      {list.map((item)=><option key={item} value={item} />)}
    </datalist>
  </>
}

const ItemInsertPanel = ({categories, isFetching}) => {

  const list = ["test", "houston", "copy"]
  const labels = [
    "Item Name",
    "Serial Number",
    "Producer",
    "Destiny",
    "Description",
    "Storing Location"
  ]

  const handleChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value)
  };

  return <div className="container">
    <Card className="mt-4 mx-auto position-relative text-center">
      <ExitButton />
      <form action="submit" onSubmit={(event)=>{event.preventDefault()}}>
        {labels.map((label) => <ListInput style={{maxWidth: 200, marginTop: "5px"}} placeholder={label} list={list}/>)}
        <button type="submit">Submit</button>
      </form>
    </Card>
  </div>
}

export default ItemInsertPanel