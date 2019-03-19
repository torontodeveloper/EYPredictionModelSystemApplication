import React, { Component } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import 'react-table/react-table.css';


const products = [
  {  'id':1, 'name': 'Canadian and U.S Equities','details':'Trade stocks listed on major North American exchanges, as well as stocks sold over-the-counter in Canada and the U.S.'},
  {'id':2, 'name': 'Canadian and U.S Options','details':'Whether you are new to options trading² or youre an experienced options trader, you will find a unique combination of pricing, services and resources to help make the most of your options trading experience'},
  {'id':3, 'name': 'Mutual Funds','details':'Your source to evaluate, compare, learn and invest in over 3,200 mutual funds from leading mutual fund companies including AGF, Invesco Trimark, CI, Fidelity, Mackenzie and more.'},
  {'id':4, 'name': 'Fixed Income Securities','details':'We offer a large inventory of fixed income products.'},
  {'id':5, 'name': 'New Issues and Initial Public Offering (IPO)','details':'Our New Issues and IPOs Desk can keep you informed about an array of equities, fixed income, preferred shares, and income trust products in various industry sectors as they are brought to market.'},
  {'id':6, 'name': 'Precious Metals','details':'Gold and silver certificates are available for purchase both inside and outside your RSP.'}]

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

const productDetails=[
  {  'id':1, 'name': 'Canadian and U.S Equities','details':'Trade stocks listed on major North American exchanges, as well as stocks sold over-the-counter in Canada and the U.S.'},
  {'id':2, 'name': 'Canadian and U.S Options','details':'Whether you are new to options trading² or youre an experienced options trader, you will find a unique combination of pricing, services and resources to help make the most of your options trading experience'},
  {'id':3, 'name': 'Mutual Funds','details':'Your source to evaluate, compare, learn and invest in over 3,200 mutual funds from leading mutual fund companies including AGF, Invesco Trimark, CI, Fidelity, Mackenzie and more.'},
  {'id':4, 'name': 'Fixed Income Securities','details':'We offer a large inventory of fixed income products.'},
  {'id':5, 'name': 'New Issues and Initial Public Offering (IPO)','details':'Our New Issues and IPOs Desk can keep you informed about an array of equities, fixed income, preferred shares, and income trust products in various industry sectors as they are brought to market.'},
  {'id':6, 'name': 'Precious Metals','details':'Gold and silver certificates are available for purchase both inside and outside your RSP.'}]

const expandRow = {
  renderer: row => (
    <div>
      <p>{`Details of ${row.name}`}</p>
      <p>{`Details of ${row.details}`}</p>
    </div>
  ),
  showExpandColumn: true,
  nonExpandable: [1, 3]
};



class RLDashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-drop"></i> Reinforcement Learning DQ Dashboard
          </div>


          <div className='card-body'>

<BootstrapTable
  hover 
  headerClasses ="thead-light"
  bordered={ true } 
  keyField='id'
  data={ products }
  columns={ columns }
  expandRow={ expandRow }
/>


          </div>
         
        
        </div>
      </div>
    );
  }
}

export default RLDashboard;
