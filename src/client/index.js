'use strict';

import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import {Provider} from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './stores/index';
import "./stylesheets/main.scss";

import Login from './views/login';
import HomePageWrapper from './views/homePageWrapper';
import ProductSearch from './views/productSearchWrapper';
import ProductsCheckout from './views/productsCheckout';
import CustomerInfo from './views/customerDetails';
import CustomerOrdersWrapper from './views/customerOrdersWrapper';
import StocksOrdersWrapper from './views/StocksOrdersWrapper';
import StocksCheckoutWrapper from './views/StocksCheckoutWrapper';

const history = syncHistoryWithStore(browserHistory, store);

class App extends React.Component {
  render () {
   
    return (
       <div>
        {this.props.children}
      </div>
    );
  }
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Login}/>
        <Route path='/dashboard' component={HomePageWrapper} />
        <Route path='/purchase' component={ProductSearch} />
        <Route path='/checkout' component={ProductsCheckout} />
        <Route path='/customer' component={CustomerInfo} />
        <Route path='/orders/:id' component={CustomerOrdersWrapper} />
        <Route path='/orderupdate' component={StocksOrdersWrapper} />
        <Route path='/stockcheckout' component={StocksCheckoutWrapper} />
      </Route>
    </Router>
  </Provider>, document.getElementById('app'));