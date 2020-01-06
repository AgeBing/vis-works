/***********************************
*           Context视图
************************************/
import BaseLayout from './Base'

class ContextLayout extends BaseLayout{
	constructor(){
		super()
	}
	init(scene , trajs){
		this.scene = scene

		if( trajs ){
			this._createLayer( trajs )
		}
	}
	render( trajs ){
		this._createLayer( trajs )
	}
	update( ){
	}
	_createLayer( trajs ){
		const { recData : rData ,
			    circleData:cData,
			    lineData: lData } = this._cal( trajs )

		let self = this
	    /*
	      画 矩形
	    */
	    let rl = self.scene.PolygonLayer({
	          zIndex: 4
	      })
	      .source(rData,{
	        parser:{
	          type:'json',
	          coordinates:'geometryCoord'
	        },
	      })
	      .active(true)
	      .shape('fill')
	      .color('sum',[
	        '#FFD591',
	        '#FF7A45',
	        '#ff0000'
	      ])
	      .style({
	        opacity: 0.7,// 建立透明度映射{'sum',[0.5,1]}
	      })
	      .hide()
	      .render();
	    
	    rl.setHeight(3);

	    // 绑定交互
	    // let popup = new L7.Popup();
	    // rl.on('click', (ev)=>{
	    //   let cord = ev.feature.geometryCoord[0];
	    //   popup.setLnglat(cord[0]);
	    //   let info = "总体的车流量为:" + ev.feature.sum +"  流入:"+ev.feature.in+"   流出:" + ev.feature.out; 
	    //   popup.setText(info);
	    //   popup.addTo(self.scene);
	    //   // console.log("mouseover",info,ev);
	    // });
	    // rl.on('mouseout', (ev)=>{
	    //   popup.remove();
	    //   // console.log("mouseout",ev);
	    // }); 


	    /*
	      画 中心圆
	    */
	    let cl = self.scene.PointLayer({
	        zIndex: 5
	      })
	      .source(cData,{
	        parser:{
	            type:'json',
	            x : 'lng',
	            y : 'lat',
	            name: 'id',
	        },
	      })
	      .shape('circle')
	      .size('abs',[this.scene.getZoom()/3,this.scene.getZoom()]) 
	      .active(true)
	      .color('inOrOut',['#70C9EB','#FFBD90'])
	      .style({
	        opacity: 0.95,// 建立透明度映射
	        strokeWidth: 0
	      })
	      .hide()
	      .render();
	    
	    cl.setHeight(200);

	    /*
	      画 线
	    */
	    let ll = self.scene.LineLayer({
	      zIndex: 6
	    })
	    .source(lData, {
	      parser:{
	          type:'json',
	          x:'lng1',
	          y:'lat1' , 
	          x1:'lng2',
	          y1:'lat2' , 
	      }
	    })
	    .shape('line')
	    .size(2)
	    .color('inOrOut',['#70C9EB','#FFBD90'])
	    .style({
	      opacity: 0.7,
	    })
	    .hide()
	    .render()
	    ll.setHeight(400);

	    this.layers = {
	    	'PolygonLayer' : rl,
	    	'PointLayer' : cl,
	    	'LineLayer'  : ll
	    }
	}

