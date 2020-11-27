import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlusCircle, faMinusCircle, faSitemap, faEdit, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {Card, CategoryTree, Categories, SubCategories, SubSubCategory, CategoryTitle, ExitButton} from '../../styleComponents';
import {Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions} from "@material-ui/core";
import {useHistory} from "react-router-dom"
import {get} from "../../services/httpService"
import { CircularProgress } from '@material-ui/core/'

const WarehouseAdminPanel = () => {
  const dialogTypeEnums = Object.freeze({"add": 1, "edit": 2, "delete": 3});
  const history = useHistory()
  
  const [categoryTree, setCategoryTree] = useState({categoryList:[]});
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({name:''});
  const [dialogType, setDialogType] = useState(dialogTypeEnums.add);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await get('/categories');
      const data = {
        categoryList: response.data
      }
      setIsLoading(false)
      setCategoryTree({...data})
    }
    fetchData();
  }, [isLoading]); // Or [] if effect doesn't need props or state

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

    // this case is for adding new category to the category structure.
    if (category.id === undefined) {
      let tmpCategory = {
        name: categoryName, 
        children: []
      }
      tmpTree.categoryList.push(tmpCategory)

    // this case is for adding new children nodes to existing categories
    } else { 
      for (let i = 0; i < tmpTree.categoryList.length; i++) {
        findNested(tmpTree.categoryList[i], tmpTree.categoryList, category.id, i, action); // ID is string like «30»
      }
    }
    setCategoryTree({...tmpTree});
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
    let id = 0;
    return <CategoryTree>
      {categoryTree.categoryList.map((cat) => {
        cat.id = id+=1;
          return(
            <Categories key={cat.id}>
              <div className="d-inline-block mb-3">
                <span className='h4'>{cat.name}</span>
                {renderFullSetOfIcons(cat)}
              </div>
              {
                cat.children 
                && cat.children.map((subCat) => {
                  subCat.id = id+=1;
                  return <SubCategories key={subCat.id}>
                    <div className="d-inline-block mb-3 ">
                      <span className='h5'>{subCat.name}</span>
                      {renderFullSetOfIcons(subCat)}
                    </div>
                    {
                      subCat.children 
                      && subCat.children.map((subSubCat) => {
                        subSubCat.id = id+=1
                        return <SubSubCategory key={subSubCat.id}>
                          {subSubCat.name}
                          {renderIcon(faMinusCircle, "text-danger",  () => openDialog(subSubCat, dialogTypeEnums.delete))}
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
