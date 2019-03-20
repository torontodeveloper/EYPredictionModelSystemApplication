import React from 'react';
class RLDashboardTabA extends React.Component {
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
            </div>
        )
    }
}

export default RLDashboardTabA;