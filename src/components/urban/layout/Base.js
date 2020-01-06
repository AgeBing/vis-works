

class BaseLayout{
	constructor(){

	}
	init(){

	}
	update(){

	}
	setVisibility( visible ){
		if(visible == undefined) return
		const self = this
		let layer 
		Object.keys( self.layers ).map((layerName)=>{
			layer = self.layers[layerName]
			if(!layer) return
			if(visible)
				layer.show()
			else
				layer.hide()
		})
	}
}


export default BaseLayout