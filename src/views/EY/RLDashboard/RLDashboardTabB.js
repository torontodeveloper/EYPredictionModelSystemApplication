import React from 'react';
import img1 from './../../../assets/img/brand/forceplot_0.png';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Type } from 'react-bootstrap-table2-editor';
const products = [ 
    {  'installment':543.23, 'fico': 689,'ownership':'MORTGAGE','income':110000,'loanAmount':5600,'loanPurpose':'debt_consolidation','terms':'36 months','balance':213701,'details':'Trade stocks listed on major North American exchanges, as well as stocks sold over-the-counter in Canada and the U.S.'},
    {  'installment':543.23, 'fico': 689,'ownership':'MORTGAGE','income':120000,'loanAmount':7600,'loanPurpose':'car','terms':'36 months','balance':213701,'details':'Trade stocks listed on major North American exchanges, as well as stocks sold over-the-counter in Canada and the U.S.'},
    {  'installment':543.23, 'fico': 689,'ownership':'MORTGAGE','income':100000,'loanAmount':5600,'loanPurpose':'debt_consolidation','terms':'36 months','balance':213701,'details':'Trade stocks listed on major North American exchanges, as well as stocks sold over-the-counter in Canada and the U.S.'},
    {  'installment':543.23, 'fico': 689,'ownership':'MORTGAGE','income':90000,'loanAmount':4600,'loanPurpose':'debt_consolidation','terms':'36 months','balance':213701,'details':'Trade stocks listed on major North American exchanges, as well as stocks sold over-the-counter in Canada and the U.S.'},
    {  'installment':543.23, 'fico': 689,'ownership':'MORTGAGE','income':103000,'loanAmount':6500,'loanPurpose':'credit_card','terms':'36 months','balance':213701,'details':'Trade stocks listed on major North American exchanges, as well as stocks sold over-the-counter in Canada and the U.S.'},
    {'installment':160.4, 'fico': 679,'ownership':'MORTGAGE','income':115000,'loanAmount':8300,'loanPurpose':'debt consolidation','terms':'36 months','balance':213701,'details':'Whether you are new to options trading² or youre an experienced options trader, you will find a unique combination of pricing, services and resources to help make the most of your options trading experience'},
    {'installment':469.63, 'fico': 689,'ownership':'MORTGAGE','income':140000,'loanAmount':5800,'loanPurpose':'car','terms':'36 months','balance':213701,'details':'Your source to evaluate, compare, learn and invest in over 3,200 mutual funds from leading mutual fund companies including AGF, Invesco Trimark, CI, Fidelity, Mackenzie and more.'},
    {'installment':367.19, 'fico': 694,'ownership':'MORTGAGE','income':1250000,'loanAmount':6400,'loanPurpose':'credit_card','terms':'36 months','balance':213701,'details':'We offer a large inventory of fixed income products.'},
    {'installment':357.05, 'fico': 699,'ownership':'MORTGAGE','income':950000,'loanAmount':9800,'loanPurpose':'car','terms':'36 months','balance':213701,'details':'Our New Issues and IPOs Desk can keep you informed about an array of equities, fixed income, preferred shares, and income trust products in various industry sectors as they are brought to market.'},
    {'installment':418.72, 'fico': 673,'ownership':'MORTGAGE','income':115000,'loanAmount':6800,'loanPurpose':'debt consolidation','terms':'36 months','balance':213701,'details':'Gold and silver certificates are available for purchase both inside and outside your RSP.'}
]
  
const columns = [{
  dataField: 'installment',
  text: 'Installment'
}, {
  dataField: 'fico',
  text: 'Fico'
}, {
  dataField: 'ownership',
  text: 'Home Ownership Status'
},
{
    dataField: 'income',
    text: 'Annual Income'
  },
  {
    dataField: 'loanAmount',
    text: 'Loan Amount'
  },
  {
    dataField: 'loanPurpose',
    text: 'Loan Purpose'
  },
  {
    dataField: 'terms',
    text: 'Loan Terms'
  },
  {
    dataField: 'balance',
    text: 'Total Current Balance'
  },
  {
    dataField: 'anamoly',
    text: 'Anamoly',
    editor: {
      type: Type.SELECT,
      options: [{
        value: 'true',
        label: 'True '
      },
      {
        value: 'false',
        label: 'False'
      }]
    }
  }
];
const imgStyle={
    height:'40vmin'
}
const cardStyle={
    height:'5vh',
    textAlign:'left',
    backgroundColor:'#E8E6E6'
}
class RLDashboardTabB extends React.Component{
    
    render(){
        return(
            <div>
                <h1>Model Explanation</h1>
                <img src={img1} style={imgStyle} alt="force plot0"/>
            <div className="card">
                <div className="card-body" style={cardStyle}>
                <h4 className="card-title">Nearest Neighbours</h4>
                </div>
            </div>
    <BootstrapTable keyField='id' data={ products } columns={ columns } cellEdit={ cellEditFactory({ mode: 'click' }) } />
                
            </div>
        ) 
    }
  }

export default RLDashboardTabB;