import React, { Component } from "react"
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'

/*管理的路由组件*/

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user
        if (!user || !user._id) {
            return <Redirect to='/login' />
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider><LeftNav /></Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{ margin: 10, backgroundColor: '#fff' }}>
                        <Switch>
                            <Redirect from='/' exact to='/home' />
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            {/* <Route path='/charts/bar' component={Bar}/>  */}
                            {/* <Route path='/charts/line' component={Line}/>  */}
                            {/* <Route path='/charts/pie' component={Pie}/>  */}
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', color: '#ccc' }}>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}