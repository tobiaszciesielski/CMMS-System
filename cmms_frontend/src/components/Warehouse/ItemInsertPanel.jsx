import React from 'react';
import { Card, FormWrapper, InputForm } from '../../styleComponents';
import ExitButton from './../common/ExitButton';
import { Form } from './../../styleComponents';

const ItemInsertPanel = ({categories, isFetching}) => {
  return <div className="container">
    <Card className="mt-4 mx-auto position-relative text-center">
      <form action="submit">
        <input className="form-control" style={{maxWidth: 200, marginTop: "5px"}} placeholder="Item name"/>
        <input className="form-control" style={{maxWidth: 200, marginTop: "5px"}} placeholder="Serial number"/>
        <input className="form-control" style={{maxWidth: 200, marginTop: "5px"}} placeholder="Category"/>
        <input className="form-control" style={{maxWidth: 200, marginTop: "5px"}} placeholder="Producer"/>
        <input className="form-control" style={{maxWidth: 200, marginTop: "5px"}} placeholder="Destiny"/>
        <input className="form-control" style={{maxWidth: 200, marginTop: "5px"}} placeholder="Description"/>
        <input className="form-control" style={{maxWidth: 200, marginTop: "5px"}} placeholder="Storing Location"/>
      </form>
    </Card>
  </div>
}

export default ItemInsertPanel