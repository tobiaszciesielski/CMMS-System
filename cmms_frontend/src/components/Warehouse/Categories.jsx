import React, { useState, useEffect } from "react";

import {Categories as Cats, MenuItem, Menu, SubCategories, SubSubCategory, SidebarCategories, CatName, SubCatName, SubSubCatName} from "../../styleComponents"

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
    setCategoryTree(data);
  }, [isFetching]);


  const handleSelect = (name) => {
    console.log(name)
  }

  return (
    <div className="border-top border-bottom border-secondary rounded my-3 pb-2 d-block">
      <h6 className="text-secondary text-center mx-auto">Categories</h6>
      {data.categoryList.length && <Menu className="pl-0 pl-xl-2">
        {data.categoryList.map((cat) => <li className="pl-0 pl-lg-1">
          <CatName onClick={handleSelect(cat)}>{cat.name}</CatName>
          {
            cat.children && <Menu className="pl-4">
              {cat.children.map((subCat) => <MenuItem>
                <SubCatName onClick={handleSelect(subCat)}>{subCat.name}</SubCatName>
                {
                  subCat.children && <Menu className="pl-4">
                    {subCat.children.map((subSubCat) => <MenuItem className="pt-1">
                        <SubSubCatName onClick={handleSelect(subSubCat)}>{subSubCat.name}</SubSubCatName>
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
    </div>
  );
};

export default Categories;

// /*%/* BORDERS AND BULLETS */

// p {
//   /*CSS reset*/
//   margin-bottom: 0;
// }

// ul.experiences li {
//   position: relative;
//   /* so that pseudoelements are positioned relatively to their "li"s*/
//   /* use padding-bottom instead of margin-bottom.*/
//   margin-bottom: 0;
//   /* This overrides previously specified margin-bottom */
//   padding-bottom: 2.5em;
// }

// ul.experiences li:after {
//   /* bullets */
//   content: url('http://upload.wikimedia.org/wikipedia/commons/thumb/3/30/RedDisc.svg/20px-RedDisc.svg.png');
//   position: absolute;
//   left: -26px;
//   /*adjust manually*/
//   top: 0px;
// }

// ul.experiences li:before {
//   /* lines */
//   content: "";
//   position: absolute;
//   left: -16px;
//   /* adjust manually */
//   border-left: 1px solid black;
//   height: 100%;
//   width: 1px;
// }

// ul.experiences li:first-child:before {
//   /* first li's line */
//   top: 6px;
//   /* moves the line down so that it disappears under the bullet. Adjust manually */
// }

// ul.experiences li:last-child:before {
//   /* last li's line */
//   height: 6px;
//   /* shorten the line so it goes only up to the bullet. Is equal to first-child:before's top */
// }