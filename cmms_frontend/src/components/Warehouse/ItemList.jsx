import React from 'react';
import styled from "styled-components";

export const ItemCard = styled.div`
  background-color: whitesmoke;
  box-shadow: 3px 3px 8px rgb(0, 0, 0, 0.1);
  border-radius: 10px;
`;

export const Title = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 20px 5px 20px;

  h4 {
    margin-top: 7px;
  }

  .admin-buttons {
    align-self: center;
  }


  button {
    margin-left: 5px;
    padding-top: 3px;
    padding-bottom: 3px;
    min-width: 100px;
  }

  &::after {
    position: absolute;
    border-bottom: 2px #CBCBCB solid;
    width: 100%;
    bottom: 0;
    left: 0;
    content: "";
  }
`;

const ItemList = ({items}) => {
  
  return <> {items.map(i => <ItemCard key={i.itemId} className="mt-4">
      <Title>
        <h4>{i.itemName}</h4>
        <div className="admin-buttons">
          <button className="btn btn-primary">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </Title>
      <ul>
        <li>{i.Producer.producerName}</li>
        <li>{i.SubSubCategory.subSubCategoryName}</li>
        <li>{i.StoringLocation.StoringLocationName}</li>
      </ul>
      </ItemCard>
    )}
  </>
}
 

export default ItemList;

// [
//     {
//         "itemId": 1010,
//         "itemName": "Silnik BLDC",
//         "serialNumber": "11-2234-4512-24",
//         "subSubCategoryId": 4,
//         "producerId": 5,
//         "inStock": 1,
//         "image": null,
//         "destiny": "Do napedzania linii",
//         "description": "Prosze uwazac na podlaczenie                                                                                                                                                                                                                                   ",
//         "storingLocationId": 1005,
//         "Producer": {
//             "producerId": 5,
//             "producerName": "ABB",
//             "producerCode": "312312awdr312312312"
//         },
//         "SubSubCategory": {
//             "subSubCategoryId": 4,
//             "subSubCategoryName": "1 fazowe",
//             "subCategoryId": 3
//         },
//         "StoringLocation": {
//             "storingLocationId": 1005,
//             "storingLocationName": "XXX-2"
//         },
//         "PropertiesValues": [
//             {
//                 "propertiesValuesId": 8,
//                 "itemId": 1010,
//                 "propertyId": 1008,
//                 "valueId": 1008,
//                 "Property": {
//                     "propertyId": 1008,
//                     "propertyName": "kolor"
//                 },
//                 "Value": {
//                     "valueId": 1008,
//                     "valueName": "zielony"
//                 }
//             },
//             {
//                 "propertiesValuesId": 9,
//                 "itemId": 1010,
//                 "propertyId": 1009,
//                 "valueId": 1009,
//                 "Property": {
//                     "propertyId": 1009,
//                     "propertyName": "rozmiar"
//                 },
//                 "Value": {
//                     "valueId": 1009,
//                     "valueName": "bardzo małe"
//                 }
//             },
//             {
//                 "propertiesValuesId": 10,
//                 "itemId": 1010,
//                 "propertyId": 1010,
//                 "valueId": 1010,
//                 "Property": {
//                     "propertyId": 1010,
//                     "propertyName": "potęga"
//                 },
//                 "Value": {
//                     "valueId": 1010,
//                     "valueName": "bardzo nieduże"
//                 }
//             }
//         ]
//     }
// ]