import React from "react";

import { CircularProgress } from "@material-ui/core";
import {MenuItem, Menu, SidebarCategories, CatName, SubCatName, SubSubCatName} from "../../styleComponents"

const Categories = ({ categories, isFetching }) => {

  const handleSelect = (name) => {
    // TODO - filter items
    console.log(name)
  }

  return (
    <SidebarCategories className="border-top border-bottom border-secondary rounded my-3 d-block">
      <h6 className="text-secondary text-center mx-auto">Categories</h6>
      {
        isFetching ? <div style={{textAlign: "center", padding: "10px 0 10px 0"}}><CircularProgress style={{color: "#dddddd"}} size={25}/></div> : (

        categories.categoryList.length === 0 
        ? <div className= "text-center my-3">No category found.</div>
        : <Menu className="pl-0 pl-xl-2">
          {categories.categoryList.map((cat) => <li key={cat.id} className="pl-0 pl-lg-1">
            <CatName className="pointer" onClick={() => handleSelect(cat)}>{cat.name}</CatName>
            {
              cat.children && <Menu className="pl-4">
                {cat.children.map((subCat) => <MenuItem key={subCat.id}>
                  <SubCatName className="pointer" onClick={() => handleSelect(subCat)}>
                    {subCat.name}
                  </SubCatName>
                  {
                    subCat.children && <Menu className="pl-4">
                      {subCat.children.map((subSubCat) => <MenuItem key={subSubCat.id} className="pt-1">
                          <SubSubCatName className="pointer" onClick={() => handleSelect(subSubCat)}>
                            {subSubCat.name}
                          </SubSubCatName>
                        </MenuItem>  
                      )}
                    </Menu> 
                  }
                  </MenuItem>  
                )}
              </Menu> 
            }
          </li>)}
        </Menu>
        )
      }
    </SidebarCategories>
  );
};

export default Categories;
