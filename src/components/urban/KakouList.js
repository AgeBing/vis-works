import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './index.css';
import * as d3 from 'd3'
import { Slider, InputNumber, Row, Col, Statistic ,Switch } from 'antd';
import { ScrollRankingBoard } from '../../dep/@jiaminghi/data-view-react/src/index'
import { Divider,Button } from 'antd';


const kakouCsvUrl = "http://q1vcletmu.bkt.clouddn.com/kakou.csv"



function colorScale(v) {
  if( v > 800){
    return '#ff4d4f'
  }else if(v > 400){
    return '#ffec3d'
  }else{
    return '#95de64'
  }
}

class KakouWidgets extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
    }
  }
  async componentWillMount(){

    let kakou = await this.getKakous()

    let data = [] ,len = kakou.arr.length;

    let initAmount = 1000

    for(let i = 0;i < 100;i++){

      let j = Math.ceil(Math.random()*len) - 1
      j =  (j > len || j < 0) ? 0 : j
      let _kakou = kakou.arr[j]

      data.push({
        name : _kakou['name'],
        value: initAmount,
        color: colorScale(initAmount),
        id : _kakou['id']
      })

      let decrese = Math.ceil(Math.random()*10)
      if(initAmount >= 50){
        initAmount -= decrese
      }
    }
    console.log(data)

    const config = {
         rowNum:10,
         data,
         carousel: 'page',
         waitTime: 5000,  //刷新时间
    }
    this.setState({
      config
    })

  }
  async getKakous(){
    let self = this
    return new Promise((resolve,reject)=>{
        d3.csv(kakouCsvUrl).then((data)=>{
          let kakous = []
          let ids = new Set()
          let kakouMap = new Map()
          data.map((row)=>{
              if(row['location'] == '二环内'){
                  let id = row['I_ID'],
                      lng =  +row['longitude'],
                      lat =  +row['latitude'],
                      name = row['C_NAME'],
                      direction = row['DIRECTION_INDEX'],
                      location = row['location']

                  if(!ids.has(id)){
                    kakous.push({
                        id , lng , lat,
                        name , direction , location
                    })

                    kakouMap.set(id , { id, lng ,lat , name ,direction,location  })
                  }
                  ids.add(row['I_ID'])
              }
          })  

          self.kakouMap = kakouMap
          resolve( { arr:kakous,map:kakouMap }  )
        })
    })
  }

  clickFunc(id){
    let kakou = this.kakouMap.get(id)
    this.props.selectKakouFunc(kakou)
  }
  render(){
  return (
      <div style={{width: '100%', height: '90%'}}>       
        <Divider orientation="left"> 各路口流量情况 </Divider>
        <ScrollRankingBoard 
          clickFunc={this.clickFunc.bind(this)}
          config={this.state.config}  style={{width: '100%', height: 'calc(100% - 67px)'}} />
      </div>
    )
  }
}

export default KakouWidgets;
