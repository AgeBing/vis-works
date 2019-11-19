import React from "react";
import './map.css';
import pic_f1 from './image/f1.jpg';
import pic_f2 from './image/f2.jpg';
import pic_f3 from './image/f3.jpg';
import pic_f4 from './image/f4.jpg';
import pic_f5 from './image/f5.jpg';
import pic_f3a from './image/f3a.jpg';

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
  }
  render() {
    return (
      <div className='container'>
        <img src={pics[ this.props.floor ]} className='image' />
        <canvas ref={this.canvas} />
      </div>
    );
  }

}


export default Map
