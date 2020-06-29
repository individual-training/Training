import React from 'react';
import { Link, connect } from 'umi';
import { Layout, Row, Col, Button, Dropdown, Menu, Modal } from 'antd';
import { IndexCard } from '@/components';
import { LogoutOutlined } from '@ant-design/icons';

import styles from './index.less';

const { Header, Content, Footer } = Layout;

@connect()
export default class Index extends React.Component {
  componentDidMount() {}

  logout = () => {
    const that = this;
    Modal.confirm({
      content: '是否要退出登录？',
      onOk() {
        that.props.dispatch({
          type: 'login/Logout',
          success: () => {
            window.location.href = '/login';
          },
        });
      },
      okText: '确认',
      cancelText: '取消',
    });
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/userManage">人员管理</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/equipManage">设备管理</Link>
        </Menu.Item>
        {/*<Menu.Item>
          <Link to="/account" >账户管理</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/ruleManage" >规则管理</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/videoManage" >视频管理</Link>
        </Menu.Item>*/}
      </Menu>
    );

    return (
      <div className={styles.index}>
        <Layout className={styles.indexLayout}>
          <Header className={styles.header}>
            <img
              className={styles.headerImg}
              src={require('../../static/images/junHui.png')}
              alt=""
            />
            <span>单兵综合体能训练系统</span>
          </Header>
          <Content className={styles.content}>
            <Row className={styles.row}>
              <Col span={12}>
                <IndexCard
                  mess={'人员管理'}
                  position={'right'}
                  to={'/userManage'}
                  image={'renYuanIndex.png'}
                ></IndexCard>
              </Col>
              <Col span={12}>
                <IndexCard
                  mess={'数据查询'}
                  to={'/search'}
                  image={'shuJuIndex.png'}
                ></IndexCard>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col span={12}>
                <IndexCard
                  mess={'单位数据'}
                  position={'right'}
                  to={'/department'}
                  image={'danWeiIndex.png'}
                ></IndexCard>
              </Col>
              <Col span={12}>
                {/*<IndexCard
                  mess={'设置'}
                  image={'sheZheIndex.png'}
                  extra={
                    <Dropdown overlay={menu}>
                      <Button style={{ width: 140 }}> 管理选择 </Button>
                    </Dropdown>
                  }
                ></IndexCard>*/}
                <IndexCard
                  mess={'设备管理'}
                  to={'/equipManage'}
                  image={'sheZheIndex.png'}
                ></IndexCard>
              </Col>
            </Row>
          </Content>
          <Footer className={styles.footer}>
            <span style={{ fontSize: 14, cursor: 'pointer' }}>
              <LogoutOutlined style={{ color: 'red' }} />
              <span style={{ marginLeft: 6 }} onClick={this.logout}>
                退出
              </span>
            </span>
          </Footer>
        </Layout>
      </div>
    );
  }
}
