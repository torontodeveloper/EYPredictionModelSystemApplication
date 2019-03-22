import * as d3 from 'd3';

export function initChart() {

    var dataArr = constructData();

    var dataField = 'var3';

    var chartRange = cleanUpChartRange(dataArr, dataField);

    var totalWidth = 450,
        totalHeight = 120,
        margin = {
            top: 30,
            right: 30,
            bottom: 50,
            left: 30
        },
        width = totalWidth - margin.left - margin.right,
        height = totalHeight - margin.top - margin.bottom;

    var chart = d3.box()
        .value(function(d) {
            return d[dataField];
        })
        .width(width)
        .height(height)
        .domain([chartRange[0], chartRange[1]]);

    var xScale = d3.scale.linear()
        // this is the data x values
        .domain([chartRange[0], chartRange[1]])
        // this is the svg width
        .range([0, width]);

    var svg = d3.select('.svg-wrapper').selectAll('svg')
        .data([dataArr])
        .enter().append('svg')
            .attr('width', totalWidth)
            .attr('height', totalHeight)
            .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .call(chart);

    // axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .ticks(10)
        .tickFormat(tickFormatter);

    // add axis
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (height + 20) + ')')
        .call(xAxis);


    buildOutlierTable(dataField, totalWidth);
}

function constructData() {
    var numPoints = 300;
    var max1 = 1958;
    var max2 = 85731;
    var log3 = 30;

    // make sure the max value is in the data arr.
    // this is just to test what happens on particular max values.
    var arr1 = [max1];
    for (var i = 0; i < numPoints - 1; i++) {
        arr1.push(Math.floor(Math.random() * max1));
    }
    var arr2 = d3.range(numPoints).map(function() {
        return d3.round(d3.random.normal(max2 / 2, max2 / 8)(), 1);
    });
    var arr3 = d3.range(numPoints).map(function() {
        return d3.round(d3.random.logNormal(Math.log(log3), 0.4)(), 1);
    });

    return arr1.map(function(d, i) {
        return {
            myId: i,
            var1: d,
            var2: arr2[i],
            var3: arr3[i]
        };
    });
}

function cleanUpChartRange(arr, field) {

    // calculate the data's min and max so we can use it
    // to make nice bin widths for the histogram
    var xMin = d3.min(arr, function(dataObj) {
        return dataObj[field];
    });
    var xMax = d3.max(arr, function(dataObj) {
        return dataObj[field];
    });

    // construct nice bin widths
    var rounderBin = 20;

    var rounder;
    var tempBinWidth = parseFloat((xMax / rounderBin).toFixed(2));
    var multiplier;
    var places = 2;

    if (tempBinWidth < 1) {
        multiplier = 0.1;
    } else if (tempBinWidth < 2.6) {
        multiplier = 1;
    } else if (tempBinWidth < 10) {
        multiplier = 5;
    } else {
        tempBinWidth = Math.round(tempBinWidth);
        places = tempBinWidth.toString().length - 1;
        multiplier = Math.pow(10, places);
    }

    rounder = Math.round(tempBinWidth / multiplier) * multiplier;

    // clean up rounder so it goes evenly into a power of 10
    if (multiplier > 10) {
        while (Math.pow(10, places + 1) % rounder) {
            rounder += multiplier;
        }
    }
    // round xMax up to the nearest binWidth for the chart max
    return [
        Math.floor(xMin / rounder) * rounder,
        Math.ceil(xMax / rounder) * rounder
    ];
}

function tickFormatter(d) {
    if (d !== (d | 0)) {
        // format non-integers as 1-decimal float
        return d3.format('0.1f')(d);
    } else if (d < 1000) {
        // format just as integers
        return d3.format('d')(d);
    } else if (d < 10000 && (d % 1000 === 0)) {
        // format using SI, to 1 significant digit
        return d3.format('0.1s')(d);
    } else {
        // format using SI, to 2 significant digits
        return d3.format('0.2s')(d);
    }
}

function tableFormatter(d) {
    if (isNaN(d)) {
        return d;
    }
    if (d !== (d | 0)) {
        // format non-integers as 1-decimal float
        return d3.format('0,.1f')(d);
    } else {
        return d3.format(',d')(d);
    }
}

function buildOutlierTable(dataField, width) {
    var outlierCircles = d3.selectAll('g.outlier');
    var outliersData = outlierCircles.data();
    if (!outliersData || !outliersData.length) {
        return;
    }

    var columns = [];
    for (var keys in outliersData[0]) {
        columns.push(keys);
    }

    var outliersWrapper = d3.select('.outliers-wrapper');

    outliersWrapper.append('div').attr('class', 'outliers-title').text('Outliers by data field ' + dataField);

    var outliersTable = outliersWrapper.append('table').attr('class', 'outliers-table').style('width', width + 'px'),
        thead = outliersTable.append('thead'),
        tbody = outliersTable.append('tbody');

    // append the header row
    thead.append('tr')
        .selectAll('th')
        .data(columns)
        .enter()
        .append('th')
        .text(function(column) {
            return column;
        });

    // create a row for each object in the data
    var outlierRows = tbody.selectAll('tr')
        .data(outliersData)
        .enter()
        .append('tr');

    // create a cell in each row for each column
    outlierRows.selectAll('td')
        .data(function(row) {
            return columns.map(function(column) {
                return {
                    column: column,
                    value: row[column]
                };
            });
        })
        .enter()
        .append('td')
        .text(function(d) {
            return tableFormatter(d.value);
        });

    // add highlighting to outlier hover
    outlierCircles
        .on('mouseover', function(circleD) {
            outlierCircles.classed('highlight', false);
            var currCircleG = d3.select(this).classed('highlight', true);
            currCircleG.each(function() {
                this.parentNode.appendChild(this);
            });

            outlierRows.classed('highlight', false);
            outlierRows.filter(function(rowD) {
                return circleD[dataField] === rowD[dataField];
            }).classed('highlight', true);
        })
        .on('mouseleave', function() {
            outlierRows.classed('highlight', false);
            outlierCircles.classed('highlight', false);
        });

    outlierRows
        .on('mouseover', function(rowD) {
            outlierCircles.classed('highlight', false);
            outlierCircles.filter(function(circleD) {
                return circleD[dataField] === rowD[dataField];
            }).classed('highlight', true)
                .each(function() {
                    this.parentNode.appendChild(this);
                });
        })
        .on('mouseleave', function() {
            outlierCircles.classed('highlight', false);
        });
}
