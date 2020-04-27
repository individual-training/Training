import { connect, history } from 'umi';
import { Form, Input, Row, Col, Button, Select, DatePicker } from 'antd';
import moment from 'moment';
import { formItemLayout, formRules } from '@/config/form';
import { Uploader } from '@/components'
import styles from './index.less';
import React from 'react';

@connect(({editUser, global})=>({
  editUser,
  childDept: global.childDept
}))
@Form.create()
export default class User extends React.Component{

  submit = () => {
    const { form, dispatch } = this.props;
    form.validateFields((err,values) => {
      if(!err){
        values.birthday = values.birthday.format('YYYY-MM-DD');
        dispatch({
          type:'editUser/Create',
          payload:values,
          success:() => {
            history.push('/userManage')
          }
        })
      }
    })
  }

  reset = () => {
    const { form } = this.props;
    form.resetFields();
  }

  render(){
    const { form, editUser, childDept } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div className={styles.users}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          {...formItemLayout}
        >
          <Row>
            <Col span={12}>
              <Form.Item
                label="姓名"
                key="uname"
              >
                {
                  getFieldDecorator('uname', {
                    rules: [
                      formRules.required()
                    ],
                  })(
                    <Input placeholder=""/>                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="所属部门"
                key="department"
              >
                {
                  getFieldDecorator('department_id', {
                    rules: [
                      formRules.required()
                    ]
                  })(
                    <Select
                      placeholder='选择部门'
                      allowClear
                    >
                      <Select.Option value="">请选择部门</Select.Option>
                      {
                        childDept.map(item=>{
                          return  <Select.Option value={item[1]}>{item[0]}</Select.Option>
                        })
                      }
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label="证件编号"
                key="carid"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                {
                  getFieldDecorator('carid', {
                    rules: [
                      formRules.required()
                    ]
                  })(
                    <Input placeholder=""/>                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="出生日期"
                key="birthday"
              >
                {
                  getFieldDecorator('birthday', {
                    rules: [
                      formRules.required(),
                    ]
                  })(
                    <DatePicker showTime format="YYYY-MM-DD" style={{width:'100%'}} placeholder={'选择日期'}/>,
                   )
                }
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label="身高"
                key="height"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                {
                  getFieldDecorator('height', {
                    rules: [
                      formRules.required(),
                      formRules.range(0,500)
                    ]
                  })(
                    <Input placeholder=""/>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="性别"
                key="sex"
              >
                {
                  getFieldDecorator('sex', {
                    rules: [
                      formRules.required(),
                    ]
                  })(
                    <Select
                      placeholder='选择性别'
                      allowClear
                    >
                      <Select.Option value="">请选择性别</Select.Option>
                      <Select.Option value="0">女</Select.Option>
                      <Select.Option value="1">男</Select.Option>
                    </Select>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label="体重"
                key="weight"
              >
                {
                  getFieldDecorator('weight', {
                    rules: [
                      formRules.required(),
                      formRules.range(0,500)
                    ]
                  })(
                    <Input placeholder=""/>
                  )
                }
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="登录密码"
                key="password"
              >
                {
                  getFieldDecorator('password', {
                    rules: [
                      formRules.required(),
                    ]
                  })(
                    <Input placeholder=""/>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item
                label="上传照片"
                key="head_img"
              >
                {
                  getFieldDecorator('head_img', {
                    valuePropName: 'fileList',
                    rules: [
                      formRules.required(),
                    ]
                  })(
                    <Uploader></Uploader>
                  )
                }
              </Form.Item>
            </Col>
          </Row>
          <div className={styles.bottomBtns} style={{marginTop:40}}>
            <Button className={`${styles.formBtn} ${styles.greyBtn}`} onClick={this.reset}>重置</Button>
            <Button className={`${styles.formBtn} ${styles.greenBtn}`} onClick={this.submit} loading={editUser.btnLoading}>提交</Button>
          </div>
        </Form>
      </div>
    )
  }
}
