import React, {useState, useEffect} from "react";
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import Dashboard from "./Dashboard"
import WarehouseAdminPanel from "./AdminPanel";

import {get} from "../../services/httpService"
import ProtectedRoute from './../common/ProtectedRoute';
import ItemInsertPanel from './ItemInsertPanel'

const Warehouse = () => {
  let { path } = useRouteMatch();
  const [categoryTree, setCategoryTree] = useState({categoryList:[]});
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [err, setErr] = useState("")
  

  useEffect(() => {
    async function fetchData() {
      try {
        const categories = await get('/categories');
        const items = await get('/items')

        const catList = {
          categoryList: categories.data,
        }

        setCategoryTree({...catList})
        setItems(items.data)
        setIsFetching(false)
      } catch (err) {
        setErr(err)
      }
    }
    fetchData()
  }, [err]) // force useEffect again if error occures

  const updateCategories = (newCategoryTree) => {
    setCategoryTree(newCategoryTree)
  }

  return (
    <Switch>
      <ProtectedRoute
        exact
        path={`${path}/add`}
        redirect={`${path}`}
        privilegedRoles={["admin", "moderator"]}
        render={() => {
          return <ItemInsertPanel 
            isFetching={isFetching} 
            categories={categoryTree}
          />
        }}
      />
      <ProtectedRoute
        exact
        path={`${path}/admin`}
        redirect={`${path}`}
        privilegedRoles={["admin"]}
        render={() => {
          return <WarehouseAdminPanel 
            isFetching={isFetching} 
            categories={categoryTree}
            updateHandler={updateCategories}
          />
        }}
      />
      <Route
        exact
        path={`${path}`}
        render={() => <Dashboard 
          isFetching={isFetching} 
          categories={categoryTree}
          items={items}
          />}
      />
      <Redirect from="*" to={`${path}`} />
    </Switch>
  );
};

export default Warehouse;
