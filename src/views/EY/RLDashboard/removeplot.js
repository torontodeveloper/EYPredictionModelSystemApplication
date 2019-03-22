import * as d3 from "d3";

export function destroyChart (wrapper) {
    const {select: d3Select} = d3
    d3Select(wrapper).selectAll('*').remove()
  }