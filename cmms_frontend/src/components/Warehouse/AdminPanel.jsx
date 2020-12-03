import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusCircle, faMinusCircle, faSitemap, faEdit, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {Card, CategoryTree, CatName, SubCatName, SubSubCatName, CategoryTitle, ExitButton} from '../../styleComponents';
import {Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions} from "@material-ui/core";
import {useHistory} from "react-router-dom"
import { CircularProgress } from '@material-ui/core/'
import { MenuItem } from './../../styleComponents';

const WarehouseAdminPanel = ({isFetching, categories}) => {
  const dialogTypeEnums = Object.freeze({"add": 1, "edit": 2, "delete": 3});
  const history = useHistory()
  
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({name:''});
  const [dialogType, setDialogType] = useState(dialogTypeEnums.add);
  const [categoryTree, setCategoryTree] = useState(categories);
  const [isLoading, setIsLoading] = useState(isFetching);
  const [highestId, setHighestId] = useState(0);

  useEffect(() => {
    setCategoryTree(categories);
    setIsLoading(isFetching);
  }, [isFetching, categories]); 

  const openDialog = (category, type) => {
    setDialogType(type);
    setSelectedCategory(category);
    
    type === dialogTypeEnums.add
    ? setCategoryName('')
    : setCategoryName(category.name)
    
    setIsOpen(true);
  }
  
  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  }

  const handleDelete = () => {
    modifyNodeInTree(selectedCategory, dialogTypeEnums.delete);
    closeDialog();
  }

  const handleEdit = () => {
    modifyNodeInTree(selectedCategory, dialogTypeEnums.edit);
    closeDialog();
  }

  const handleInsert = () => {
    modifyNodeInTree(selectedCategory, dialogTypeEnums.add);
    closeDialog();
  }

  const closeDialog = () => {
    setIsOpen(false);
  }

  const modifyNodeInTree = (category, action) => {
    let tmpTree = categoryTree;
    console.log(highestId)
    // this case is for adding new category to the category structure.
    if (category.id === undefined) {
      let tmpCategory = {
        name: categoryName,
        id: highestId,
        children: []
      }
      tmpTree.categoryList.push(tmpCategory)

    // this case is for adding new children nodes to existing categories
    } else { 
      for (let i = 0; i < tmpTree.categoryList.length; i++) {
        findNested(tmpTree.categoryList[i], tmpTree.categoryList, category.id, i, action); // ID is string like «30»
      }
    }
    setHighestId(highestId+1)
    setCategoryTree({...tmpTree});
    console.log(tmpTree);
  }

  const findNested =  (obj, parent, value, i, action) => {
    switch(action) {
      case dialogTypeEnums.add:
        if (obj.id === value) {
          if (!obj.children) {
            obj.children = [];
          }
          obj.children.push({name: categoryName, children: []});
          return;
        }
        break;
      case dialogTypeEnums.edit:
        if (obj.id === value) {
          obj.name = categoryName;
        }
        break;
      case dialogTypeEnums.delete:
        if (obj.id === value) {
          parent.splice(i, 1);
        }
        break;
      default: break;
    }
    
    if (obj && obj.children && obj.children.length > 0) {
      for (let j = 0; j < obj.children.length; j++) {
          findNested(obj.children[j], obj.children, value, j, action);
      }
    }
  }

  const renderDialog = () => {
    let dialogTitle, buttonText, handler;
    switch (dialogType){

      case dialogTypeEnums.add: 
        dialogTitle = `Insert new category into "${selectedCategory.name}"`;
        buttonText = "Insert"
        handler = handleInsert;
        break;
      case dialogTypeEnums.edit: 
        dialogTitle = "Edit category name";
        buttonText = "Save"
        handler = handleEdit;
        break;
      case dialogTypeEnums.delete:
        handler = handleDelete;
        buttonText = "Yes"
        dialogTitle = `Are you sure you want delete "${selectedCategory.name}"?`
        break;
      default: break;
     }
      
    return <Dialog open={isOpen} onClose={closeDialog} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {dialogTitle}
      </DialogTitle>
      <DialogContent>
      {dialogType !== dialogTypeEnums.delete  &&
        <TextField
          autoFocus
          margin="dense"
          id="name"
          type="text"
          fullWidth
          value={categoryName}
          onChange={handleInputChange}
        />}
      </DialogContent>
      <DialogActions>
        <Button 
          color="primary"
          onClick={handler}>
          {buttonText}
        </Button>
        <Button onClick={closeDialog} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  }

  const renderExitButton = () => {
    return <div className="text-left mb-2 m-md-0">
      <ExitButton className="btn btn-outline-danger" onClick={() => {history.goBack()}
      }>
        Exit
        <FontAwesomeIcon className="ml-2" icon={faSignOutAlt}/>
      </ExitButton>
    </div> 
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
      {renderIcon(faMinusCircle, "text-danger",  () => openDialog(category, dialogTypeEnums.delete))}
      {renderIcon(faEdit, "text-primary", () => openDialog(category, dialogTypeEnums.edit))}
      {renderIcon(faPlusCircle, "text-success", () => openDialog(category, dialogTypeEnums.add))}
    </React.Fragment>
  }

  const renderCategoryTree = () => {
    return (
      <CategoryTree>
        {categoryTree.categoryList.length == 0 
        ? <div className= "text-center my-3"><CircularProgress style={{color: "#dddddd"}} size={25}/></div>
        : <ul className="list-unstyled d-flex flex-column justify-content-center pl-0 pl-sm-5">
          {
            categoryTree.categoryList.map((cat) => {
              if(!cat.id) {
                  cat.id = highestId
                } else if(cat.id > highestId) {
                  setHighestId(cat.id);
                }
              return <ul key={cat.id} className="pl-0 pl-md-3">
              <CatName>{cat.name}</CatName>
              {renderFullSetOfIcons(cat)}
              {
                cat.children && <ul className="pl-5 mt-3 list-unstyled">
                  {cat.children.map((subCat) => {
                    if(!subCat.id) {
                      subCat.id = highestId
                    } else if(subCat.id > highestId) {
                        setHighestId(subCat.id);
                    }
                    return <MenuItem key={subCat.id}>
                    <SubCatName>{subCat.name}</SubCatName>
                    {renderFullSetOfIcons(cat)}
                    {
                      subCat.children && <ul className="pl-5 py-3 list-unstyled">
                        {subCat.children.map((subSubCat) => 
                        {
                          if(!subSubCat.id) {
                            subSubCat.id = highestId
                          } else if(subSubCat.id > highestId) {
                              setHighestId(subSubCat.id);
                          }
                          return <MenuItem key={subSubCat.id} className="py-1">
                            <SubSubCatName>
                              {subSubCat.name}
                            </SubSubCatName>
                            {renderIcon(faMinusCircle, "text-danger",  () => openDialog(subSubCat, dialogTypeEnums.delete))}
                            {renderIcon(faEdit, "text-primary", () => openDialog(subSubCat, dialogTypeEnums.edit))}
                          </MenuItem>}
                        )}
                      </ul> 
                    }
                    </MenuItem>}  
                  )}
                </ul> 
              }
            </ul>})
          }
        </ul>}
      </CategoryTree>
    )
  }

  const renderAddButton = () => {
    const isDisabled = isLoading ? "disabled" : ""
    return <div className="text-center">
      <div className={`btn btn-primary btn-small mt-4 ${isDisabled}`}
        onClick={isLoading ? null : () => openDialog({name: "category structure"}, dialogTypeEnums.add)}>
        New category
      </div>
    </div>
  };

  return <div className="container">
    <Card className="mt-4 mx-auto position-relative">
      {renderDialog()}
      {renderExitButton()}
      {renderTitle()}
      {isLoading 
        ? <div className= "text-center my-3"><CircularProgress color="inherit"/></div>
        : renderCategoryTree()}
      {renderAddButton()}
    </Card>
  </div>
};

export default WarehouseAdminPanel;
