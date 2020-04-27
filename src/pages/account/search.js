import React from 'react';
import moment from 'moment';
import { connect } from 'umi';
import { Modal, Button, Form, DatePicker } from 'antd';
import { formItemLayoutSmall } from '@/config/form';
import styles from './index.less';

@connect(({ account }) => ({ account }))
export default class SearchComp extends React.Component {
  state = {
    date: undefined,
  };

  handleCancel = () => {
    this.props.dispatch({
      type: 'account/setVisible',
      payload: false,
    });
  };

  selectDate = val => {
    const date = val.format('YYYY-MM-DD');
    this.setState({
      date,
    });
  };

  setSearch = () => {
    const { date } = this.state;
    this.props.dispatch({
      type: 'account/SetSearch',
      payload: date,
    });
  };

  export = () => {
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'deptExport/Export',
          payload: {
            date: values.start.format('YYYY-MM-DD'),
          },
        });
      }
    });
  };
  render() {
    const {
      account: { searchVisible },
    } = this.props;
    const { date } = this.state;
    return (
      <Modal
        destroyOnClose={true}
        width={500}
        title="查询"
        visible={searchVisible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div style={{ height: '100%', padding: '20px 0px' }}>
          <Form {...formItemLayoutSmall}>
            <Form.Item name="username" label="日期">
              <DatePicker
                style={{ width: 200 }}
                placeholder="起始日期"
                onChange={this.selectDate}
                value={moment(date)}
              />
            </Form.Item>
          </Form>
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Button
            className={`${styles.formBtn} ${styles.greenBtn}`}
            onClick={this.setSearch}
          >
            确定
          </Button>
        </div>
      </Modal>
    );
  }
}
