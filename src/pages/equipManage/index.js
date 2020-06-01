import React from 'react';
import { connect } from 'umi';
import { Button, Modal, Table } from 'antd';
import { AddEquip } from './_component';
import styles from './index.less';

@connect(({ equipManageList }) => ({ equipManageList }))
export default class Department extends React.Component {
  state = {};

  componentDidMount() {
    this.props.dispatch({ type: 'equipManageList/GetList' });
  }

  addEquip = () => {
    this.props.dispatch({
      type: 'editEquip/Create',
      payload: true,
    });
  };

  editEquip = record => {
    this.props.dispatch({
      type: 'editEquip/Edit',
      payload: record,
    });
  };
  initEquip = record => {
    this.props.dispatch({
      type: 'editEquip/InitEquip',
      payload: record,
    });
  };

  deleteEquip = record => {
    Modal.confirm({
      content: '是否要删除当前设备？',
      onOk: () => {
        this.props.dispatch({
          type: 'editEquip/DelEquip',
          payload: record,
        });
      },
      okText: '确认',
      cancelText: '取消',
    });
  };

  getColumns = () => {
    return [
      {
        title: '设备名称',
        dataIndex: 'eqname',
        key: 'eqname',
      },
      {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: 'IP',
        dataIndex: 'Ip',
        key: 'Ip',
      },
      {
        title: '序列号',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
      },
      {
        title: '操作',
        key: 'options',
        render: (_, record) => {
          return (
            <div>
              <a
                className={styles.operate}
                onClick={() => this.initEquip(record)}
              >
                <img src={require('../../static/icon/edit.png')} alt="" />
                <span>初始化</span>
              </a>
              <a
                className={styles.operate}
                onClick={() => this.editEquip(record)}
              >
                <img src={require('../../static/icon/edit.png')} alt="" />
                <span>编辑</span>
              </a>
              <a
                className={styles.operate}
                onClick={() => this.deleteEquip(record)}
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
    const { equipManageList } = this.props;
    return equipManageList.listInfo;
  };
  render() {
    const { equipManageList } = this.props;
    const { loading } = equipManageList;
    return (
      <React.Fragment>
        <Table
          dataSource={this.getDataSource()}
          columns={this.getColumns()}
          loading={loading}
        />
        <div className={styles.bottomBtns}>
          <Button
            className={`${styles.formBtn} ${styles.greenBtn}`}
            onClick={this.addEquip}
          >
            新建设备
          </Button>
        </div>
        <AddEquip></AddEquip>
      </React.Fragment>
    );
  }
}
