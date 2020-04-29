import React from 'react';
import { connect, history } from 'umi';
import { Button, Table, Row, Col, Input, Modal, Select } from 'antd';
import { delayChange } from '@/utils/util';
import { EditUser } from './_component';
import styles from './index.less';

@connect(({ userManageList, global }) => ({
  userManageList,
  childDept: global.childDept,
}))
export default class UserPage extends React.Component {
  state = {};

  componentDidMount() {
    this.props.dispatch({ type: 'userManageList/GetList' });
  }

  editUser = record => {
    this.props.dispatch({
      type: 'editUser/SetEditUser',
      payload: record,
    });
  };

  deleteUser = record => {
    Modal.confirm({
      content: '是否要删除当前用户？',
      onOk: () => {
        this.props.dispatch({
          type: 'editUser/Delete',
          payload: record,
        });
      },
      okText: '确认',
      cancelText: '取消',
    });
  };

  toAddUser = () => {
    history.push('/userManage/addUser');
  };

  nameChange = e => {
    const value = e.target.value;
    this.props.dispatch({
      type: 'userManageList/setSearchName',
      payload: value,
    });
  };

  deptChange = value => {
    this.props.dispatch({
      type: 'userManageList/setSearchDept',
      payload: value,
    });
  };

  search = () => {
    const { searchName, searchDept } = this.props.userManageList;
    this.props.dispatch({
      type: 'userManageList/SearchList',
      payload: {
        searchName,
        searchDept,
      },
    });
  };

  getColumns = () => {
    return [
      {
        title: '人员姓名',
        dataIndex: 'uname',
        key: 'uname',
      },
      {
        title: '证件号',
        dataIndex: 'carid',
        key: 'carid',
      },
      {
        title: '部门名称',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: '操作',
        dataIndex: 'date5',
        key: 'date5',
        width: 240,
        align: 'center',
        render: (text, record) => {
          return (
            <div>
              <a
                className={styles.operate}
                onClick={() => {
                  this.editUser(record);
                }}
              >
                <img src={require('../../static/icon/edit.png')} alt="" />
                <span>编辑</span>
              </a>
              <a
                className={styles.operate}
                onClick={() => {
                  this.deleteUser(record);
                }}
              >
                <img src={require('../../static/icon/delete.png')} alt="" />
                <span>删除</span>
              </a>
            </div>
          );
        },
      },
    ];
  };
  getDataSource = () => {
    const { listInfo } = this.props.userManageList;
    return listInfo.person;
  };
  render() {
    const { userManageList, childDept } = this.props;
    const { loading, pagination, searchName, searchDept } = userManageList;
    return (
      <React.Fragment>
        <div className={styles.search}>
          <Row gutter={40}>
            <Col span={2} style={{ textAlign: 'right' }}>
              <span className={styles.title}>姓名</span>
            </Col>
            <Col span={5}>
              <Input
                placeholder={'请输入姓名'}
                onChange={this.nameChange}
                value={searchName}
              ></Input>
            </Col>
            <Col span={3} style={{ textAlign: 'right' }}>
              <span className={styles.title}>所属部门</span>
            </Col>
            <Col span={5}>
              <Select
                onChange={this.deptChange}
                style={{ width: '100%' }}
                value={searchDept}
              >
                <Select.Option value="">选择部门</Select.Option>
                {childDept.map(item => {
                  return (
                    <Select.Option value={item[1]}>{item[0]}</Select.Option>
                  );
                })}
              </Select>
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Button
                className={`${styles.width110} ${styles.greenBtn}`}
                onClick={this.search}
              >
                搜索
              </Button>
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
              <Button
                className={`${styles.width110} ${styles.greenBtn}`}
                onClick={this.toAddUser}
              >
                添加人员
              </Button>
            </Col>
          </Row>
        </div>
        <Table
          dataSource={this.getDataSource()}
          columns={this.getColumns()}
          loading={loading}
          pagination={pagination}
        />
        <EditUser></EditUser>
      </React.Fragment>
    );
  }
}
