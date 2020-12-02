import React, { useState, useEffect } from "react";

import {Categories as Cats, SubCategories, SubSubCategory, SidebarCategories, CatName, SubCatName, SubSubCatName} from "../../styleComponents"

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
  const [categoryTree, setCategoryTree] = useState(categories);

  useEffect(() => {
    setCategoryTree(categories);
  }, [isFetching]);


  const handleSelect = (name) => {
    console.log(name)
  }

  return (
    <div className="border-top border-bottom border-secondary rounded my-3 pb-2 d-block">
      <h6 className="text-secondary text-center mx-auto">Categories</h6>
      <SidebarCategories>
        {(!isFetching && !categoryTree.categoryList.lenght) 
          && categoryTree.categoryList.map((category) => {
          return <Cats key={category.id} >
          <CatName onClick={() => handleSelect(category)} className="pointer">
            {category.name}
          </CatName>
            {category.children 
              ? category.children.map((subCat) => {
                return <SubCategories key={subCat.id} className="my-2 sub-category"> 
                    <SubCatName onClick={() => handleSelect(subCat)} className="pointer">
                      {subCat.name}
                    </SubCatName>
                    {subCat.children 
                      ? subCat.children.map((subSubCat) => {
                        return <SubSubCategory key={subSubCat.id} className="h6 mt-3 sub-sub-category">
                          <SubSubCatName onClick={() => handleSelect(subSubCat)} className="pointer">
                            {subSubCat.name}
                          </SubSubCatName> 
                            </SubSubCategory>
                          })
                      : null}
                    </SubCategories>
                  })
              : null}
          </Cats>
        })}
      </SidebarCategories>
    </div>
  );
};

export default Categories;
