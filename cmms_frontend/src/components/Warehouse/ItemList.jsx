import React from 'react';
import styled from "styled-components";

const ItemCard = styled.div`
  background-color: whitesmoke;
  box-shadow: 3px 3px 8px rgb(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Title = styled.div`
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

const ItemImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 5px;
  margin: 10px 20px 10px 30px;
`

const Properties = styled.div`
  width:100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;

  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    list-style: none;
    margin: 15px 0;
    padding: 0;
  }

  ul > li {
    font-size: 16px;
  }

  ul > li > span {
    font-size: 1.2em;
    font-weight: 500;
  }
`

const Body = styled.div`
  display: flex;
`

function toBase64(arr) {
   return btoa(
      arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
   );
}

const ItemList = ({items}) => {
  return <> {items.map(item => <ItemCard key={item.itemId} className="mt-4">
      {console.log(item.image)}
      <Title>
        <h4>{item.itemName}</h4>
        <div className="admin-buttons">
          <button className="btn btn-primary">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div> 
      </Title>
      <Body>
        <ItemImage src={!item.image 
          ? require("../assets/image-not-found.svg") 
          : `data:image/png;base64,${toBase64(item.image.data)}`}
        />
        <Properties>
          <ul>
            <li>Serial Number: <span>{item.serialNumber}</span></li>
            <li>Producer Name: <span>{item.Producer.producerName}</span></li>
            <li>Producer Code: <span>{item.Producer.producerCode}</span></li>
            <li>Category: <span>{item.SubSubCategory.subSubCategoryName}</span></li>
          </ul>
          <ul>
            <li>Description: <b>{item.description}</b></li>
            <li>Destiny: <b>{item.destiny}</b></li>
            <li>In Stock: <span>{item.inStock}</span></li>
          </ul>
          <ul className=" mr-2">
            <li className="w-100"><button className="btn btn-secondary w-100">Technicalities</button></li>
            <li>
            <div className="d-flex justify-content-center"><div className="mb-2">You have rented: 0</div></div>
              <div className="rental d-flex">
                <button className="btn btn-outline-dark w-100 mr-1">Return</button>
                <button className="btn btn-success w-100 ml-1">Rent</button>
              </div>
            </li>
          </ul>
        </Properties>
      </Body>
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