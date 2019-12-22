import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'typeface-roboto';
import { Route, Switch } from "react-router-dom";
import Products from './components/products/productsLanding';
import SpecificProduct from './components/products/viewCreateEditProduct';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Products} />
        <Route exact path='/:id' component={SpecificProduct} />
        <Route exact path='/create' component={SpecificProduct} />
      </Switch>
    </div>
  );
}

export default App;
