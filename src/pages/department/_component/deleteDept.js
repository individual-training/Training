import React from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input, Select } from 'antd';
import { formItemLayoutSmall, formRules } from '@/config/form';
import styles from '../index.less';

@connect(({ deptDelete, global }) => ({
  deptDelete,
  childDept: global.childDept,
}))
@Form.create()
export default class DelDeptComp extends React.Component {
  state = {};

  handleCancel = () => {
    this.props.dispatch({
      type: 'deptDelete/setVisible',
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
          type: 'deptDelete/Delete',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      deptDelete: { visible },
      childDept,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Modal
        width={560}
        title="删除部门"
        visible={visible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div style={{ height: '100%', padding: '20px 0px' }}>
          <Form {...formItemLayoutSmall}>
            <Form.Item key={'departmentId'} label="部门名称">
              {getFieldDecorator('departmentId', {
                rules: [formRules.required()],
              })(
                <Select style={{ width: 320 }}>
                  <Select.Option value="">选择部门</Select.Option>
                  {childDept.map(item => {
                    return (
                      <Select.Option value={item[1]}>{item[0]}</Select.Option>
                    );
                  })}
                </Select>,
              )}
            </Form.Item>
            <Form.Item key={'username'} label="账户号码">
              {getFieldDecorator('username', {
                rules: [formRules.required()],
              })(<Input style={{ width: 320 }} />)}
            </Form.Item>
            <Form.Item key="password" label="密码">
              {getFieldDecorator('password', {
                rules: [formRules.required()],
              })(<Input type="password" style={{ width: 320 }} />)}
            </Form.Item>
            <Form.Item key={'carid'} label="负责人证件号码">
              {getFieldDecorator('carid', {
                rules: [formRules.required()],
              })(<Input style={{ width: 320 }} />)}
            </Form.Item>
          </Form>
        </div>
        <div style={{ padding: '10px 60px' }} className={styles.flexAround}>
          <Button
            className={`${styles.width110} ${styles.greyBtn}`}
            onClick={this.reset}
          >
            重置
          </Button>
          <Button
            className={`${styles.width110} ${styles.greenBtn}`}
            onClick={this.submit}
          >
            确定
          </Button>
        </div>
      </Modal>
    );
  }
}
