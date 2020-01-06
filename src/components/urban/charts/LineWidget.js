import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import '../index.css';

import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set"

import { Divider } from 'antd';
import { sites119 } from  '../data.js' 
const key = '43c9cb89ad81d10f36e9aa7c04043e91'


function generateRandomData(){
  const data = []

  for(let i=0;i< sites119.length ;i++){
    let locationStr = sites119[i]['location']
    let locationArr = locationStr.split(',')
    locationArr[0] = +locationArr[0]
    locationArr[1] = +locationArr[1]

    data.push({
      'name' : sites119[i]['name'],
      'time' : Math.random() * 100,
      'localtion': locationArr
    })
  }

  return data
}

function getPoints(polyline){
  let points = []
  let pointsArr =  polyline.split(';')
  pointsArr.map((pointStr)=>{
    let pointArr = pointStr.split(',')
    points.push({
       'lng' : +pointArr[0],
       'lat' : +pointArr[1]
    })
  })

  return points
}
let chartIns


class LineWidget extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      data : []
    }
  }

  componentWillMount(){

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.selectPOI &&  ( ( this.props.selectPOI && nextProps.selectPOI['lng'] != this.props.selectPOI['lng']) || (!this.props.selectPOI) )){
       this.update(nextProps.selectPOI)
    }
  }

  async getData(selectPOI){
    let ps = []

    for(let i = 1;i < sites119.length ;i++){
        let p = new Promise((resolve,reject)=>{
                    
          let origin = selectPOI['lng']+','+selectPOI['lat']
          let destination = sites119[i]['location']
          let url =  `https://restapi.amap.com/v3/direction/driving?key=${key}&origin=${origin}&destination=${destination}`

          fetch(url)
              .then(res => res.json())
              .then(res => {
                  if(res['route']['paths'].length > 0){

                      let route = res['route']['paths'][0]
                      console.log(route)

                      let trajPoints = []
                      route.steps.map((step)=>{
                          let points = getPoints(step['polyline'])
                          trajPoints = trajPoints.concat(points)
                      })
                      console.log(trajPoints)
                      resolve({
                        'name': sites119[i]['name'],
                        'time' :  Math.floor((+route['duration'])/60),
                        'distance' : +route['distance'],
                        'trajs': trajPoints,
                      })
                  }
              })
        })
        ps.push( p )
    }
    return Promise.all(ps)


  }
  async update( selectPOI ){
    let data = await this.getData(selectPOI)
    data = data.sort((a,b)=>{
      return a['time'] - b['time']
    })
    this.setState({ data })
  }
  render(){
    let self = this
    return (
      <div>       
          <Chart padding={[ 20, 50, 60, 50 ]} height={300}  data={this.state.data} forceFit
              onGetG2Instance={g2Chart => {chartIns = g2Chart;}}
                onPlotClick={ev => {
                  var point = {
                    x: ev.x,
                    y: ev.y
                  };
                  var items = chartIns.getTooltipItems(point);
                  console.log(items)
                  if(items.length > 0){
                     self.props.selectStation( items[0]['point']['_origin']['trajs'] )
                  }
                }}

          >
            <Axis name="消防站" />
            <Axis name="时间" />
            <Legend />
            <Tooltip
              crosshairs={{
                type: "y"
              }}
            />
            <Geom
              type="interval"
              position="name*time"

              adjust={[
                {
                  type: "dodge",
                  marginRatio: 1 / 32
                }
              ]}
            />
            <Geom type="line" position="name*distance"  
              color='#b3cde3'
              size={2} />

          </Chart>

      </div>
    )}
}

export default LineWidget;
