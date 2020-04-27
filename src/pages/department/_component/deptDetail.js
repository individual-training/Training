import React from 'react';
import { connect } from 'umi';
import { Modal, Table } from 'antd';
import { formItemLayoutSmall, formRules } from '@/config/form';
import styles from '../index.less';

@connect(({ deptDetail }) => ({ deptDetail }))
export default class DeptDetail extends React.Component {
  state = {};

  handleCancel = () => {
    this.props.dispatch({
      type: 'deptDetail/setVisible',
      payload: false,
    });
  };

  tableChange = (pagination, filters) => {
    console.log('[ deptDetail.js/DeptDetail/19 ] file >>', filters);
    this.props.dispatch({
      type:'deptDetail/GetScores',
      payload:{
        partId: filters.part[0]
      }
    })
  }

  getColumns = () => {
    return [
      {
        title: '训练部位',
        dataIndex: 'part',
        key: 'part',
        align: 'center',
        filterMultiple:false,
        defaultFilteredValue:['1'],
        filters: [
          { text: '上肢', value: '1' },
          { text: '腹部', value: '2' },
          { text: '下肢', value: '3' }
        ]
      },
      {
        title: '训练科目',
        dataIndex: 'course',
        key: 'course',
        align: 'center',
      },
      {
        title: '分数',
        dataIndex: 'results',
        key: 'results',
        align: 'center',
      },
      {
        title: '结果',
        dataIndex: 'result',
        key: 'result',
        align: 'center',
      },
      {
        title: '次数',
        dataIndex: 'counts',
        key: 'counts',
        align: 'center',
        render: text => {
          return text + '次';
        },
      },
      {
        title: '时间',
        dataIndex: 'consuming',
        key: 'consuming',
        align: 'center',
        render: text => {
          return text + '分钟';
        },
      },
    ];
  };

  render() {
    const {
      deptDetail: { visible, score, loading, detailData },
    } = this.props;
    const columns = this.getColumns();
    return (
      <Modal
        destroyOnClose={true}
        width={680}
        title={<span>
          <span style={{color:'green',marginRight:15}}>{detailData.record.uname}</span>
          <span style={{color:'rgba(0,0,0,0.3)',marginRight:15}}>成绩详情</span>
        </span>}
        visible={visible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div>
          <Table
            loading={loading}
            columns={columns}
            dataSource={score}
            pagination={false}
            scroll={{ y: 400 }}
            onChange={this.tableChange}
          ></Table>
        </div>
      </Modal>
    );
  }
}
