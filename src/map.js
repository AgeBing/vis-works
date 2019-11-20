import React from "react";
import './map.css';
import pic_f1 from './image/f1.jpg';
import pic_f2 from './image/f2.jpg';
import pic_f3 from './image/f3.jpg';
import pic_f4 from './image/f4.jpg';
import pic_f5 from './image/f5.jpg';
import pic_f3a from './image/f3a.jpg';

import Particle from './util/particle'
import arrowTo from './util/Draw_traj'
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
    this.TrajsCanvas = React.createRef();
    this.floorTrajs ={
         'f1' : {
            'origin':{ x: 350, y: 150},
            'trajs':[
                  [{ x: 350, y: 150 },{ x: 360, y: 70 }],
                  [{ x: 360, y: 70 },{ x: 400, y: 60 }], 
                  [{ x: 350, y: 150 },{ x: 400, y: 100 }],
                  [{x: 350, y: 150 },{ x: 420, y: 120 }],
                  [{ x: 350, y: 150 },{ x: 400, y: 160 }]
                  ]
                  },
              'f2' : {
            'origin':{ x: 550, y: 150},
            'trajs':[
                  [{ x: 550, y: 150 },{ x: 520, y: 100 }],
                  [{ x: 550, y: 150 },{ x: 520, y: 210 }], 
                  [{ x: 550, y: 150 },{ x: 590, y: 100 }],
                  [{x: 550, y: 150 },{ x: 600, y: 130 }],
                  [{ x: 550, y: 150 },{ x: 600, y: 160 }]
                  ]
                  },
              'f3' :{
            'origin':{ x: 350, y: 150},
            'trajs':[
                 [{ x: 350, y: 150 },{ x: 350, y: 70 }],
                  [{ x: 350, y: 70 },{ x: 320, y: 70 }], 
                  [{ x: 350, y: 150 },{ x: 300, y: 200 }],
                  [{x: 350, y: 150 },{ x: 380, y: 70 }],
                  [{ x: 350, y: 150 },{ x: 380, y: 170 }]
                  ]
                  },
              'f3a' : {
            'origin':{ x: 550, y: 200},
            'trajs':[
                  [{ x: 550, y: 200 },{ x: 570, y: 130 }],
                  [{ x: 550, y: 200 },{ x: 590, y: 150 }], 
                  [{ x: 550, y: 200 },{ x: 580, y: 190 }],
                  // [{x: 550, y: 150 },{ x: 600, y: 130 }],
                  // [{ x: 550, y: 150 },{ x: 600, y: 160 }]
                  ]
                  },
              'f4' : {
            'origin':{ x: 450, y: 150},
            'trajs':[
                  [{ x: 450, y: 150 },{ x: 510, y: 100 }],
                  [{x: 510, y: 100},{ x: 480, y: 90 }], 
                  [{x: 450, y: 150 },{ x: 500, y: 200 }],
                  [{x: 450, y: 150 },{ x: 400, y: 100 }],
                  [{ x: 390, y: 100 },{ x: 410, y: 75 }]
                  ]
                  },
              'f5' : {
            'origin':{ x: 550, y: 150},
            'trajs':[
                  [{ x: 550, y: 150 },{ x: 410, y: 120 }],
                  [{ x: 410, y: 120 },{ x: 410, y: 90 }],
                  [{x: 550, y: 150 },{ x: 520, y: 100 }],
                  [{ x: 550, y: 150 },{ x: 600, y: 100 }]
                  ]
                  },
        }
    }

  componentDidMount(){
  	console.log(this.canvas)

  	this.drawBurns()
    // this.drawTrajs()
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
  		width: 210,
  		top : 25,
  		height:100,  
    }

    let percent = this.props.percent
    // console.log(percent , Math.sqrt(percent))
    // let percent = 1

    // 着火 中心点 
    // let centerPercent = [0 , 0],
    //   center = [boundry.left + boundry.width * centerPercent[0], 
    //         boundry.top + boundry.height * centerPercent[1]]
    let centerMap = {
      'f1' : [90,30],
      'f2' : [120,70],
      'f3' : [160,40 ],
      'f3a' : [120,60],
      'f4' :  [100,70],
      'f5' :  [110,30],
    }
    let center = centerMap[this.props.floor]

    // 标定
    // let center = [ boundry['left'] + boundry.width /2 ,
    //                 boundry['top'] + boundry.height /2]


    // 蔓延范围
    // let xmin = center[0] - boundry.width * Math.sqrt(percent) / 2 , 
    //   xmax = center[0] + boundry.width * Math.sqrt(percent) / 2 ,
    //   ymin = center[1] - boundry.height * Math.sqrt(percent) / 2 ,
    //   ymax = center[1] + boundry.height * Math.sqrt(percent) / 2 

    let xmin = center[0] - boundry.width * percent / 2 , 
      xmax = center[0] + boundry.width * percent / 2 ,
      ymin = center[1] - boundry.height * percent / 2 ,
      ymax = center[1] + boundry.height * percent / 2 

      xmin =  (xmin < boundry.left ) ?  boundry.left : xmin
      ymin =  (ymin < boundry.top ) ?   boundry.top : ymin
      xmax =  (xmax > (boundry.left+boundry.width)) ? (boundry.left+boundry.width) : xmax
      ymax =  (ymax > (boundry.top+boundry.height)) ? (boundry.top+boundry.height) : ymax


    // 火苗
    for(let i = 0;i < 300*percent;i++){
      let p = new Particle(ctx)
      p.x = getRandomInt(xmin , xmax)
      p.y = getRandomInt(ymin , ymax )
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
    let timeoutId = setInterval(update, 1000 / 30);
    this.setState({ timeoutId })

  };
  //canvas绘制逃生轨迹
  drawTrajs(){
    let myCanvas = this.TrajsCanvas
    if(!myCanvas  || !myCanvas.current) return
    // myCanvas.style.cssText = "position:absolute;left:0;top:0; border: 1px solid #ccc;"; // 画布样式
    myCanvas = this.TrajsCanvas.current
    let height = myCanvas.clientHeight
    let width  = myCanvas.clientWidth
    myCanvas.width = 690;   // 画布的宽度
    myCanvas.height = 360;  // 画布的高度 
   // 画笔（绘图对象）
    var ctx = myCanvas.getContext('2d');
 
    // ctx.fillStyle = "red";
    // ctx.arc(350, 150,5, 0, Math.PI*2, false);

   
    // 动画效果
    var _index = 1;
    var selfthis = this
    setInterval(function () {
        // 清空画布
        var BW = myCanvas.width;
        var BH = myCanvas.height;
        ctx.clearRect(0, 0, BW, BH);                // 清空画布
        if(selfthis.props.floor)
          var infs = selfthis.floorTrajs[selfthis.props.floor] 
        else
          var infs = selfthis.floorTrajs['f1']
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(infs['origin']['x'],infs['origin']['y'],3, 0, Math.PI*2, false);
        ctx.fill();
        ctx.closePath();
        // 整体偏移效果
        var offset = (_index % 3) * 5; 
        for(var i=0;i<infs['trajs'].length;i++)
        {
          arrowTo(ctx,infs['trajs'][i][0], infs['trajs'][i][1],{ offset: offset, color: "red", justifyAlign: false });
        }
//         arrowTo(ctx,{ x: 350, y: 150 }, { x: 360, y: 70 },  { offset: offset, color: "red", justifyAlign: false });
//         arrowTo(ctx,{ x: 360, y: 70 }, { x: 400, y: 60 },  { offset: offset, color: "red", justifyAlign: false });
//         arrowTo(ctx, { x: 350, y: 150 }, { x: 400, y: 100 }, { offset: offset, color: "red", justifyAlign: false });
//         arrowTo(ctx, { x: 350, y: 150 }, { x: 420, y: 130 }, { offset: offset, color: "red", justifyAlign: false });
//         arrowTo(ctx, { x: 350, y: 150 },  { x: 400, y: 160 }, { offset: offset, color: "red", justifyAlign: false });
 
        // 其他处理
        if (_index >= 50) {
            _index = 1
        }
        else {
            _index++;
        }
    }, 300);
}
  render() {
    return (
      <div className='container'>
        <h2 className='return-btn' onClick={this.props.return}> 返回 </h2>
        <img src={pics[ this.props.floor ] ||  pics['f1']}  className='image' />
        <canvas ref={this.canvas}/>
        <canvas ref={this.TrajsCanvas}/>
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
