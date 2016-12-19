/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import * as actions from '../actions/index';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Dashboard extends React.Component {
  constructor () {
    super();
    this.state = {
      links: ''
    };
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
    this.customerNameFormatter = (cell, row) => this._customerNameFormatter (cell, row);
    this.dateFormatter = (cell, row) => this._dateFormatter (cell, row);
  }

  _customerNameFormatter (cell, row) {
    return (<Link to={`/orders/${row.customerId}`} > {row.name.capitalize()} </Link>);
  }

  _dateFormatter (cell, row) {
    return moment(row.createdOn).format('DD MMM YYYY, hh:mm a');
  }

render () {
    let moqList = this.props.moqList.length > 0 ? this.props.moqList : [],
        customersList = this.props.customersList.length > 0 ? this.props.customersList : [];
    return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
              <div>
                <a className="navbar-brand" href="/orderupdate">Update Stock</a>
              </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
              <BootstrapTable data={ moqList } height='500px'>
                <TableHeaderColumn isKey
                                   width='150' 
                                   dataField='Product_Name' 
                                   filter={ { type: 'TextFilter', delay: 500 } } >
                  Product Name
                </TableHeaderColumn>
                <TableHeaderColumn width='150' dataField='Quantity'>Unit</TableHeaderColumn>
                <TableHeaderColumn width='150'
                                  dataField='Availability'
                                  filter={ {  type: 'NumberFilter', delay: 100, numberComparators: [ '=', '>', '<=' ] } } >
                  Availability
                </TableHeaderColumn>
              </BootstrapTable>
          </div>
          <div className="col-md-2">
          </div>
          <div className="col-md-6">
              <BootstrapTable data={ customersList } height='500px'>
                <TableHeaderColumn dataField='name' isKey dataFormat={ this.customerNameFormatter } filter={ { type: 'TextFilter', delay: 0 } }>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='createdOn' dataFormat={ this.dateFormatter }>Purchase Date</TableHeaderColumn>
                <TableHeaderColumn dataField='totalAmount' 
                                  filter={ {  type: 'NumberFilter', delay: 100, numberComparators: [ '=', '>', '<=' ] } } >
                  Purchase Amount
                </TableHeaderColumn>
              </BootstrapTable>
          </div>
        </div>
        </div>
    );
  }
}

function select (state) {
  console.log(state);
  return {
    moqList: state.moqList,
    customersList: state.customersList
  };
}

export default connect(select)(Dashboard);

