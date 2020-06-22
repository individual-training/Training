import React from 'react';
import { connect } from 'umi';
import { Modal, Button, Form, Input } from 'antd';
import { formItemLayoutSmall, formRules } from '@/config/form';
import styles from '../index.less';

@connect(({ editEquip }) => ({ editEquip }))
@Form.create({
  mapPropsToFields(props) {
    const { data } = props.editEquip;
    const fields = {};
    Object.keys(data).forEach(key => {
      fields[key] = Form.createFormField({
        value: `${data[key] === 0 ? 0 : data[key] || ''}`,
      });
    });
    return fields;
  },
  onValuesChange(props, changedValues, allValues) {
    const { data } = props.editEquip;
    props.dispatch({
      type: 'editEquip/setEquip',
      payload: { ...data, ...allValues },
    });
  },
})
export default class AddEquipComp extends React.Component {
  state = {};

  handleCancel = () => {
    this.props.form.resetFields();
    this.props.dispatch({ type: 'editEquip/setAreaVisible', payload: false });
  };

  submit = () => {
    const { form, dispatch, editEquip } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'editEquip/AddArea',
          payload: {
            id: editEquip.data.id,
            ...values,
          },
        });
      }
    });
  };

  render() {
    const { form, editEquip } = this.props;
    const { areaVisible } = editEquip;
    const { getFieldDecorator } = form;
    return (
      <Modal
        destroyOnClose={true}
        width={680}
        title={'添加区域'}
        visible={areaVisible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div style={{ height: '100%', padding: '20px 0px' }}>
          <Form {...formItemLayoutSmall}>
            <Form.Item label="区域名称" key="areaName">
              {getFieldDecorator('areaName', {
                rules: [formRules.required()],
              })(<Input style={{ width: 320 }} />)}
            </Form.Item>
            <Form.Item label="区域描述" key={'areaDesc'}>
              {getFieldDecorator('areaDesc', {
                rules: [formRules.required()],
              })(<Input style={{ width: 320 }} />)}
            </Form.Item>
          </Form>
        </div>
        <div style={{ padding: '10px 120px' }} className={styles.flexAround}>
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
