import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Upload from './upload.js'
import MyMap from './scene.js'
import './index.css'

class Explorer extends React.Component {
  render(){
    return(
      <div className="explore-app"> 
        <div className='upload-contain'>
          <Upload />
        </div>
        <div className='map-contain' >
          <MyMap />
        </div>
      </div>
    )
  }
}

export default Explorer;
