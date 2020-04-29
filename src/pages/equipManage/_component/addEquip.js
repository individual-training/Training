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
    this.props.dispatch({ type: 'editEquip/Close' });
  };

  reset = () => {
    const {
      dispatch,
      editEquip: { dataStringify },
    } = this.props;
    dispatch({
      type: 'editEquip/setEquip',
      payload: JSON.parse(dataStringify),
    });
  };

  submit = () => {
    const { form, dispatch, editEquip } = this.props;
    const { data, type } = editEquip;
    const disType = type === 'create' ? 'AddEquip' : 'EditEquip';
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: `editEquip/${disType}`,
          payload: { ...data, ...values },
        });
      }
    });
  };

  render() {
    const { form, editEquip } = this.props;
    const { visible, type } = editEquip;
    const { getFieldDecorator } = form;
    return (
      <Modal
        destroyOnClose={true}
        width={680}
        title={editEquip.type === 'create' ? '添加设备' : '编辑设备'}
        visible={visible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div style={{ height: '100%', padding: '20px 0px' }}>
          <Form {...formItemLayoutSmall}>
            <Form.Item label="设备名称" key="eqname">
              {getFieldDecorator('eqname', {
                rules: [formRules.required()],
              })(<Input style={{ width: 320 }} />)}
            </Form.Item>
            <Form.Item label="设备描述" key={'desc'}>
              {getFieldDecorator('desc', {
                rules: [formRules.required()],
              })(<Input style={{ width: 320 }} />)}
            </Form.Item>
            <Form.Item label="设备IP" key={'Ip'}>
              {getFieldDecorator('Ip', {
                rules: [formRules.required()],
              })(<Input style={{ width: 320 }} />)}
            </Form.Item>
            <Form.Item label="设备序列号" key={'serialNumber'}>
              {getFieldDecorator('serialNumber', {
                rules: [formRules.required()],
              })(<Input style={{ width: 320 }} disabled={type === 'edit'} />)}
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
          >
            确定
          </Button>
        </div>
      </Modal>
    );
  }
}
