import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusCircle, faMinusCircle, faSitemap, faEdit} from "@fortawesome/free-solid-svg-icons";
import {Card, CategoryTree, Categories, SubCategories, SubSubCategory, CategoryTitle } from '../../styleComponents';

const data = {
  categoryList: [
    {
      categoryName: "Hydraulic",
      id: "1",
      children:[
        {
          subCategoryName: "Wires",
          id: "2",
          children: [
            {
              subSubCategoryName: "High pressure",
              id: "3"
            },
            {
              subSubCategoryName: "Low pressure",
              id: "4"
            }
          ]
        },
        {
          subCategoryName: "Pumps",
          id: "5",
          children: [
            {
              subSubCategoryName: "High power",
              id: "6"
            },
            {
              subSubCategoryName: "Low power",
              id: "7"
            }
          ]
        }

      ]
    },
    {
      categoryName: "Electrical",
      id: "8",
      children: [
        {
          subCategoryName: "Engines",
          id: "9",
          children: [
            {
              subSubCategoryName: "Three-Phaze",
              id: "10"
            },
            {
              subSubCategoryName: "Single-Phaze",
              id: "11"
            }
          ]
        }
      ]
    },
    {
      categoryName: "Telefonia",
      id: "12"
    },
    {
      categoryName: "Narzędzia",
      id: "13",
      children: [
        {
          subCategoryName: "Mechaniczne",
          id: "14"
        }
      ]
    },
  ]
}

const WarehouseAdminPanel = () => {
  const [categoryTree, setCategoryTree] = useState(data) 

  const renderTitle = () => {
    return <CategoryTitle>
    <h2>Category structure</h2>
      <FontAwesomeIcon className="h3 mt-2" icon={faSitemap}/>
    </CategoryTitle>
  };

  // const deleteNode = (object) => {
  //   for(let i = 0; i < categoryTree.categoryList.length; i++) {
  //     findChild(object.id, categoryTree.categoryList, categoryTree.categoryList[i], i)
  //   }
  // }

  // const findChild = (id, parent, object, i) => {
  //   if (id === object.id) {
  //     parent.splice(i, 1);
  //     console.log(parent[i]);
  //   }

  //   if (object.children) {
  //       for (let j = 0; j < object.children.length; j++) {
  //         findChild(id, object.children, object.children[j], j);
  //       }
  //     }
  // }

  const deleteNode = (object) => {
    let tmpTree = categoryTree;
    for (let i = 0; i < tmpTree.categoryList.length; i++) {
      findNested(tmpTree.categoryList[i], tmpTree.categoryList, object.id, i); // ID is string like «30»
    }
    setCategoryTree({...tmpTree});
  }

  const findNested =  (obj, parent, value, i) => {
    if (obj.id === value) {
        parent.splice(i, 1);
    }
    if (obj && obj.children && obj.children.length > 0) {
      for (let j = 0; j < obj.children.length; j++) {
          findNested(obj.children[j], obj.children, value, j);
      }
    }
  }


  const renderIcon = (icon, color, callback) => {
    return <FontAwesomeIcon className={'pointer ml-3 action-icon ' + color} icon={icon} onClick={callback}/>
  }
    
  const renderFullSetOfIcons = (object) => {
    return <React.Fragment>
      {renderIcon(faMinusCircle, "text-danger",  () => deleteNode(object))}
      {renderIcon(faEdit, "text-primary", () => console.log('edit'))}
      {renderIcon(faPlusCircle, "text-success", () => console.log('add'))}
    </React.Fragment>
  }

  const renderCategoryTree = () => {
    return <CategoryTree>
      {categoryTree.categoryList.map((cat) => {
          return(
            <Categories key={cat.id}>
              <div className="d-inline-block mb-3">
                <span className='h4'>{cat.categoryName}</span>
                {renderFullSetOfIcons(cat)}
              </div>
              {
                cat.children 
                && cat.children.map((subCat) => {
                  return <SubCategories key={subCat.id}>
                    <div className="d-inline-block mb-3 ">
                      <span className='h5'>{subCat.subCategoryName}</span>
                      {renderFullSetOfIcons(subCat)}
                    </div>
                    {
                      subCat.children 
                      && subCat.children.map((subSubCat) => {
                        return <SubSubCategory key={subSubCat.id}>
                          {subSubCat.subSubCategoryName}
                          {renderIcon(faMinusCircle, "text-danger",  () => deleteNode(subSubCat))}
                          {renderIcon(faEdit, "text-primary", () => console.log(subSubCat))}
                        </SubSubCategory>
                      })
                    }
                  </SubCategories>   
                })
              }
            </Categories>
          )
        }
)}
    </CategoryTree>
  };

  const renderAddButton = () => {
    return <div className="btn btn-primary btn-small align-self-center mt-5">New category</div>
  };

  return <div className="container">
    <Card className="mt-4 mx-auto text-center">
      {renderTitle()}
      {renderCategoryTree()}
      {renderAddButton()}
    </Card>
  </div>
};

export default WarehouseAdminPanel;
