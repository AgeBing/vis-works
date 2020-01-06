import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Upload from './upload.js'
import MyMap from './scene.js'
import './index.css'

class Explorer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data : {}
    }
  }
  handleUpload(datas) {
    let d = new Date()
    this.setState({
       data : {
          lines : datas,
          timeStamp: d.toString()
       }
    })
  }

  render(){
    return(
      <div className="explore-app"> 
        <div className='upload-contain'>
          <Upload onUpload={this.handleUpload.bind(this)}/>
        </div>
        <div className='map-contain' >
          <MyMap  inputData={this.state.data} />
        </div>
      </div>
    )
  }
}

export default Explorer;
