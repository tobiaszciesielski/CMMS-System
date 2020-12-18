import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { post } from "../../services/httpService";

import { faPlusCircle, faMinusCircle, faSitemap, faEdit, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { CircularProgress } from '@material-ui/core/'
import { MenuItem, Card, CategoryTree, CatName, SubCatName, SubSubCatName, CategoryTitle, ExitButton } from '../../styleComponents';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from "@material-ui/core";

const WarehouseAdminPanel = ({isFetching, categories, updateHandler}) => {
  const dialogTypeEnums = Object.freeze({"add": 1, "edit": 2, "delete": 3});
  const history = useHistory()
  
  const [information, setInformation] = useState("")
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [isChaged, setIsChanged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({name:''});
  const [dialogType, setDialogType] = useState(dialogTypeEnums.add);
  const [categoryTree, setCategoryTree] = useState({categoryList:[]});
  const [isLoading, setIsLoading] = useState(isFetching);
  const [highestId, setHighestId] = useState(0);
  
  useEffect(() => {
    setCategoryTree(JSON.parse(JSON.stringify(categories)));
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
    setInformation("")
    let tmpTree = categoryTree;
    let tmpId = highestId;
    
    // this case is for adding new category to the category structure.
    if (category.id === undefined) {
      if (categoryName === "") {
        setInformation("Name cannot be empty");
      } else if (categoryName.length > 20) {
        setInformation("Name too long (max 20 characters)");
      } else {

        tmpId+=1
        let tmpCategory = {
          name: categoryName,
          id: tmpId,
          children: []
        }
        tmpTree.categoryList.push(tmpCategory)
        setIsChanged(true);
        setHighestId(tmpId);
      }
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
          if (categoryName === "") {
            setInformation("Name cannot be empty");
          } else if (categoryName.length > 20) {
            setInformation("Name too long (max 20 characters)");
          } else {
            setIsChanged(true);
            if (!obj.children) {
              obj.children = [];
            }
            obj.children.push({name: categoryName, children: []});
          }
          return;
        }
        break;
        case dialogTypeEnums.edit:
          if (obj.id === value) {
          if (obj.name === categoryName) {
            setInformation("Names are the same")
          } else if (categoryName === "") {
            setInformation("Name cannot be empty");
          } else if (categoryName.length > 20) {
            setInformation("Name too long (max 20 characters)");
          } else {
            setIsChanged(true);
            obj.name = categoryName;
          }
          return;
        }
        break;
      case dialogTypeEnums.delete:
        setIsChanged(true);
        if (obj.id === value) {
          parent.splice(i, 1);
          return          
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

  const checkIsCompletedTree = () => {
    let categoryList = categoryTree.categoryList
    
    for (let i = 0; i < categoryList.length; i++) {
      let category = categoryList[i]
      if (category.children.length === 0) return false

      for (let j = 0; j < category.children.length; j++) {
        let subCategory = category.children[j]
        if (subCategory.children.length === 0) return false
      }
    }
    return true
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
        buttonText = "Edit"
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

  const renderAddButton = () => {
    const isDisabled = isLoading ? "disabled" : ""
    return <div className={`d-inline btn btn-primary mx-2 ${isDisabled}`}
        onClick={isLoading ? null : () => openDialog({name: "category structure"}, dialogTypeEnums.add)}>
        New category
      </div>
  };

  const handleOnSave = async () => {
    let completed = checkIsCompletedTree();
    setIsSubmiting(true)
    let info = "";
    await (async () => {
      if (completed) { 
        try {
          const res = await post("/categories", categoryTree);
          console.log(res)
          info = res.data
          updateHandler(categoryTree)
        } catch (ex) {
          if (ex.response) {
            info = ex.response.data;
          } else if (ex.request) {
            info = "Server is not responding!";
          } else {
            info = ex.message;
          }
        }
      } else {
        info = "All categories must have third level of nesting!"
      }
    })()
    
    setInformation(info)
    setIsChanged(false);
    setIsSubmiting(false)
  }

  const renderinformationrmation = () => {
    return information !== "" 
    ? <div className="d-flex justify-content-center">
        <div className="alert alert-primary mt-2" style={{maxWidth: 300}}>
          {information}
        </div> 
     </div>
    : null
  }

  const renderSaveButton = () => {
    const isDisabled = isLoading || !isChaged || isSubmiting ? "disabled" : ""
    return <div className={`d-inline btn btn-success mx-2 ${isDisabled}`}
        onClick={isLoading || !isChaged ? null : handleOnSave }>
    {isSubmiting 
    ? <CircularProgress color="inherit" size="24px"/>
    : "Save change"
    }
      </div>
  }

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
        <ul className="list-unstyled d-flex flex-column justify-content-center pl-0 pl-sm-5">
          {
            categoryTree.categoryList.map((cat) => {
              if(!cat.id) {
                  cat.id = highestId+1
                  setHighestId(highestId+1)
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
                      subCat.id = highestId+1
                      setHighestId(highestId+1)
                    } else if(subCat.id > highestId) {
                      setHighestId(subCat.id);
                    }

                    return <MenuItem key={subCat.id}>
                    <SubCatName>{subCat.name}</SubCatName>
                    {renderFullSetOfIcons(subCat)}
                    {
                      
                       // tree must have 3 levels of nesting
                      subCat.children && <ul className="pl-5 py-3 list-unstyled">
                        {subCat.children.map((subSubCat) => 
                        {
                          if(!subSubCat.id) {
                            subSubCat.id = highestId+1
                            setHighestId(highestId+1)
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
        </ul>
      </CategoryTree>
    )
  }

  return <div className="container">
    <Card className="mt-4 mx-auto position-relative">
      {renderDialog()}
      {renderExitButton()}
      {renderTitle()}
      <div className="text-center mb-3">
        {renderSaveButton()}
        {renderAddButton()}
      </div>
      {renderinformationrmation()}
      {isLoading 
        ? <div className= "text-center mt-5"><CircularProgress color="inherit"/></div>
        : renderCategoryTree()}
    </Card>
  </div>
};

export default WarehouseAdminPanel;
