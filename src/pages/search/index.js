import React from 'react';
import { connect, history } from 'umi';
import { Row, Col, Input, Button, Select } from 'antd';
import { delayChange } from '@/utils/util';
import styles from './index.less';

@connect(({ global }) => ({ global }))
export default class SearchPage extends React.Component {
  state = {
    detpId: '',
    userCardId: '',
    userCheck: {},
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'global/GetUserDeptDic',
    });
  }

  selectChange = val => {
    this.setState({
      detpId: val,
    });
  };

  inputChange = val => {
    this.setState({
      userCardId: val,
    });
    delayChange(() => {
      this.props.dispatch({
        type: 'global/CheckCardId',
        payload: { id: val },
        success: result => {
          this.setState({
            userCheck: result,
          });
        },
      });
    });
  };
  onDetpSearch = e => {
    const { detpId } = this.state;
    history.push('/department?departmentId=' + detpId);
  };
  onUserSearch = () => {
    const { userCardId } = this.state;
    window.location.href = '/account?cardId=' + userCardId;
  };

  toIndex = () => {
    history.push('/');
  };
  render() {
    const { detpId, userCardId, userCheck = {} } = this.state;
    const {
      global: { childDept },
    } = this.props;
    return (
      <div className={styles.container}>
        <Row gutter={40}>
          <Col span={8} style={{ textAlign: 'right' }}>
            <span class={styles.title}>查询下属部门训练成绩</span>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Select
              placeholder="选择部门"
              allowClear
              style={{ width: 260 }}
              onChange={this.selectChange}
            >
              {childDept.map(item => {
                return <Select.Option key={item[1]}>{item[0]}</Select.Option>;
              })}
            </Select>
          </Col>
          <Col span={8}>
            <Button
              disabled={!detpId}
              className={`${styles.width110} ${styles.greenBtn}`}
              onClick={this.onDetpSearch}
            >
              查询
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: 30 }} gutter={40}>
          <Col span={8} style={{ textAlign: 'right' }}>
            <span className={styles.title}>查询个人训练成绩</span>
          </Col>
          <Col span={8} style={{ textAlign: 'center' }}>
            <Select
              showSearch
              style={{ width: 260 }}
              placeholder={'请输入证件id'}
              onSearch={this.inputChange}
              showArrow={false}
              filterOption={false}
            >
              {userCheck.uname && (
                <Select.Option key={userCheck.carid}>
                  {userCheck.uname}
                </Select.Option>
              )}
            </Select>
          </Col>
          <Col span={8}>
            <Button
              disabled={!userCheck.carid}
              className={`${styles.width110} ${styles.greenBtn}`}
              onClick={this.onUserSearch}
            >
              查询
            </Button>
          </Col>
        </Row>
        <div style={{ textAlign: 'center', marginTop: 160 }}>
          <Button className={styles.greenBtn} onClick={this.toIndex}>
            返回首页
          </Button>
        </div>
      </div>
    );
  }
}
