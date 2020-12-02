import React, {useState, useEffect} from "react";
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import Dashboard from "./Dashboard"
import WarehouseAdminPanel from "./AdminPanel";

import {get} from "../../services/httpService"

const Warehouse = () => {
  let { path } = useRouteMatch();
  const [categoryTree, setCategoryTree] = useState({categoryList:[]});
  const [isFetching, setIsFetching] = useState(true);
  const [err, setErr] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get('/categories');
        const data = {
          categoryList: response.data
        }
        setCategoryTree({...data})
        setIsFetching(false)
      } catch (err) {
        setErr(err)
      }
    }
    fetchData()
  }, [err]) // force useEffect again if error occures

  return (
    <Switch>
      <Route
        exact
        path={`${path}/admin`}
        render={() => <WarehouseAdminPanel 
          isFetching={isFetching} 
          categories={categoryTree}
          />}
      />
      <Route
        exact
        path={`${path}`}
        render={() => <Dashboard 
          isFetching={isFetching} 
          categories={categoryTree}
          />}
      />
      <Redirect from="*" to={`${path}`} />
    </Switch>
  );
};

export default Warehouse;
