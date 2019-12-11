import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import './index.css';


import { Slider, InputNumber, Row, Col, Statistic ,Switch } from 'antd';

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

const TIME_GAP = 3000   // 2秒一更新

Date.prototype.format = function(fmt){
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };

  if(/(y+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
        
  for(var k in o){
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));  
    }       
  }

  return fmt;
}

function getTime(hour) {
  let year = 2019,
      month = 1,
      day   = 3,
      hours = hour,
      minutes = 0,
      seconds = 0,
      milliseconds = 0
  let d = new Date(year, month, day, hours, minutes, seconds, milliseconds)
  d = d.format("hh:mm:ss");
  return d
}

const marks = {
  0 : '0:00',
  6 : '6:00',
  12: '12:00',
  18: '18:00',
  24: '24:00',
}

class IntegerStep extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hour : 1,
      start: false,
      startId : 0
    }
  }

  componentWillMount(){
    let self = this
  }

  onChange = value => {
    this.setState({
      hour: value,
    })

    this.props.updateMapTime(value)
  };

  // 跟新时间 
  timer() {
    let self = this

    if(self.state.hour >= 23 ){
      clearInterval( self.state.startId )
    }
    let updateTime = self.state.hour+1
    this.setState({ hour: updateTime});
    this.props.updateMapTime(updateTime)
  }
  handleStartChange = (start) =>{

    let self = this
    if(start){
      let _startId = setInterval(self.timer.bind(self),TIME_GAP)
      self.setState({ startId:_startId })
    }else{
      clearInterval( self.state.startId )
    }
    this.setState({ start })
  }

  render() {
    const { hour,start } = this.state;

    return (
      <div>
          <Slider
            min={0}
            max={24}
            marks={marks}
            onChange={this.onChange}
            value={typeof hour === 'number' ? hour : 2}
          />
          <Statistic value={getTime(hour)}/ >
          <Switch size="small" checked={start} onChange={this.handleStartChange} />
      </div>
    );
  }
}



class Widgets extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
    }
  }

  componentWillMount(){

  }

  render(){
  return (
    <div>       
          <IntegerStep updateMapTime={this.props.updateMapTime}/>
    </div>
  )}
}

export default Widgets;
