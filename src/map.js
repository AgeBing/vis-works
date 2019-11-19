import React from "react";
import './map.css';
import pic_f1 from './image/f1.jpg';
import pic_f2 from './image/f2.jpg';
import pic_f3 from './image/f3.jpg';
import pic_f4 from './image/f4.jpg';
import pic_f5 from './image/f5.jpg';
import pic_f3a from './image/f3a.jpg';

import Particle from './util/particle'

const pics = {
	'f1' : pic_f1,
	'f2' : pic_f2,
	'f3' : pic_f3,
	'f3a' : pic_f3a,
	'f4' : pic_f4,
	'f5' : pic_f5,
}

class Map extends React.Component {

  constructor(props){
    super(props)
    this.state = {
    }

    this.canvas = React.createRef();
  }

  componentDidMount(){
  	console.log(this.canvas)

  	this.drawBurns()
  }

  // 用 canvas 画团火焰
  drawBurns(){
  	let canvas = this.canvas
  	if(!canvas  || !canvas.current) return

  	canvas = this.canvas.current
  	let height = canvas.clientHeight
  	let width  = canvas.clientWidth
  	let ctx = canvas.getContext("2d");

  	let particles = []

  	let boundry = {
  		left : 50,
  		width: 220,
  		top : 25,
  		height:95,
  	}

  	// let percent = this.props.percent
  	let percent = 1

  	for(let i = 0;i < 500;i++){
  		let p = new Particle(ctx)
	  	p.x = getRandomInt(boundry.left , (boundry.left + boundry.width) * percent)
	  	p.y = getRandomInt(boundry.top ,  (boundry.top  + boundry.height) )

	  	// console.log(p.x , p.y )
	  	// p.draw()
	  	particles.push(p)
  	}
  	ctx.globalCompositeOperation = "lighter";

  	function update() {
  		clear()
  		particles.map((p)=>{
  			p.r += 0.15;
			p.a -= 0.015;
			if(p.a < 0) {
				p.r = Math.random() * 4;
				p.a = Math.random();
			}
			p.draw()
  		})
  	}
  	
  	function clear() {
		ctx.clearRect(0, 0, width, height);
	}


	let timeoutId = setTimeout(update, 1000 / 30);
	this.setState({ timeoutId })
  }

  render() {
    return (
      <div className='container'>
        <img src={pics[ this.props.floor ] ||  pics['f1']}  className='image' />
        <canvas ref={this.canvas}/>
      </div>
    );
  }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



export default Map
