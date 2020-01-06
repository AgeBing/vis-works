/***********************************
*           轨迹流图
************************************/
import BaseLayout from './Base'
import * as L7 from '@antv/l7';

import imageStation from '../../../image/消防站.png'
import { sites119 } from '../data.js'


let stations = sites119.map((site)=>{
    let locationStr = site['location']
	let locationArr = locationStr.split(',')
	locationArr[0] = +locationArr[0]
	locationArr[1] = +locationArr[1]

	return locationArr
})

console.log(stations)

class ReachLayout extends BaseLayout{
	constructor(){
		super()
	}
	init(scene){
		this.scene = scene
		this._createLayer()
	}
	render(points , lines ){
		this._createLayer( points ,lines )
	}

	update( lines ){
		this.layers['LineLayer']
			.setData( lines  , {
		        parser: {
		          type:'json',
		          x: 'lng1',
		          y: 'lat1',
		          x1: 'lng2',
		          y1: 'lat2'
		        }
		      })
	}
	updatePOI( lng,lat ){
		let poiMarker = this.layers['POILayer']
		poiMarker.setLnglat( [lng,lat] )
	}	
	updateHull( lines ){
		this.layers['hullLayer']
		.setData( lines  , {
	        parser: {
	          type:'json',
	          x: 'lng1',
	          y: 'lat1',
	          x1: 'lng2',
	          y1: 'lat2'
	        }
	      })
	}
	updateRoute( lines ){
		this.layers['routeLayer']
		.setData( lines  , {
	        parser: {
	          type:'json',
	          x: 'lng1',
	          y: 'lat1',
	          x1: 'lng2',
	          y1: 'lat2'
	        }
	      })
	}
	showStations(){
		this.layers['imageLayers'].map((layer)=>{
			layer.show()
		})
	}
	hideStations(){
		this.layers['imageLayers'].map((layer)=>{
			layer.hide()
		})
	}
	setVisibility( visible ){
		if(visible) 
			this.showStations()
		else
			this.hideStations()
	}
	_createLayer(  ){
		let self = this

		let poiMarker = new L7.Marker({
        	color: 'red'
      	})
		poiMarker.setLnglat([0,0]).addTo(self.scene)


		let lines = []
		let ll = this.scene.LineLayer({
		        zIndex: 5
		      })
		      .source(lines, {
		        parser: {
		          type:'json',
		          x: 'lng1',
		          y: 'lat1',
		          x1: 'lng2',
		          y1: 'lat2'
		        }
		      })
		      .shape('line')
		      .size(4)
		      .color('#FF7A45')
		      .style({
		        opacity: 0.85,
		      })
		      .render()

		let imageLayers = stations.map((center)=>{
			let imageLayer = this.scene.ImageLayer()
			.source(
		      imageStation, 
		      {
		      parser: {
		        type: 'image',
		        extent: [center[0], center[1] , center[0] + 0.005 , center[1] + 0.005 ]
		      }
		    }).style({
		      opacity: 1.0
		    })
		    .render()
		    .hide()

		    return imageLayer
		})

		let routeLayer = this.scene.LineLayer({
		        zIndex: 5
		      })
		      .source(lines, {
		        parser: {
		          type:'json',
		          x: 'lng1',
		          y: 'lat1',
		          x1: 'lng2',
		          y1: 'lat2'
		        }
		      })
		      .shape('line')
		      .size(2)
		      .color('#FF7A45')
		      .style({
		        opacity: 0.85,
		      })
		      .render()


	    this.layers = {
	    	'POILayer' : poiMarker,
	    	'hullLayer': ll,
	    	'imageLayers':imageLayers,
	    	'routeLayer':routeLayer
	    }
	}
}

export default ReachLayout