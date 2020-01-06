import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { Upload, Icon, message } from 'antd';
import Papa from 'papaparse'

const { Dragger } = Upload;

class MyUpload extends React.Component {

  handleFileChange(info){
    let self = this
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done' || status === 'error') {

      let csvfile = info.file.originFileObj
      Papa.parse(csvfile, {
        complete: (result) => {
          var data = result.data;
          console.log('complete',data);
          self.props.onUpload(data)
        },
        header: true
      })

    }
  }
  render(){
    return(
      <div className="upload-app">
        <Dragger
          name="file"
          multiple={true}
          action=""
          onChange={this.handleFileChange.bind(this)}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text"> 上传 .csv 文件 </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
          </p>
        </Dragger>
      </div>
    )
  }
}

export default MyUpload;
