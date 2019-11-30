import APILoader from '../../util/APILoader'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Scene, PointLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';

const Children = React.Children
class Map extends Component {
  state = {
    mapLoaded: false,
    scene: null
  }
 

  static childContextTypes = {
    scene: PropTypes.object
  }
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.createInstance()
  }


  createInstance() {
    let self = this
    this.scene = new Scene({
      id: 'map',
      map: new GaodeMap({
      pitch: 0,
      type: 'amap',
      style: 'light',
      center: [ 140.067171, 36.26186 ],
      zoom: 5.32,
      maxZoom: 10 , 
      token: '49aa9ff2c3f76f61ddd2d9b1302ebbd3'
      }),
    })

    self.drawSth()
  }

  drawSth(){
    let self = this
    fetch("https://gw.alipayobjects.com/os/basement_prod/d3564b06-670f-46ea-8edb-842f7010a7c6.json")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const pointLayer = new PointLayer({})
              .source(data)
              .shape('circle')
              .size('mag', [ 1, 25 ])
              .color('mag', mag => {
                return mag > 4.5 ? '#5B8FF9' : '#5CCEA1';
              })
              .style({
                opacity: 0.3,
                strokeWidth: 1
              });

            self.scene.addLayer(pointLayer);
        });
  }
  render() {
    return (
      <div
        id='map'
        style={{
          width: '100%',
          margin: '0',
          height: '100%',
          position: 'absolute'
        }}
        ref={div => {
          this.mapWrapper = div
        }}
      >
      </div>
    )
  }
}
export default Map