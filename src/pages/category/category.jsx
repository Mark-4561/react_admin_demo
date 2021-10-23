import React, { Component, useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Card, Table, Button, Form, message, Modal, Space } from 'antd'
import {
    PlusOutlined
} from '@ant-design/icons';

import LinkButton from '../../components/link-button';
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api';
import AddForm from './add';
import UpdateForm from './update';

class Category extends Component {
    state = {
        loading: false,
        categorys: [],
        subCategorys: [],
        showStatus: 0,
        parentId: "0",
        parentName: "",
    };

    initCategory = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                dataIndex: '',
                key: "action",
                width: 200,

                render: (category) => (
                    <span>
                        <LinkButton onClick={() => {
                            this.category = category;
                            this.setState({ showStatus: 2 });
                        }}>
                            修改
                        </LinkButton>
                        {" "}
                        {this.state.parentId === "0" ? (
                            <LinkButton
                                onClick={() => {
                                    this.showSubCategory(category);
                                }}
                            >
                                查看子分类
                            </LinkButton>
                        ) : null}
                    </span>
                )
            },

        ]
    };

    /* 異物获取一级或者耳机分类列表显示 */
    getCategorys = async () => {
        this.setState({ loading: true })

        const { parentId } = this.state;
        const result = await reqCategorys(parentId);

        this.setState({ loading: false });

        if (result.status === 0) {
            const categorys = result.data
            if (parentId === "0") {
                this.setState({ categorys });
            } 
            else {
                this.setState({ subCategorys: categorys });
            }
        }
        else
            message.error('失败')
    };

    /* 展现指定对象的子列表 */
    showSubCategory = (category) => { 
        this.setState({
            parentId: category._id,
            parentName: category.name,
        },
        () => {
            this.getCategorys();
        });
    };

    addCategory = async () => {
        this.setState({ showStatus: 0 });
        const parentId = this.classes.props.value;
        const categoryName = this.input.props.value;

        if(!categoryName){
            message.error('名称不能为空!')
            return
        }
        const result = await reqAddCategory(categoryName, parentId);
        if (result.status == 0) {
            this.getCategorys();
            message.success('添加成功')
        }
        else{
            message.error('添加失败')
        }
    };

    //修改后更新列表
    updateCategory = async () => {
        this.setState({ showStatus: 0 });

        const categoryId = this.category._id;
        const categoryName = this.form.state.value;
        if(!categoryName){
            message.error('名称不能为空!')
            return
        }
      
        const result = await reqUpdateCategory(categoryId, categoryName);
      
        if (result.status === 200) {
            this.getCategorys();
            message.success('修改成功')
        }
        else{
            message.error('修改失败')
        }
    };

    /* 准备数据 */
    componentWillMount() {
        this.initCategory();
    }

    componentDidMount() {
        this.getCategorys();
    }
  
    handleCancel = () => {
        this.setState({ showStatus: 0 });
    };

    render() {
        const { 
            categorys,
            subCategorys,
            showStatus,
            parentId,
            parentName, 
        } = this.state

        const category = this.category || {}

        const title = parentId === "0" ? ("一级分类列表") : 
        (
            <Space>
                <LinkButton
                    onClick={() => {
                    this.setState({
                        parentId: "0",
                        parentName: "",
                        subCategorys: [],
                    },
                    () => {
                        this.getCategorys();
                    });
                    }}
                >
                    一级分类列表
                </LinkButton>{" "}
                {parentName}
            </Space>
        );

        const extra = (
            <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={() => {
                    this.setState({ showStatus: 1 });
                }}
            >
                添加
            </Button>
        )

        return (
            <div>
                <Card title={title} extra={extra} style={{ marginTop: 0 }}>
                    <Table
                        dataSource={parentId === "0" ? categorys : subCategorys}
                        columns={this.columns}
                        bordered
                        rowKey='_id'
                        loading={this.state.loading}
                    />

                    <Modal
                        title="添加分类"
                        visible={showStatus === 1}
                        onOk={this.addCategory}
                        onCancel={this.handleCancel}
                        destroyOnClose={true}
                    >
                        <AddForm
                            categorys={categorys}
                            categoryName
                            setClasses={(classes) => {
                                this.classes = classes;
                            }}
                            setInput={(input) => {
                                this.input = input;
                            }}
                        />
                    </Modal>

                    <Modal
                        title="更新分类"
                        visible={showStatus === 2}
                        onOk={this.updateCategory}
                        onCancel={this.handleCancel}
                        destroyOnClose={true}
                    >
                        <UpdateForm
                            categoryName={category.name}
                            setForm={(form) => { this.form = form }}
                        />
                    </Modal>
                </Card>
            </div>
        )
    }

}

export default withRouter(Category);