import React, { Component } from "react"
import { withRouter } from 'react-router-dom';
import { Card, Table, Button, message, Modal } from 'antd'

import LinkButton from '../../components/link-button';
import { reqUsers, reqAddOrUpdateUser, reqDeleteUser } from '../../api';
import UserForm from './user-form';
import { PAGE_SIZE } from "../../utils/constants";
import { formateDate } from "../../utils/dateUtils";

class User extends Component{

    state = {
        users: [], 
        user: {},
        showStatus: 0,
    };

    constructor(props) {
        super(props);
        this.us = React.createRef();
    };

    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: '电话',
                dataIndex: 'phone'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: formateDate
            },
            {
                title: '操作',
                dataIndex: '',
                width: 200,

                render: (user) => (
                    <span>
                        <LinkButton onClick={() => this.showUpdate(user)}>
                            修改
                        </LinkButton>
                        {" "}
                        <LinkButton onClick={() => this.deleteUser(user)}>
                            删除
                        </LinkButton>
                    </span>
                )
            },

        ]
    };

    getUsers = async () => {
        const result = await reqUsers()
        if (result.status === 0){
            const { users } = result.data;
            this.setState({ users });
        }
    };

    deleteUser = (user) => {
        Modal.confirm({
            title: '确认删除'+ user.username +'吗?',
      
            onOk: async () => {
                const result = await reqDeleteUser(user._id);
                if (result.status === 0) {
                    message.success('删除用户成功!');
                    this.getUsers();
                } 
                else {
                    message.error('删除用户失败!');
                }
            },
        });
    };

    addOrUpdateuser = async () => {
        let user = this.us.current.addOrUpdateUser();
        user.create_time = Date.now();
        if (this.state.user._id) {
            user._id = this.state.user._id;
        }
    
        const result = await reqAddOrUpdateUser(user);
        if (result.status === 0) {
            message.success(`${this.state.user._id?'修改':'添加'}角色成功`);
            this.getUsers();
            this.setState({ showStatus: 0 });
        } 
        else {
            message.error(`${this.state.user._id?'修改':'添加'}角色失败`);
        }
    };

    showUpdate = (user) => {
        this.setState({ showStatus: 1,user:user });
    };
      
    UNSAFE_componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {
        this.getUsers();
    }

    handleCancel = () => {
        this.setState({ showStatus: 0 });
    };

    render(){
        const { users, showStatus } = this.state;

        const title = (
            <Button
                type='primary'
                onClick={() => {
                    this.setState({ showStatus: 1, user: {} });
                }}
            >
                添加用户
            </Button>
        );

        return(
            <div>
                <Card title={title}>
                    <Table
                        rowKey="_id"
                        pagination={{
                            pageSize: PAGE_SIZE,
                        }}
                        dataSource={users}
                        columns={this.columns}
                        bordered
                    />
                    <Modal
                        title={this.state.user._id ? "修改用户" : "添加用户"}
                        visible={showStatus === 1}
                        onOk={this.addOrUpdateuser}
                        onCancel={this.handleCancel}
                        destroyOnClose={true}
                    >
                        <UserForm ref={this.us} user={this.state.user} />
                    </Modal>
                </Card>
            </div>
        )
    }
}

export default withRouter(User);