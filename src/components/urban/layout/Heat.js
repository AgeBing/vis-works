/***********************************
*           热力图
************************************/
import BaseLayout from './Base'

class HeatLayout extends BaseLayout{
	constructor(){
		super()
	}
	init(scene , points ){
		this.scene = scene

		if(points ){
			this._createLayer( points )
		}
	}
	render(points  ){
		this._createLayer( points  )
	}
	_createLayer( points ){
		const self = this
	    points.map((p)=>{
	       p['mag'] = Math.random()*1000
	    })

	    let hl = self.scene.HeatmapLayer({
	          zIndex: 9
	        })
	        .source(points,{
	          parser:{
	              type:'json',
	              x : 'lng',
	              y : 'lat',
	              mag: 'mag',
	          },
	        })
	        .size('mag', [0, 1.0]) // weight映射通道
	        .style({
	          intensity: 2,
	          radius: 100,
	          opacity: 0.5,
	          rampColors: {
	            colors: ['#2E8AE6', '#69D1AB', '#DAF291', '#FFD591', '#FF7A45', '#CF1D49'],
	            positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
	          }
	        })
	        .render()

	    this.layers = {
	    	'HeatmapLayer' : hl	
	    }
	}
}


export default HeatLayout