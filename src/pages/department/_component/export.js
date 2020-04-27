import React from 'react';
import moment from 'moment';
import { connect } from 'umi';
import { Modal, Button, Form, DatePicker, Input } from 'antd';
import { formItemLayoutSmall, formRules } from '@/config/form';
import styles from '../index.less';

@connect(({ deptExport,department }) => ({
  deptExport,
  departmentId:department.departmentId
}))
@Form.create()
export default class ExportComp extends React.Component {
  state = {
    date: ''
  };

  handleCancel = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'deptExport/setVisible',
      payload: false,
    });
  };

  selectDate = (val) => {
    const date = val.format('YYYY-MM-DD');
    this.setState({
      date
    })
  }
  export = () => {
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type:'deptExport/Export',
          payload:{
            date: values.start.format('YYYY-MM-DD')
          }
        })
      }
    });
  };
  render() {
    const {
      deptExport: { visible },
      departmentId,
    } = this.props;
    const { date } = this.state;
    const href = `/api/exportexcel?departmentId=${departmentId}&date=2020-04-23`
    return (
      <Modal
        destroyOnClose={true}
        width={400}
        title="导出"
        visible={visible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div style={{ height: '100%', padding: '20px 0px' }}>
          <Form {...formItemLayoutSmall} >
            <Form.Item name="username" label="日期">
              <DatePicker style={{ width: 200 }} placeholder="起始日期" onChange={this.selectDate} value={date || moment()} />
            </Form.Item>
          </Form>
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button
            className={`${styles.formBtn} ${styles.greenBtn}`}
            onClick={this.handleCancel}
            href={href}
          >
            确定
          </Button>
        </div>
      </Modal>
    );
  }
}
