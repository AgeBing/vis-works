// MAPHOOK 这是map的hook，用于加amap的依赖引入的

import React from 'react';
import { Chart, Geom, Tooltip, Legend } from 'bizcharts';
import numeral from 'numeral';
import DataSet from '@antv/data-set';
import { Divider,Button } from 'antd';

import { GDP as GDPData} from './data'
// 测试html需要引入依赖文件

// CDN START

const { AMapUI } = window;

const constructGeoJSON = (features) => {
  if (!features) return false;
  if (Array.isArray(features)) {
    return {
      type: 'FeatureCollection',
      features: [...features],
    };
  }
  return features;
};

// 传入adcode获取geojson，部分数据需要处理一下

const codes = {
  'Zhejiang' : 330000,
  'Ningbo' : 330200
}

const getGeojsonByCode = (adcode = 100000, withSub = true) => {
  if (!AMapUI) {
    return Promise.reject();
  }
  // 文档：https://lbs.amap.com/api/javascript-api/reference-amap-ui/geo/district-explorer
  return new Promise((resolve, reject) => {
    AMapUI.load('ui/geo/DistrictExplorer', (DistrictExplorer) => {
      const districtExplorer = new DistrictExplorer();
      districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
        if (error) {
          reject();
        }
        let res = null;
        if (withSub) {
          res = areaNode.getSubFeatures();
        } else {
          res = areaNode.getParentFeature();
        }
        resolve(constructGeoJSON(res));
      });
    });
  });
};

// 绘制思路
// 前提：页面加载高德地图及其UI的SDK，参考html页面
// 1、通过高德的数据接口获取geojson数据
// 2、通过Dataset进行数据处理
// 3、绘制class

class MapChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chinaGeo: null,
    };
  }

  componentDidMount() {
    this.updateGeos(this.props.region)
  }

  processGeoData = (geoData, dataValue) => {
    const { features } = geoData;
    features.forEach((one) => {
      const name = one && one.properties && one.properties.name;
      dataValue.forEach((item) => {
        if (name.includes(item['district'])) {
          one.value = item['value'];
        }
      });
    });

    const geoDv = new DataSet.View().source(geoData, { type: 'GeoJSON' });
    return geoDv;
  };
  componentWillReceiveProps(nextProps) {
    const { chinaGeo } = this.state;
    if (!chinaGeo) {
      return 
    }
    this.updateGeos(nextProps.region)
  }

  updateGeos(region){
    getGeojsonByCode( codes[region], true).then((res) => {
      let chinaGeo = res
      const data = this.processGeoData(chinaGeo, GDPData[region]);
      this.setState({ data , chinaGeo })
    });
  }
  render() {
    const { chinaGeo } = this.state;
    if (!chinaGeo) {
      return '数据加载中...';
    }
    const scale = {
      latitude: {
        sync: true,
        nice: false,
      },
      longitude: {
        sync: true,
        nice: false,
      },
    }
    const { data } = this.state
    return (
      <div  style={{ position: 'relative' }} className="contain">
        <Divider orientation="left" className='divider'> {this.props.regionName} 各下属区域 GDP 分布 </Divider>
        <Chart 
          scale={scale} data={data} 
          padding={[0, 0, 0, 20]}
          forceFit>
          <Geom
            type="polygon"
            position="longitude*latitude"
            style={{ lineWidth: 1, stroke: '#fff1f0' }}
            color={['value', ['#f7fcfd','#e5f5f9','#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#006d2c','#00441b']]}
            tooltip={[
              'name*value',
              (name, value) => ({
                name,
                value: value + '亿元'
              }),
            ]}
          >
            <Tooltip showTitle={false} />
          </Geom>
        </Chart>
        <Button shape="circle" className='btn' icon="rollback" onClick={this.props.handleDrill}/>
      </div>
    )
  }
}

export default MapChart;