import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'typeface-roboto';
import { Route, Switch } from "react-router-dom";
import Products from './components/products/productsLanding';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Products} />
      </Switch>
    </div>
  );
}

export default App;