	_cal(trajs){
	    let Features = [];
	    let recIds = new Set();
	    let mapCrossToId = new Map();
	    // 确定左上角的坐标点，以及间隔距离d，隐形对划分页面的小方格进行编号
	    let leftTopPoint = [113.909127, 38.000000];
	    let dis = 0.005;
	    let horizonNum = 150;
	    // console.log("calData",trajs);
	    // 遍历轨迹数据，确定方格的总车流量值、车流量的差值、邻居方格编号记录、以及相邻方格车辆交换数量
	    for(var i=0;i<trajs.length;i++){
	      for(var j=0;j<trajs[i].length;j++){
	        let line = trajs[i][j];
	        let se = [];
	        let seId = [];
	        se[0] = [line.lng1,line.lat1];
	        se[1] = [line.lng2,line.lat2];
	        for(var h=0;h<2;h++){
	          // 为每一个卡口坐标赋予相应的矩形编号
	          if(!mapCrossToId.get(se[h])){
	            let ySeq = (se[h][1]-leftTopPoint[1])/dis;
	            let xSeq = (se[h][0]-leftTopPoint[0])/dis
	            let tempId = Number(ySeq.toFixed(0)*horizonNum)+Number(xSeq.toFixed(0));
	            mapCrossToId.set(se[h],tempId);
	            // console.log("开始计算--位置",xDis.toFixed(0),ySeq.toFixed(0),tempId);
	          }
	          seId[h] = mapCrossToId.get(se[h]);
	          // 给矩形初始化
	          if(!Features[seId[h]]){
	            let centerP = [];
	            let xNum = seId[h]%horizonNum;
	            let yNum = (seId[h]/horizonNum).toFixed(0);
	            
	            centerP[0] = leftTopPoint[0] + dis*xNum;
	            centerP[1] = leftTopPoint[1] + dis*yNum;
	            // console.log("编号",leftTopPoint[0],leftTopPoint[1] , centerP[0],centerP[1],seId[h],xNum,yNum);
	            Features[seId[h]] = {
	              "id": seId[h], //该矩形的编号
	              "geo":centerP,
	              "sum":0, // 该聚合体整体的总车流量，进入+流出，映射到中心圆的大小
	              "in":0,
	              "out":0,
	              "abs":0,
	              "neighId":[],
	              "neighNum":[],    
	            };
	          }
	        }
	        // 起点和终点在不同的矩形区域内，计算流入流出等
	        if(seId[0]!=seId[1]){
	          // 处理起点
	          recIds.add(seId[0]);
	          recIds.add(seId[1]);
	          Features[seId[0]].sum++;
	          Features[seId[0]].out++;
	          // 第一次出现该邻居矩形,添加该邻居
	          if(Features[seId[0]].neighId.indexOf(seId[1])==-1){
	            Features[seId[0]].neighId.push(seId[1]);
	            Features[seId[0]].neighNum.push(0);
	          }
	          let tempN1 = Features[seId[0]].neighId.indexOf(seId[1]);
	          Features[seId[0]].neighNum[tempN1]++;
	          // 处理终点
	          Features[seId[1]].sum++;
	          Features[seId[1]].in++;
	          // 第一次出现该邻居矩形,添加该邻居
	          if(Features[seId[1]].neighId.indexOf(seId[0])==-1){
	            Features[seId[1]].neighId.push(seId[0]);
	            Features[seId[1]].neighNum.push(0);
	          }
	          let tempN2 = Features[seId[1]].neighId.indexOf(seId[0]);
	          Features[seId[1]].neighNum[tempN2]++;
	        }
	      }
	    }
	    // 遍历矩形编号，计算矩形的主要方向，生成绘制的数据
	    let recData = [];
	    let circleData = [];
	    let lineData = [];
	    let numId = 0;
	    for(let recId of recIds){

	      let centerCor = Features[recId].geo;
	      let cornerCords = [];
	      let nDis = (dis-dis*0.03)/2;
	      cornerCords[0]=[centerCor[0]-nDis,centerCor[1]+nDis];
	      cornerCords[1]=[centerCor[0]+nDis,centerCor[1]+nDis];
	      cornerCords[2]=[centerCor[0]+nDis,centerCor[1]-nDis];
	      cornerCords[3]=[centerCor[0]-nDis,centerCor[1]-nDis];
	      cornerCords[4]=[centerCor[0]-nDis,centerCor[1]+nDis];

	      recData[numId] = {
	        'id':Features[recId].id,
	        // "lng":Features[recId].geo[0],
	        // "lat":Features[recId].geo[1],
	        'in':Features[recId].in,
	        'out':Features[recId].out,
	        'sum':Features[recId].sum,
	        'type': "Polygon",
	        'geometryCoord':[cornerCords]
	      };
	      let nInOrOut;
	      let nAbs;
	      if(Features[recId].in>=Features[recId].out){
	        nInOrOut = 1;
	        nAbs = Features[recId].in - Features[recId].out;
	      }else{
	        nInOrOut = 0;
	        nAbs = Features[recId].out - Features[recId].in;
	      }
	      circleData[numId] = {
	        "id":Features[recId].id,
	        "lng":Features[recId].geo[0],
	        "lat":Features[recId].geo[1],
	        "abs":nAbs,
	        "inOrOut":nInOrOut,
	      };
	      let maxId=recId;
	      let maxNum=-1;
	      //  求出最大的邻居编号
	      for(let j = 0;j<Features[recId].neighNum.length;j++){
	        if(Features[recId].neighNum[j]>maxNum){
	          maxNum = Features[recId].neighNum[j];
	          maxId = Features[recId].neighId[j];
	        }
	      }
	      let ratio = maxNum/Features[recId].sum;
	      let newLon,newLat;
	      // 方向的斜率为无穷大，既不存在。即竖直方向
	      if(Features[maxId].geo[0].toFixed(6)==Features[recId].geo[0].toFixed(6)){
	        newLon = Features[maxId].geo[0];
	        let latDis = Features[maxId].geo[1]-Features[recId].geo[1];
	        latDis = latDis>0?dis:-1*dis;
	        newLat = Features[recId].geo[1]+latDis*ratio;
	      }else{
	        //该方向的斜率
	        // 两点连线的长度的平方
	        let lonSquare = Math.pow((Features[maxId].geo[1]-Features[recId].geo[1]),2)+Math.pow((Features[maxId].geo[0]-Features[recId].geo[0]),2);
	        let k = Math.pow(Math.pow(dis,2)/lonSquare,0.5);
	        newLon = (Features[maxId].geo[0]-Features[recId].geo[0])*k*ratio +Features[recId].geo[0] ;
	        newLat = (Features[maxId].geo[1]-Features[recId].geo[1])*k*ratio +Features[recId].geo[1] ;
	      }
	      // console.log("lonDis,latDis",lonDis,latDis,ratio);
	      lineData[numId] = {
	        "id":Features[recId].id,
	        "lng1":Features[recId].geo[0],
	        "lat1":Features[recId].geo[1],
	        "lng2":newLon,
	        "lat2":newLat,
	        "inOrOut":nInOrOut,
	      }
	      numId++;
	    }
	    return {recData,circleData,lineData};
  }
}


export default ContextLayout