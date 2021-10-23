import React, { Component } from "react"
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'

import './index.less'
import LinkButton from '../link-button'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { formateDate } from "../../utils/dateUtils"

class Header extends Component {

    state = { cur: formateDate(Date.now()) }

    logout = () => {
        Modal.confirm({
            title: '提示：',
            content: '确定退出吗?',
            onOk: () => {
                storageUtils.removeUser()
                memoryUtils.user = {}
                this.props.history.replace('/login')
            }
        })
    }

    getTime = () => {
        this.intervalId = setInterval(() => {
            const cur = formateDate(Date.now())
            this.setState({ cur })
        }, 1000)
    }

    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            }
            else if (item.children) {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                if (cItem)
                    title = cItem.title
            }
        })
        return title
    }

    componentDidMount() {
        this.getTime()
    }

    render() {

        const username = memoryUtils.user.username
        const title = this.getTitle()
        const { cur } = this.state

        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎， {username}</span>
                    <LinkButton onClick={this.logout}>
                        退出登录
                    </LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{cur}</span>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Header)