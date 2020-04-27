import React from 'react';
import { connect, withRouter } from 'umi';
import { Layout, Button, Table, Menu, Popover } from 'antd';
import { Ellipsis } from '@/components';
import {
  ExportComp,
  NoteComp,
  AddDeptComp,
  DelDeptComp,
  Detail,
} from './_component';
import { objToArr } from '@/utils/util';
import styles from './index.less';

const { Header, Sider, Content } = Layout;

@connect(({ department, global }) => ({ department, global }))
@withRouter
export default class Department extends React.Component {
  state = {};

  componentDidMount() {
    const {
      location: {
        query: { departmentId },
      },
      dispatch,
      global,
    } = this.props;
    const deptId =
      departmentId || (global.childDept[0] && global.childDept[0][1]);
    dispatch({
      type: 'department/SetDeptId',
      payload: deptId,
    });
  }

  setPart = partId => {
    this.props.dispatch({
      type: 'department/SetPart',
      payload: {
        partId,
      },
    });
  };

  onExport = () => {
    this.props.dispatch({
      type: 'deptExport/setVisible',
      payload: true,
    });
  };
  onNote = record => {
    this.props.dispatch({
      type: 'deptNote/setVisible',
      payload: {
        visible: true,
        data: record,
      },
    });
  };
  addDept = () => {
    this.props.dispatch({
      type: 'deptEdit/setVisible',
      payload: true,
    });
  };

  showDetail = (data, record) => {
    this.props.dispatch({
      type: 'deptDetail/ShowDetail',
      payload: {
        record: record,
        date: data.date,
      },
    });
  };

  delDept = () => {
    this.props.dispatch({
      type: 'deptDelete/setVisible',
      payload: true,
    });
  };
  selectMenu = val => {
    const key = val.key;
    this.props.dispatch({
      type: 'department/SetDeptId',
      payload: key,
    });
  };
  getMenu = (child, departmentId) => {
    const childItems = objToArr(child);
    return (
      <Menu
        className={styles.siderMenu}
        onClick={this.handleClick}
        selectedKeys={[`${departmentId}`]}
        defaultOpenKeys={['dept']}
        onSelect={this.selectMenu}
        mode="inline"
      >
        <Menu.SubMenu title={'下属部门'} key={'dept'}>
          {childItems.map(item => {
            return <Menu.Item key={item[1]}>{item[0]}</Menu.Item>;
          })}
        </Menu.SubMenu>
      </Menu>
    );
  };
  getColumns = () => {
    const {
      department: { data },
    } = this.props;
    let columns = [];
    if (data.column && Array.isArray(data.column)) {
      columns = [
        {
          title: '姓名',
          dataIndex: 'uname',
          key: 'uname',
          align: 'center',
        },
      ];
      columns = columns.concat(
        data.column.map(item => {
          return {
            title: item,
            dataIndex: item,
            key: item,
            align: 'center',
            render: (textObj = {}, record) => {
              if (
                Array.isArray(textObj.noteinfo) &&
                textObj.noteinfo.length > 0
              ) {
                const noteInfo = textObj.noteinfo[0];
                return (
                  <Popover
                    content={
                      <div>
                        <p>{noteInfo.info}</p>
                        <img
                          width={150}
                          height={120}
                          src={noteInfo.photo}
                          alt=""
                        />
                      </div>
                    }
                  >
                    <span style={{ color: 'pink' }}>
                      <Ellipsis
                        value={noteInfo.info}
                        max={8}
                        tooltip={false}
                      ></Ellipsis>
                    </span>
                  </Popover>
                );
              } else {
                return (
                  <a
                    onClick={() => this.showDetail(textObj, record)}
                  >{`成绩：${textObj.avg || '0'}`}</a>
                );
              }
            },
          };
        }),
      );
      columns.push({
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        render: (_, record) => {
          return <a onClick={() => this.onNote(record)}>备注</a>;
        },
      });
    }
    return columns;
  };
  getDataSource = () => {
    const {
      department: { data },
    } = this.props;
    return data.score;
  };
  render() {
    const {
      department: { data = {}, departmentId, partId, pagination, loading },
    } = this.props;
    const MenuItems = this.getMenu(data.child, departmentId);
    return (
      <React.Fragment>
        <Layout
          className={`${styles.department} ${styles.layout}`}
          theme={'light'}
        >
          <Sider width={150} theme={'light'}>
            <div className={styles.sider}>
              <div className={styles.siderName}>{MenuItems}</div>
              <div style={{ height: 100 }}>
                <Button
                  className={`${styles.fullWidth} ${styles.greenBtn}`}
                  style={{ margin: '10px 0px 7px' }}
                  onClick={this.addDept}
                >
                  添加部门
                </Button>
                <Button
                  className={`${styles.fullWidth} ${styles.greyBtn}`}
                  onClick={this.delDept}
                >
                  删除部门
                </Button>
              </div>
            </div>
          </Sider>
          <Layout>
            <Header className={styles.header}>
              <Button
                className={`${styles.width110} ${partId == 1 &&
                  styles.greenBtn}`}
                onClick={() => {
                  this.setPart(1);
                }}
              >
                上肢训练
              </Button>
              <Button
                className={`${styles.width110} ${partId == 2 &&
                  styles.greenBtn}`}
                onClick={() => {
                  this.setPart(2);
                }}
              >
                下肢训练
              </Button>
              <Button
                className={`${styles.width110} ${partId == 3 &&
                  styles.greenBtn}`}
                onClick={() => {
                  this.setPart(3);
                }}
              >
                腹部
              </Button>
              <Button
                style={{ cursor: 'pointer', float: 'right', marginTop: 17 }}
                className={styles.greenBtn}
                onClick={this.onExport}
              >
                成绩导出
              </Button>
            </Header>
            <Content style={{ padding: '15px 30px' }}>
              <Table
                dataSource={this.getDataSource()}
                columns={this.getColumns()}
                pagination={pagination}
                loading={loading}
              />
              {/*<div style={{marginTop:30}}>
                <a style={{display:'inline-block',marginRight:30, cursor:'pointer'}} onClick={this.onNote}>备注</a>
                <a style={{ cursor:'pointer'}} onClick={this.onExport}>成绩导出</a>
              </div>*/}
            </Content>
          </Layout>
        </Layout>
        <ExportComp></ExportComp>
        <NoteComp></NoteComp>
        <AddDeptComp></AddDeptComp>
        <DelDeptComp></DelDeptComp>
        <Detail></Detail>
      </React.Fragment>
    );
  }
}
