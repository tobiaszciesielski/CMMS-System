import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusCircle, faMinusCircle, faSitemap, faEdit} from "@fortawesome/free-solid-svg-icons";
import {Card, CategoryTree, Categories, SubCategories, SubSubCategory, CategoryTitle } from '../../styleComponents';
import {Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions} from "@material-ui/core";

const data = {
  categoryList: [
    {
      name: "Hydraulic",
      id: "1",
      children:[
        {
          name: "Wires",
          id: "2",
          children: [
            {
              name: "High pressure",
              id: "3"
            },
            {
              name: "Low pressure",
              id: "4"
            }
          ]
        },
        {
          name: "Pumps",
          id: "5",
          children: [
            {
              name: "High power",
              id: "6"
            },
            {
              name: "Low power",
              id: "7"
            }
          ]
        }

      ]
    },
    {
      name: "Electrical",
      id: "8",
      children: [
        {
          name: "Engines",
          id: "9",
          children: [
            {
              name: "Three-Phaze",
              id: "10"
            },
            {
              name: "Single-Phaze",
              id: "11"
            }
          ]
        }
      ]
    },
    {
      name: "Telefonia",
      id: "12"
    },
    {
      name: "Narzędzia",
      id: "13",
      children: [
        {
          name: "Mechaniczne",
          id: "14"
        }
      ]
    },
  ]
}

const WarehouseAdminPanel = () => {
  const dialogTypeEnums = Object.freeze({"add": 1, "edit": 2});
  
  const [categoryTree, setCategoryTree] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({name:''});
  const [dialogType, setDialogType] = useState(dialogTypeEnums.add);


  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  }

  const openDialog = (category, type) => {
    setDialogType(type);
    setSelectedCategory(category);
    
    type === dialogTypeEnums.add
      ? setCategoryName('')
      : setCategoryName(category.name)
    
      setIsOpen(true);
  }
  
  const closeDialog = () => {
    setIsOpen(false);
  }
 
  const handleEdit = () => {
    console.log(selectedCategory.name + " changes to " + categoryName)
    closeDialog();
  }

  const handleInsert = () => {
    console.log("New category: " + categoryName + " insert into" + selectedCategory.name);
    closeDialog();
  }

  const deleteNode = (category) => {
    let tmpTree = categoryTree;
    for (let i = 0; i < tmpTree.categoryList.length; i++) {
      findNested(tmpTree.categoryList[i], tmpTree.categoryList, category.id, i); // ID is string like «30»
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

  const renderAddDialog = () => {
    return <Dialog open={isOpen} onClose={closeDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {dialogType === dialogTypeEnums.add ? `Insert new category into ${selectedCategory.name}` : "Edit category name"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          type="text"
          fullWidth
          value={categoryName}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button 
          color="primary"
          onClick={dialogType === dialogTypeEnums.add ? handleInsert : handleEdit}>
          {dialogType === dialogTypeEnums.add ? "Insert" : "Save"}
        </Button>
        <Button onClick={closeDialog} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  }

  const renderTitle = () => {
    return <CategoryTitle>
    <h2>Category structure</h2>
      <FontAwesomeIcon className="h3 mt-2" icon={faSitemap}/>
    </CategoryTitle>
  };

  const renderIcon = (icon, color, callback) => {
    return <FontAwesomeIcon className={'pointer ml-3 action-icon ' + color} icon={icon} onClick={callback}/>
  }

  const renderFullSetOfIcons = (category) => {
    return <React.Fragment>
      {renderIcon(faMinusCircle, "text-danger",  () => deleteNode(category))}
      {renderIcon(faEdit, "text-primary", () => openDialog(category, dialogTypeEnums.edit))}
      {renderIcon(faPlusCircle, "text-success", () => openDialog(category, dialogTypeEnums.add))}
    </React.Fragment>
  }

  const renderCategoryTree = () => {
    return <CategoryTree>
      {categoryTree.categoryList.map((cat) => {
          return(
            <Categories key={cat.id}>
              <div className="d-inline-block mb-3">
                <span className='h4'>{cat.name}</span>
                {renderFullSetOfIcons(cat)}
              </div>
              {
                cat.children 
                && cat.children.map((subCat) => {
                  return <SubCategories key={subCat.id}>
                    <div className="d-inline-block mb-3 ">
                      <span className='h5'>{subCat.name}</span>
                      {renderFullSetOfIcons(subCat)}
                    </div>
                    {
                      subCat.children 
                      && subCat.children.map((subSubCat) => {
                        return <SubSubCategory key={subSubCat.id}>
                          {subSubCat.name}
                          {renderIcon(faMinusCircle, "text-danger",  () => deleteNode(subSubCat))}
                          {renderIcon(faEdit, "text-primary", () => openDialog(subSubCat, dialogTypeEnums.edit))}
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
    return <div className="btn btn-primary btn-small align-self-center mt-5" 
      onClick={() => openDialog({name: "category structure"}, dialogTypeEnums.add)}>
      New category
    </div>
  };

  return <div className="container">
    <Card className="mt-4 mx-auto text-center">
      {renderAddDialog()}
      {renderTitle()}
      {renderCategoryTree()}
      {renderAddButton()}
    </Card>
  </div>
};

export default WarehouseAdminPanel;
