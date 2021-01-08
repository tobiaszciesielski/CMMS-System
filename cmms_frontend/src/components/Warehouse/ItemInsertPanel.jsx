import React from 'react';
import { Card } from '../../styleComponents';

const ItemInsertPanel = ({categories, isFetching}) => {

  return <div className="container">
    <Card className="mt-4 mx-auto position-relative">
      <h1>Create Item Form</h1>
      <h5>Add title</h5>
      <h5>Add company</h5>
      <h5>add id</h5>
    </Card>
  </div>
}

export default ItemInsertPanel