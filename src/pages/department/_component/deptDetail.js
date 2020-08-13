import React from 'react';
import { connect } from 'umi';
import { Modal, Table } from 'antd';
import PlayerModal from './playerModal';

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
    this.props.dispatch({
      type: 'deptDetail/GetScores',
      payload: {
        partId: filters.part[0],
      },
    });
  };
  showPlayer = record => {
    this.props.dispatch({
      type: 'deptDetail/setPlayerVisible',
      payload: {
        visible: true,
        url: record.recFile,
      },
    });
  };

  getColumns = () => {
    return [
      {
        title: '训练部位',
        dataIndex: 'part',
        key: 'part',
        align: 'center',
        width: 120,
        filterMultiple: false,
        defaultFilteredValue: ['1'],
        filters: [
          { text: '上肢', value: '1' },
          { text: '腹部', value: '2' },
          { text: '下肢', value: '3' },
        ],
      },
      {
        title: '训练科目',
        width: 140,
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
        dataIndex: 'create_date',
        key: 'create_date',
        align: 'center',
        width: 200,
      },
      {
        title: '时长',
        dataIndex: 'consuming',
        key: 'consuming',
        align: 'center',
        render: text => {
          return text + '分钟';
        },
      },
      {
        title: '视频',
        dataIndex: 'recFile',
        key: 'recFile',
        align: 'center',
        render: (_, record) => {
          return (
            <a
              onClick={() => {
                this.showPlayer(record);
              }}
            >
              查看视频
            </a>
          );
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
        width={960}
        title={
          <span>
            <span style={{ color: 'green', marginRight: 15 }}>
              {detailData.record.uname}
            </span>
            <span style={{ color: 'rgba(0,0,0,0.3)', marginRight: 15 }}>
              成绩详情
            </span>
          </span>
        }
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
        <PlayerModal></PlayerModal>
      </Modal>
    );
  }
}
