import React from 'react';
import Input from './Input';
import { useState } from 'react';
import {toCamelCase} from '../../utils/helpers'

const ListInput = ({placeholder, list, ...rest}) => {

   
  const [name, setName] = useState(toCamelCase(placeholder))
  
  return <>
    <Input
      name={name} 
      placeholder={placeholder}
      type="text"
      list={name} 
      required={false}
      {...rest}
    />
    <datalist id={name}>
      {list.map((item)=><option key={item} value={item} />)}
    </datalist>
  </>
}

export default ListInput