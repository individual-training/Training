import React from 'react';
import { withRouter, Link, connect, history } from 'umi';
import { Breadcrumb, Layout, Row, Col, Modal } from 'antd';
import { LogoutOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import breadConfig from '@/config/breadCrumb.js';
import styles from './index.less';
import './style.css';

const { Header, Content } = Layout;
const { confirm } = Modal;

@connect(({ global }) => ({ global }))
@withRouter
export default class appLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showImg: true,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'global/Init',
    });
    setTimeout(() => {
      this.setState({
        showImg: false,
      });
    }, 2 * 1000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      global: { userInfo },
      location: { pathname },
    } = this.props;
    if (userInfo.userType === 1 && pathname !== '/account') {
      history.push('/account');
      return;
    }
  }

  logout = () => {
    const that = this;
    confirm({
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

  getBreadcrumb = () => {
    const {
      location: { pathname },
      global: { userInfo },
    } = this.props;
    const locArr = pathname.split('/');
    locArr.shift();
    if (locArr.length > 0) {
      return (
        <Breadcrumb separator=">">
          {userInfo.userType === 0 && (
            <Breadcrumb.Item>
              <Link to={'/'}>首页</Link>
            </Breadcrumb.Item>
          )}
          {locArr.map(item => {
            return breadConfig[item] ? (
              <Breadcrumb.Item>
                <Link to={breadConfig[item].link}>
                  {breadConfig[item].title}
                </Link>
              </Breadcrumb.Item>
            ) : (
              ''
            );
          })}
        </Breadcrumb>
      );
    }
  };
  toIndex = () => {
    history.push('/');
  };

  render() {
    const {
      children,
      location: { pathname },
      global,
    } = this.props;
    const { userInfo } = global;
    if (this.state.showImg && pathname == '/') {
      return (
        <div className={styles.indexImgContainer}>
          <img
            className={'hide'}
            src={require('../static/images/indexImg.jpg')}
            alt=""
          />
        </div>
      );
    }
    if (pathname === '/' || pathname === '/login') {
      return children;
    }

    return (
      <div className={`${styles.index}`}>
        <Layout className={styles.layout}>
          <Header className={styles.header}>
            <Row>
              <Col
                span={6}
                offset={2}
                style={{ textAlign: 'left', cursor: 'pointer' }}
                onClick={this.toIndex}
              >
                <img
                  className={styles.headerImg}
                  src={require('../static/images/junHui.png')}
                  alt=""
                />
                <span className={styles.headerTitle}>单兵综合体能训练系统</span>
              </Col>
              <Col span={4} offset={6}>
                <UserOutlined />
                <span style={{ marginLeft: 20 }}>{userInfo.department}</span>
              </Col>
              <Col span={3}>
                <span style={{ fontSize: 14, cursor: 'pointer' }}>
                  <LogoutOutlined style={{ color: 'red' }} />
                  <span style={{ marginLeft: 6 }} onClick={this.logout}>
                    退出
                  </span>
                </span>
              </Col>
            </Row>
          </Header>
          <Content>
            <Row style={{ height: '100%', marginTop: 0 }}>
              <Col offset={2} span={20} className={styles.content}>
                <div className={styles.bread}>{this.getBreadcrumb()}</div>
                <div className={styles.children}>{children}</div>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}
