import React, { useState, useEffect } from "react";

import { CircularProgress } from "@material-ui/core";
import {MenuItem, Menu, SidebarCategories, CatName, SubCatName, SubSubCatName} from "../../styleComponents"

const data = {
  categoryList: [
    {
        "id": 8,
        "name": "Silniki",
        "children": [
            {
                "id": 19,
                "name": "Prądu Stałego",
                "children": [
                    {
                        "id": 8,
                        "name": "BLDC"
                    }
                ]
            },
            {
                "id": 20,
                "name": "Prądu zmiennego",
                "children": [
                    {
                        "id": 9,
                        "name": "Trójfazowe"
                    },
                    {
                        "id": 15,
                        "name": "Asynchroniczne"
                    }
                ]
            }
        ]
    },
    {
        "id": 9,
        "name": "Przewody",
        "children": [
            {
                "id": 21,
                "name": "Pneumatyczne",
                "children": [
                    {
                        "id": 10,
                        "name": "BAA"
                    }
                ]
            },
            {
                "id": 22,
                "name": "Elektryczne",
                "children": [
                    {
                        "id": 11,
                        "name": "BBA"
                    }
                ]
            }
        ]
    },
    {
        "id": 10,
        "name": "Pneumatyka",
        "children": [
            {
                "id": 23,
                "name": "Siłowniki",
                "children": [
                    {
                        "id": 12,
                        "name": "Liniowe"
                    },
                    {
                        "id": 123,
                        "name": "Nieliniowe"
                    },
                    {
                        "id": 321,
                        "name": "Asynchroniczne"
                    }
                ]
            },
            {
                "id": 24,
                "name": "Kompresor",
                "children": [
                    {
                        "id": 13,
                        "name": "Olejowy"
                    }
                ]
            },
            {
                "id": 25,
                "name": "Elementy",
                "children": [
                    {
                        "id": 14,
                        "name": "Złączki"
                    }
                ]
            }
        ]
    }
]
}

const Categories = ({isFetching, categories}) => {

  const handleSelect = (name) => {
    console.log(name)
  }

  return (
    <SidebarCategories className="border-top border-bottom border-secondary rounded my-3 d-block">
      <h6 className="text-secondary text-center mx-auto">Categories</h6>
      {categories.categoryList.length == 0 
      ? <div className= "text-center my-3"><CircularProgress style={{color: "#dddddd"}} size={25}/></div>
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
      </Menu>}
    </SidebarCategories>
  );
};

export default Categories;
