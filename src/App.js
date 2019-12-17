import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import './App.css';
import 'antd/dist/antd.css';

import { Icon,Button } from 'antd'
import  Fire from './components/fire/index'
import  Board from './components/board/index'
import  Urban from './components/urban/index'
import  Traffic from './components/traffic/index'
import  Explorer from './components/explorer/index'

class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      floor : '',
      percent: 0
    }
  }

  componentWillMount(){
  
  }

  render(){
    const Index = () => <div>Index页面</div>

    const About = () => <div>About页面</div>

  return (
    <div className="App">   
        <BrowserRouter
          basename='/vis-works'
        >
            <div className='home-btn'>
              <Link to='/'>
                <Button shape="circle" icon="home"/>
              </Link>
            </div>
            {/*路由配置*/}
            <Switch>
                <Route path='/' exact component={Board}></Route>
                <Route path='/urban' exact component={Urban}></Route>
                <Route path='/fire' exact component={Fire}></Route>
                <Route path='/traffic' exact component={Traffic}></Route>
                <Route path='/explore' exact component={Explorer}></Route>
            </Switch>
        </BrowserRouter>
    </div>
  )}
}

export default App;
