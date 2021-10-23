import React, { PureComponent } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const Item = Form.Item;

export default class UserForm extends PureComponent {
    static propTypes = { user: PropTypes.object };
  
    state = {};

    onValuesChange = (values) => {
        this.setState(values);
    };

    addOrUpdateUser = () => {
        const user = this.state;
        return user;
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 4 }, 
            wrapperCol: { span: 10 }, 
        };

        const user = this.props.user

        return (
        <Form {...formItemLayout} onValuesChange={this.onValuesChange}>
            <Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: "用户名必须输入!" }]}
                initialValue={user.username}
            >
                <Input placeholder="请输入用户名"/>
            </Item>

            {
                user._id ? null : <Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: "密码必须输入!" }]}
                    initialValue={user.password}
                >
                    <Input type="password" placeholder="请输入密码"/>
                </Item>
            }
            
            <Item
                label="手机号"
                name="phone"
                rules={[{ required: true, message: "手机号必须输入!" }]}
                initialValue={user.phone}
            >
                <Input placeholder="请输入手机号"/>
            </Item>

            <Item
                label="邮箱"
                name="email"
                rules={[{ required: true, message: "邮箱必须输入!" }]}
                initialValue={user.email}
            >
                <Input placeholder="请输入邮箱"/>
            </Item>
        </Form>
        );
    }
}