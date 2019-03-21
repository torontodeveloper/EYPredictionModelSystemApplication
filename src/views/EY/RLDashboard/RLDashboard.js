import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import RLDashboardTabA from './RLDashboardTabA';
import RLDashboardTabB from './RLDashboardTabB';
//import 'react-table/react-table.css';


const products = [
  {  'id':1, 'name': '1','price':'73','status':'unresolved','details':'Trade stocks listed on major North American exchanges, as well as stocks sold over-the-counter in Canada and the U.S.'},
  {'id':2, 'name': '2','price':'42','status':'unresolved','details':'Whether you are new to options trading² or youre an experienced options trader, you will find a unique combination of pricing, services and resources to help make the most of your options trading experience'},
  {'id':3, 'name': '1','price':'23','status':'unresolved','details':'Your source to evaluate, compare, learn and invest in over 3,200 mutual funds from leading mutual fund companies including AGF, Invesco Trimark, CI, Fidelity, Mackenzie and more.'},
  {'id':4, 'name': '3','price':'33','status':'unresolved','details':'We offer a large inventory of fixed income products.'},
  {'id':5, 'name': '1','price':'53','status':'unresolved','details':'Our New Issues and IPOs Desk can keep you informed about an array of equities, fixed income, preferred shares, and income trust products in various industry sectors as they are brought to market.'},
  {'id':6, 'name': '1','price':'68','status':'unresolved','details':'Gold and silver certificates are available for purchase both inside and outside your RSP.'}]

const columns = [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'name',
  text: 'Priority'
}, {
  dataField: 'price',
  text: 'Materiality'
},
{
  dataField: 'status',
  text:'Issue Status'
}
];

const productDetails=[
  {  'id':1, 'name': 'Canadian and U.S Equities','details':'Trade stocks listed on major North American exchanges, as well as stocks sold over-the-counter in Canada and the U.S.'},
  {'id':2, 'name': 'Canadian and U.S Options','details':'Whether you are new to options trading² or youre an experienced options trader, you will find a unique combination of pricing, services and resources to help make the most of your options trading experience'},
  {'id':3, 'name': 'Mutual Funds','details':'Your source to evaluate, compare, learn and invest in over 3,200 mutual funds from leading mutual fund companies including AGF, Invesco Trimark, CI, Fidelity, Mackenzie and more.'},
  {'id':4, 'name': 'Fixed Income Securities','details':'We offer a large inventory of fixed income products.'},
  {'id':5, 'name': 'New Issues and Initial Public Offering (IPO)','details':'Our New Issues and IPOs Desk can keep you informed about an array of equities, fixed income, preferred shares, and income trust products in various industry sectors as they are brought to market.'},
  {'id':6, 'name': 'Precious Metals','details':'Gold and silver certificates are available for purchase both inside and outside your RSP.'}]



// const expandRowTabA = {
//   renderer: row => (
//     <div>
//       <p>{`Details of ${row.name}`}</p>
//       {/* <button type="button" class="btn btn-primary" onClick={tabAClickHandler}>Model Overview</button><button type="button" class="btn btn-primary">Model Explanation</button> */}
//       <p>Details ****</p>
//     </div>
//   ),
//   showExpandColumn: true,
//   nonExpandable: [1, 3]
// };
const buttonStyle={
  color:'yellow'
}
const updateStyle={
  backgroundColor:'green'
}
const expandRowTab = {
  renderer: row => (
    <div>
      <p>{`Details of ${row.name}`}
      </p>
      <Router>
      <ul className="nav">
      <button type="button" style={updateStyle} className="btn btn-primary"><li className="nav-item">Update</li></button>
        
        <button type="button" className="btn btn-primary"><li className="nav-item">
          <Link style={buttonStyle} className="nav-link active" to="/ey/rldashboard/TabA">Overview</Link>
        </li> </button>
        <button type="button" className="btn btn-primary"><li className="nav-item">
          <Link style={buttonStyle} className="nav-link active" to="/ey/rldashboard/TabB">Model Explanation</Link>
        </li> </button>
      </ul>
        <Route path="/ey/rldashboard/TabA" component={RLDashboardTabA}/>
        <Route path="/ey/rldashboard/TabB" component={RLDashboardTabB}/>
      </Router>
    </div>
  ),
  showExpandColumn: true,
  nonExpandable: [1, 3]
};

function tabClickHandler(data){
  console.log("**** Tab A")
  this.props.history.push('/ey/rldashboard/TabA')
}

function tabBClickHandler(data){
  console.log("**** Tab B")
  this.props.history.push('/ey/rldashboard/TabB')
}


class RLDashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      routerStatus:'TabA'
    }
  }
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="icon-drop"></i> Reinforcement Learning DQ Dashboard
          </div>


          <div className='card-body'>

<BootstrapTable
  //hover 
  headerClasses ="thead-light"
  bordered={ true } 
  keyField='id'
  data={ products }
  columns={ columns }
  expandRow={expandRowTab }
/>


          </div>
         
        
        </div>
      </div>
    );
  }
}

export default RLDashboard;
