import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'

const Item = Form.Item

export default class UpdateForm extends Component {
    static propTypes = {
        category:PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    }

    render() {
        const { category } = this.props

        return (
            <Form >
                <Item   
                    name="categoryname"   
                    initialValue={category ? category : ''} 
                    rules={[{ required: true, message: "名称必须输入!" }]}>
                    <Input     
                        placeholder='请输入名称'  
                        ref={input =>this.props.setForm(input)}>
                    </Input>
                </Item>
            </Form>
        )
    }
}