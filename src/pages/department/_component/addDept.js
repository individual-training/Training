import React from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input } from 'antd';
import { formItemLayoutSmall, formRules } from '@/config/form';
import styles from '../index.less';

@connect(({ deptEdit }) => ({ deptEdit }))
@Form.create()
export default class AddDeptComp extends React.Component {
  state = {};

  handleCancel = () => {
    this.props.dispatch({
      type: 'deptEdit/setVisible',
      payload: false,
    });
  };

  reset = () => {
    this.props.form.resetFields();
  };

  submit = () => {
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'deptEdit/Create',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      deptEdit: { visible, btnLoading },
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Modal
        destroyOnClose={true}
        width={680}
        title="添加部门"
        visible={visible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div style={{ height: '100%', padding: '20px 0px' }}>
          <Form {...formItemLayoutSmall}>
            <Form.Item label="部门名称" key={'department'}>
              {getFieldDecorator('department', {
                rules: [formRules.required()],
              })(<Input style={{ width: 320 }} />)}
            </Form.Item>
            <Form.Item label="用户名" key={'username'}>
              {getFieldDecorator('username', {
                rules: [formRules.required()],
              })(<Input style={{ width: 320 }} />)}
            </Form.Item>
            <Form.Item label="密码" key={'password'}>
              {getFieldDecorator('password', {
                rules: [formRules.required()],
              })(<Input style={{ width: 320 }} />)}
            </Form.Item>
            <Form.Item label="负责人姓名" key={'uname'}>
              {getFieldDecorator('uname', {
                rules: [formRules.required()],
              })(<Input style={{ width: 320 }} />)}
            </Form.Item>
            <Form.Item label="年龄" key={'age'}>
              {getFieldDecorator('age', {
                rules: [formRules.required()],
              })(<Input style={{ width: 320 }} />)}
            </Form.Item>
            <Form.Item label="证件编号" key={'carid'}>
              {getFieldDecorator('carid', {
                rules: [formRules.required()],
              })(<Input style={{ width: 320 }} />)}
            </Form.Item>
            <Form.Item label="部门描述" key={'desc'}>
              {getFieldDecorator('desc', {
                rules: [formRules.required()],
              })(<Input style={{ width: 320 }} />)}
            </Form.Item>
          </Form>
        </div>
        <div style={{ padding: '10px 120px' }} className={styles.flexAround}>
          <Button
            className={`${styles.width110} ${styles.greyBtn}`}
            onClick={this.reset}
          >
            重置
          </Button>
          <Button
            className={`${styles.width110} ${styles.greenBtn}`}
            onClick={this.submit}
            loading={btnLoading}
          >
            确定
          </Button>
        </div>
      </Modal>
    );
  }
}
