import * as d3 from "d3";

export function renderChart (wrapper, curData) {
    if (!wrapper) {
      return
    }
    const {
      select: d3Select, scaleBand: d3ScaleBand,
      scaleLinear: d3ScaleLinear,
      quantile: d3Quantile, ascending: d3Ascending,
      min: d3Min, max: d3Max, map: d3Map,
      axisBottom: d3AxisBottom, axisLeft: d3AxisLeft,
      transition: d3Transition,
    } = d3
    function boxQuartiles(d) {
      return {
        q_25: d3Quantile(d, .25),
        q_50: d3Quantile(d, .5),
        q_75: d3Quantile(d, .75),
      }
    }
    const dataKeys = Object.keys(curData)
    // dataKeys.forEach(key => {
    //   curData[key] = curData[key].sort(d3Ascending)
    // })
    const dataEntries = Object.entries(curData)
    const dataValues = dataEntries.reduce((memo, item) => {
      return memo.concat(item[1])
    }, [])
    const margin = { top: 50, right: 0, bottom: 50, left: 30 }
    const width = 600 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom
    const gridSize = Math.floor(width / dataKeys.length)
    const barWidth = gridSize / 2
    const boxElementStroke = '#82cef5'
    const boxElementStrokeWidth = '2'
    // Prepare the data for the box plots
    let boxPlotData = [];
    for (const [key, values] of dataEntries) { // http://bl.ocks.org/jensgrubert/7789216
        console.log("key and vales",key,values)
      let record = {}
      record["key"] = key
      record["counts"] = values
      record['quartiles'] = boxQuartiles(values)
      const q1 = record.quartiles.q_25
      const q3 = record.quartiles.q_75
      const iqr = (q3 - q1) * 1.5
      const irq1 = q1 - iqr
      const irq3 = q3 + iqr
      let outliers = []
      let normalValues = []
      for (const value of Array.from(values)) {
          console.log("value is",value)
        if (value < irq1) {
          outliers.push(value)
        } else if (value > irq3) {
          outliers.push(value)
        } else {
          normalValues.push(value)
        }
      }
      console.log("outliers is",outliers)
      record['outliers'] = outliers
      const minNormalValue = d3Min(normalValues)
      const maxNormalValue = d3Max(normalValues)
      record['whiskers'] = {
        min: minNormalValue ? minNormalValue : d3Min([record.quartiles.q_25, record.quartiles.q_50, record.quartiles.q_75]),
        max: maxNormalValue ? maxNormalValue : d3Max([record.quartiles.q_25, record.quartiles.q_50, record.quartiles.q_75]),
      }
      console.log("whiskers is",record['whiskers'].min,record['whiskers'].max)
      record["color"] = 'grey'
      boxPlotData.push(record)
    }
    // Setup the svg and group we will draw the box plot in
    const svgData = d3Select(wrapper).selectAll('svg').data(['dummy data'])
    const svgEnter = svgData.enter().append('svg')
    svgEnter.attr("width", width + margin.left + margin.right)
    svgEnter.attr("height", height + margin.top + margin.bottom)
    svgEnter.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr('class', 'box-plot')
    const svgMerge = svgData.merge(svgEnter)
    const gMerge = svgMerge.selectAll('g.box-plot')
    // Compute an ordinal xScale for the keys in boxPlotData
    const xScale = d3ScaleBand()
      .domain(dataKeys)
      .rangeRound([0, dataKeys.length * gridSize])
    const xAxis = d3AxisBottom(xScale)
    const t = d3Transition().duration(1000)
    const horAxisData = gMerge.selectAll('.x').data(['dummy data'])
    const horAxisEnter = horAxisData.enter().append("g").attr("class", "x axis")
    const horAxis = horAxisData.merge(horAxisEnter)
    horAxis
      .attr('transform', `translate(0, ${height})`)
      .transition(t).call(xAxis)
    // Compute a global y scale based on the global counts
    const min = d3Min(dataValues)
    const max = d3Max(dataValues)
    const yScale = d3ScaleLinear()
      .domain([max, min])
      .range([0, height])
    const yAxis = d3AxisLeft(yScale)
      .tickSizeInner(-dataKeys.length * gridSize)
      .tickSizeOuter(0)
    const leftAxisData = gMerge.selectAll('.y').data(['dummy data'])
    const leftAxisEnter = leftAxisData.enter().append("g")
      .attr("class", "y axis")
    const leftAxis = leftAxisData.merge(leftAxisEnter).transition(t).call(yAxis)
    leftAxis.selectAll('.tick').attr("stroke", "#777").attr("stroke-dasharray", "2,2")
    const tooltipData = d3Select(wrapper)
      .selectAll('div').data(['dummy data'])
    const tooltipEnter = tooltipData.enter()
      .append('div')
      .attr('class', 'tooltip')
      .style('background', '#ffffff')
      .style('color', '#000000')
      .style('display', 'none')
      .style('top', 0)
      .style('left', 0)
      .style('padding', '10px')
      .style('position', 'absolute')
    const tooltipMerge = tooltipData.merge(tooltipEnter)
    const boxElementData = gMerge.selectAll('.box-element').data(boxPlotData)
    boxElementData.exit().remove()
    const boxElementEnter = boxElementData.enter().append('g')
      .attr('class', 'box-element')
    const boxElementMerge = boxElementData.merge(boxElementEnter)
    boxElementMerge.on('mouseover', (d) => {
      tooltipMerge
        .html(`<div>
<span>Minimum: ${d.whiskers.min}</span><br />
<span>Lower quartile: ${d.quartiles.q_25}</span><br />
<span>Median: ${d.quartiles.q_50}</span><br />
<span>Upper quartile: ${d.quartiles.q_75}</span><br />
<span>Maximum: ${d.whiskers.max}</span><br />
${d.outliers.map(ov => `<span>Outlier: ${ov}</span>`).join('<br />')}
</div>`)
        .style('box-shadow', `0 0 5px #82cef5`)
        .style('border', `1px solid #82cef5`)
        .style('display', 'block')
    })
      .on('mousemove', () => {
        tooltipMerge
          .style('top', (d3.event.layerY + 10) + 'px') // always 10px below the cursor
          .style('left', (d3.event.layerX + 10) + 'px'); // always 10px to the right of the mouse
      })
      .on('mouseout', () => {
        tooltipMerge
          .style('display', 'none')
      })
    // horizontal line
    boxElementEnter.append("line")
      .attr("stroke", boxElementStroke)
      .attr("stroke-width", boxElementStrokeWidth)
      .attr('stroke-dasharray', '3, 3')
      .attr("fill", "none")
      .attr('class', 'vertical-line')
      .attr("x1", (d) => xScale(d.key) + gridSize/2)
      .attr("x2", (d) => xScale(d.key) + gridSize/2)
    boxElementMerge.select('.vertical-line').transition(t)
      .attr("y1", (d) => yScale(d.whiskers.min))
      .attr("y2", (d) => yScale(d.whiskers.max))
    const xCor = gridSize / 2 - barWidth / 2
    // rect
    boxElementEnter.append("rect")
      .attr("width", barWidth)
      .attr("fill", (d) => d.color)
      .attr("stroke", boxElementStroke)
      .attr("stroke-width", boxElementStrokeWidth)
      .attr('class', 'box-quartiles')
      .attr("x", (d) => xScale(d.key) + xCor)
    boxElementMerge.select('.box-quartiles').transition(t)
      .attr("height", (d) => Math.abs(yScale(d.quartiles.q_75) - yScale(d.quartiles.q_25)))
      .attr("y", (d) => yScale(Math.max(d.quartiles.q_75, d.quartiles.q_25)))
    // Top whisker
    boxElementEnter.append("line")
      .attr("stroke", boxElementStroke)
      .attr("stroke-width", boxElementStrokeWidth)
      .attr("fill", "none")
      .attr('class', 'top-whisker')
      .attr("x1", (d) => xScale(d.key) + xCor + barWidth/4)
      .attr("x2", (d) => xScale(d.key) + xCor + barWidth - barWidth/4)
    boxElementMerge.select('.top-whisker').transition(t)
      .attr("y1", (d) => yScale(d.whiskers.min))
      .attr("y2", (d) => yScale(d.whiskers.min))
    // Median line
    boxElementEnter.append("line")
      .attr("stroke", boxElementStroke)
      .attr("stroke-width", boxElementStrokeWidth)
      .attr("fill", "none")
      .attr('class', 'median')
      .attr("x1", (d) => xScale(d.key) + xCor)
      .attr("x2", (d) => xScale(d.key) + xCor + barWidth)
    boxElementMerge.select('.median').transition(t)
      .attr("y1", (d) => yScale(d.quartiles.q_50))
      .attr("y2", (d) => yScale(d.quartiles.q_50))
    // Bottom whisker
    boxElementEnter.append("line")
      .attr("stroke", boxElementStroke)
      .attr("stroke-width", boxElementStrokeWidth)
      .attr("fill", "none")
      .attr('class', 'bottom-whisker')
      .attr("x1", (d) => xScale(d.key) + xCor + barWidth/4)
      .attr("x2", (d) => xScale(d.key) + xCor + barWidth - barWidth/4)
    boxElementMerge.select('.bottom-whisker').transition(t)
      .attr("y1", (d) => yScale(d.whiskers.max))
      .attr("y2", (d) => yScale(d.whiskers.max))
    const circleData = boxElementMerge.selectAll("circle.outlier")
      .data(d => d.outliers.map(v => {
        return {
          min: d.whiskers.min,
          max: d.whiskers.max,
          key: d.key,
          value: v,
        }
      }))
    circleData.exit().remove()
    const circleDataEnter = circleData.enter()
      .append('circle')
      .attr("class", "outlier")
      .attr("r", barWidth/6)
      .attr('fill', 'transparent')
      .attr('stroke', boxElementStroke)
      .attr("cx", (d) => xScale(d.key) + gridSize/2)
    circleData.merge(circleDataEnter).transition(t)
      .attr("cy", (d) => yScale(d.value))
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    function getDate () {
      const date = new Date(1532000000000 + Math.round(Math.random()*999999999))
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
    setInterval(() => {
      renderChart(document.querySelector('#wrapper'), {
        "Monday": [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100,  ],
        "Tuesday": [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100,  ],
        "Wednesday": [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100,  ],
        "Thursday": [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100,  ],
        "Friday": [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100,  ],
        "Saturday": [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100,  ],
        "Sunday": [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100,  ],
      })
    }, 5000)
    renderChart(document.querySelector('#wrapper'), {
      "Monday": [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100,  ],
      "Tuesday": [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100,  ],
      "Wednesday": [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100,  ],
      "Thursday": [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100,  ],
      "Friday": [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100,  ],
      "Saturday": [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100,  ],
      "Sunday": [ Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100,  ],
    })
  })