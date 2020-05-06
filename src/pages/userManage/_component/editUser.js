import React from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select, Row, Col } from 'antd';
import { userLayout, formRules } from '@/config/form';
import { Uploader } from '@/components';
import styles from '../index.less';

@connect(({ editUser }) => ({ editUser }))
@Form.create({
  mapPropsToFields(props) {
    const { data } = props.editUser;
    const fields = {};
    Object.keys(data).forEach(key => {
      fields[key] = Form.createFormField({
        value: `${data[key] === 0 ? 0 : data[key] || ''}`,
      });
    });
    return fields;
  },
  onValuesChange(props, changedValues, allValues) {
    const { data } = props.editUser;
    props.dispatch({
      type: 'editUser/setEditUser',
      payload: { ...data, ...allValues },
    });
  },
})
export default class EditUser extends React.Component {
  state = {};

  handleCancel = () => {
    this.props.dispatch({
      type: 'editUser/setVisible',
      payload: false,
    });
  };

  reset = () => {
    const {
      editUser: { dataStringify },
      dispatch,
    } = this.props;
    dispatch({
      type: 'editUser/setEditUser',
      payload: JSON.parse(dataStringify),
    });
  };

  submit = () => {
    this.props.form.validateFields((err, values) => {
      const { data } = this.props.editUser;
      if (!err) {
        this.props.dispatch({
          type: 'editUser/Edit',
          payload: { ...data, ...values },
        });
      }
    });
  };

  render() {
    const { editUser, form } = this.props;
    const { visible, data, btnLoading } = editUser;
    const { getFieldDecorator } = form;
    return (
      <Modal
        destroyOnClose={true}
        width={860}
        title="编辑"
        visible={visible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          style={{ padding: '0px 30px' }}
          initialValues={{ remember: true }}
          {...userLayout}
        >
          <Row>
            <Col span={12}>
              <Form.Item label="姓名" key="uname">
                {getFieldDecorator('uname', {
                  rules: [formRules.required()],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="所属部门" key="department">
                {getFieldDecorator('department', {
                  rules: [formRules.required()],
                })(
                  <Select placeholder="选择部门" allowClear disabled={true}>
                    <Select.Option value="">选择部门</Select.Option>
                    <Select.Option value="1">特战队</Select.Option>
                    <Select.Option value="2">特战队-1</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="证件编号" key="carid">
                {getFieldDecorator('carid', {
                  rules: [formRules.required()],
                })(<Input placeholder="" disabled={true} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="年龄" key="age">
                {getFieldDecorator('age', {
                  rules: [formRules.required(), formRules.range(0, 200)],
                })(<Input placeholder="" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="身高" key="height">
                {getFieldDecorator('height', {
                  rules: [formRules.required(), formRules.range(0, 500)],
                })(<Input placeholder="" addonAfter="cm" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="性别" key="sex">
                {getFieldDecorator('sex', {
                  rules: [formRules.required()],
                })(
                  <Select placeholder="选择性别" allowClear disabled={true}>
                    <Select.Option value="">选择性别</Select.Option>
                    <Select.Option value="1">女</Select.Option>
                    <Select.Option value="0">男</Select.Option>
                  </Select>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="体重" key="weight">
                {getFieldDecorator('weight', {
                  rules: [formRules.required(), formRules.range(0, 500)],
                })(<Input placeholder="" addonAfter="kg" max={500} min={0} />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="登录密码" key="password">
                {getFieldDecorator('password', {
                  rules: [formRules.required()],
                })(<Input type={'password'} placeholder="" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="上传照片" key="upload">
                {getFieldDecorator('head_img', {
                  valuePropName: 'fileList',
                  rules: [],
                })(<Uploader imgType={'head'}></Uploader>)}
              </Form.Item>
            </Col>
          </Row>
          <div className={styles.bottomBtns} style={{ margin: 40 }}>
            <Button
              className={`${styles.formBtn} ${styles.greyBtn}`}
              onClick={this.reset}
            >
              重置
            </Button>
            <Button
              className={`${styles.formBtn} ${styles.greenBtn}`}
              onClick={this.submit}
              loading={btnLoading}
            >
              提交
            </Button>
          </div>
        </Form>
      </Modal>
    );
  }
}
