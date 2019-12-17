import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { Upload, Icon, message } from 'antd';
import * as d3 from 'd3'
import Papa from 'papaparse'

const { Dragger } = Upload;


const props = {
  name: 'file',
  multiple: true,
  action: '',
  onChange(info) {
    console.log(info)
    // const { status } = info.file;
    let csvfile = info.file.originFileObj
    Papa.parse(csvfile, {
      complete: (result) => {
        var data = result.data;
        console.log(data);
      },
      header: true
    })

    // return
    // if (status !== 'uploading') {
    //   console.log(info.file, info.fileList);
    // }
    // if (status === 'done') {
    //   message.success(`${info.file.name} file uploaded successfully.`);
    // } else if (status === 'error') {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
  },
};

class Explorer extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     csvfile: undefined
  //   };
  //   this.updateData = this.updateData.bind(this);
  // }

  // handleChange = event => {
  //   this.setState({
  //     csvfile: event.target.files[0]
  //   });
  // };

  // importCSV = () => {
  //   const { csvfile } = this.state;
  //   console.log(csvfile)
  //   // d3.csv(csvfile).then((data)=>{
  //   //   console.log('data',data)
  //   // })
  //   Papa.parse(csvfile, {
  //     complete: this.updateData,
  //     header: true
  //   });
  // };

  // updateData(result) {
  //   var data = result.data;
  //   console.log(data);
  // }

  // render() {
  //   console.log(this.state.csvfile);
  //   return (
  //     <div className="App">
  //       <h2>Import CSV File!</h2>
  //       <input
  //         className="csv-input"
  //         type="file"
  //         ref={input => {
  //           this.filesInput = input;
  //         }}
  //         name="file"
  //         placeholder={null}
  //         onChange={this.handleChange}
  //       />
  //       <p />
  //       <button onClick={this.importCSV}> Upload now!</button>
  //     </div>
  //   );
  // }


  render(){
    return(
      <div className="App">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Dragger>
      </div>
    )
  }
}

export default Explorer;
