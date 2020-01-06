/***********************************
*           轨迹流图
************************************/
import BaseLayout from './Base'

class FlowLayout extends BaseLayout{
	constructor(){
		super()
	}
	init(scene , points , lines){
		this.scene = scene

		if(points && lines){
			this._createLayer( points ,lines )
		}
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
	_createLayer( points , lines ){
		let self = this
	    /*
	      画 卡口 点
	    */
	    let pl = self.scene.PointLayer({
	          zIndex: 2
	      })
	      .source(points,{
	        parser:{
	            type:'json',
	            x : 'lng',
	            y : 'lat',
	            name: 'name',
	        },
	      })
	      .shape('circle')
	      // .shape('name', 'text')
	      .size(3) 
	      .active(true)
	      .color('#FF7A45')
	      .style({
	        opacity: 0.9,
	        strokeWidth: 0
	      })
	      .hide()
	      .render();

	    // 绑定交互
	    // pl.on('click', (ev)=>{
	    //   let kakou = ev.feature,
	    //       kakouId = kakou.id
	    //   self.props.seletcKakou( self.kakouMap.get(kakouId) )
	    //   self.FlyToCenter(kakou.lng , kakou.lat )
	    // });

	    /*
	      画动态的轨迹线条
	    */
	   let ll = self.scene.LineLayer({
	        zIndex: 3
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
	      .size(1)
	      .color('#FF7A45')
	      .style({
	        opacity: 0.85,
	      })
	      .animate({
	        enable:true, // 开启动画
	        interval:0.2, //  0-1 轨迹间隔 
	        duration:2, // 动画时间
	        trailLength:0.8, // 轨迹长度 0-1
	      })
	      .hide()
	      .render()

	    this.layers = {
	    	'PointLayer' : pl,
	    	'LineLayer'  : ll
	    }
	}



}


export default FlowLayout