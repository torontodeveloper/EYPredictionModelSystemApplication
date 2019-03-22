import React, { Component,Fragment} from 'react';
import {renderChart, displayBoxData} from './boxplot'
import {destroyChart} from './removeplot'
import {randomNormal,randomLogNormal} from 'd3-random';
import {scaleLinear} from 'd3-scale';
import {min,range,max} from 'd3-array';
import {format} from 'd3-format';
import {select,selectAll} from 'd3-selection';
import {precisionRound} from 'd3-format';
import {symbolSquare,symbol} from 'd3-shape';
import {axis,axisBottom,axisRight,axisTop,axisLeft} from 'd3-axis';
import {box} from './boxplot';

class Barchart  extends Component {
   constructor(props){
      super(props)
      this.state={
           data : {
            //"": [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100,  ],
            "":[25, 28, 29, 29, 30, 34, 35, 35, 37, 38]
         }
      }
      this.displayHandler=this.displayHandler.bind(this)
   }
  render () {
   return <React.Fragment>
      <div ref={(el) => this.$wrapper = el}/>
    </React.Fragment>

  }
  displayHandler(){
     return(
        <div>
        <span>Minimum: 10</span><br />
        <span>Lower quartile: 20</span><br />
        <span>Median: 15</span><br />
        <span>Upper quartile: 30</span><br />
        <span>Maximum: 50</span><br />
        </div>
     )
    }

  componentDidMount(){
  renderChart(this.$wrapper, this.state.data)

   //initChart(this.$wrapper, this.state.data)
  }
  componentDidUpdate () {
   renderChart(this.$wrapper, this.state.data)
  this.displayHandler(this.$wrapper);
  }
  
  componentWillUnmount () {
   destroyChart(this.$wrapper)
  }
}
export default Barchart;