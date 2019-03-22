import React from 'react';
import BarChart from './Barchart';
import BarChart1 from './NewBarchart';

class RLDashboardTabA extends React.Component {
    constructor(props){
        super(props);
    }
  
    render() {
        return (
            <div>
                <h1>Model Overview</h1>
                
                <div className="container card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm card-title">
                            Controls
                         </div>
                        <div className="col-sm">
                            Theme Selection
                         </div>
                        <div className="col-sm">
                     </div>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            Detection
                         </div>
                        <div classNme="col-sm">
                            Dropdown
                         </div>
                        <div className="col-sm">
                            Remediation
                        </div>
                    </div>
                    
                </div>
                <div className="container card">
                <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4 card" style={{marginTop:'100px',height:'20vh'}}>
                <span className="cui-cloud" style={{margin:'0px -20px 0px 350px'}} aria-hidden="true"></span>
                        <p>26%</p>
                        <br></br>
                        <p style={{marginTop:'-40px',width:'30vw'}}>ERROR PROBABILITY</p>
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" style={{width:'25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                </div>
                <div className="col-sm-8 col-md-8 col-lg-8 card">
                <h4>Confidence Interval</h4>
                <BarChart data={[5,10,1,3]} size={[500,500]} />
                </div>
                </div>
                    
                </div>
            </div>
        )
    }
}

export default RLDashboardTabA;