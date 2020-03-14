/* eslint-disable */

const addToChart = (data) =>{
    return { 
        type : "ADD_CHART",
        data
    }
} 
const emptyChart = (data) =>{
    return { 
        type : "EMPTY_CHART",
        data
    }
} 

export {
    addToChart,
    emptyChart
}