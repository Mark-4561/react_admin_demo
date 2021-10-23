import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less'
import logo from '../../assets/images/logo.png'
import { reqLogin } from '../../api/index.js'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

const Item = Form.Item

export default class Login extends Component {

    onFinish = (values) => {
        const { username, password } = values
        const result = reqLogin(username, password)
        const promise = Promise.resolve(result)

        promise.then((value) => {
            if (value.status == 0) {
                message.success('登陆成功')
                const user = value.data
                memoryUtils.user = user
                storageUtils.saveUser(user)
                this.props.history.replace('/')
            }
            else {
                message.error('登陆失败', value.msg)
            }
        });
    };

    render() {

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React admin experiment</h1>
                </header>
                <section className="login-content">
                    <h2>登录</h2>
                    <Form
                        className="login-form"
                        onFinish={this.onFinish}
                    >
                        <Item
                            name="username"
                            rules={[
                                { required: true, message: '请输入用户名' },
                                { min: 3, message: '用户名应大于3个字符' },
                                { max: 20, message: '用户名应小于20个字符' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名应由字母数字或下划线组成' },
                            ]}
                            initialValue='admin'
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="用户名" />
                        </Item>
                        <Item
                            name="password"
                            rules={[
                                { required: true, message: '请输入密码' },
                                { min: 4, message: '密码应大于4位' },
                                { max: 20, message: '密码应小于20位' },
                                { pattern: /^[a-zA-Z0-9]+$/, message: '密码应由字母数字组成' }
                            ]}
                            initialValue='admin'
                        >
                            <Input
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="密码" />
                        </Item>
                        <Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                登录
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}