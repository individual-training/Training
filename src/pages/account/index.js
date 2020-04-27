import React from 'react';
import moment from 'moment';
import { connect } from 'umi';
import echarts from 'echarts';
import { Row, Col, Button, Icon, Menu } from 'antd';
import { Player, BigPlayButton } from 'video-react';
import Search from './search';
import styles from './index.less';
import 'video-react/dist/video-react.css';

const { SubMenu } = Menu;
@connect(({ account }) => ({ account }))
export default class Account extends React.Component {
  accountChart = null;

  componentDidMount() {
    const {
      location: {
        query: { cardId },
      },
      dispatch,
    } = this.props;
    dispatch({
      type: 'account/InAccount',
      payload: { cardId: cardId },
      success: data => {
        this.initChart(data.history || []);
      },
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      account: { data },
    } = this.props;
    this.initChart(data.history || []);
  }

  setDay = val => {
    this.props.dispatch({
      type: 'account/SetDay',
      payload: val,
    });
  };

  setPart = val => {
    this.props.dispatch({
      type: 'account/SetPart',
      payload: val,
    });
  };

  showSearch = () => {
    this.props.dispatch({
      type: 'account/setVisible',
      payload: true,
    });
  };

  learnHandle = () => {
    this.props.dispatch({
      type: 'account/SetLearn',
      payload: true,
    });
  };

  onMenuChange = (val) => {
    this.props.dispatch({
      type:'account/setCourseId',
      payload: val
    })
  }
  selectedItem = (val) => {
    console.log('[ index.js/Account/74 ] dddd >>', val);
  }

  initChart = data => {
    const chartNode = document.getElementById('accountCharts');
    if (chartNode) {
      this.accountChart = echarts.init(chartNode);
      this.accountChart.setOption({
        tooltip: {
          formatter: `{b0} : {c0} 个`,
        },
        xAxis: {
          data: data.map(item => moment(item.create_date).format('hh:mm:ss')),
        },
        yAxis: {
          axisLabel: {
            formatter: function(value) {
              return `${value}个`;
            },
          },
        },
        series: [
          {
            name: '销量',
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: '#5A8805',
                lineStyle: {
                  color: '#5A8805',
                  width: 1,
                },
              },
            },
            data: data.map(item => item.counts),
          },
        ],
      });
    }
  };

  render() {
    const {
      account: {
        day,
        loading,
        learn,
        partId,
        data: { history },
        search,
        learnData,
        courseId
      },
    } = this.props;
    const chartFlag = Array.isArray(history) && history.length > 0;
    return (
      <div className={styles.container}>
        <Row gutter={35}>
          <Col span={4} offset={4}>
            <Button
              className={`${styles.width130} ${
                day == 1 ? styles.greenBtn : styles.greyBtn
              }`}
              onClick={() => this.setDay(1)}
            >
              日情况
            </Button>
          </Col>
          <Col span={4}>
            <Button
              className={`${styles.width130} ${
                day == 7 ? styles.greenBtn : styles.greyBtn
              }`}
              onClick={() => this.setDay(7)}
            >
              周情况
            </Button>
          </Col>
          <Col span={4}>
            <Button
              className={`${styles.width130} ${
                day == 30 ? styles.greenBtn : styles.greyBtn
              }`}
              onClick={() => this.setDay(30)}
            >
              月情况
            </Button>
          </Col>
          <Col span={4}>
            <Button
              className={`${styles.width130} ${
                search ? styles.greenBtn : styles.greyBtn
              }`}
              onClick={this.showSearch}
            >
              查询
            </Button>
          </Col>
          <Col span={4}>
            <Button
              className={`${styles.width130} ${
                learn ? styles.greenBtn : styles.greyBtn
              }`}
              onClick={this.learnHandle}
            >
              跟我学
            </Button>
          </Col>
        </Row>
        <Row style={{ marginTop: 30 }}>
          <Col span={2} style={{ textAlign: 'right' }}>
            {learn ? (
              <Menu
                className={styles.sider}
                mode="vertical"
                onClick={this.onMenuChange}
                theme={'dark'}
                selectedKeys={[courseId]}
              >
                <SubMenu
                  className={`${styles.item} ${styles.active}`}
                  key="sub1"
                  title={<span style={{ margin: '0px 15px' }}>上肢</span>}
                >
                  {learnData['上肢'] && Object.keys(learnData['上肢'].course).map(key => (
                      <Menu.Item
                        key={learnData['上肢'].course[key].video}
                        onClick={()=>(this.selectedItem(learnData['上肢'].course[key].video))}
                      >{key}</Menu.Item>
                    ))}
                </SubMenu>
                <SubMenu
                  className={styles.item}
                  key="sub2"
                  title={<span style={{ margin: '0px 15px' }}>腹部</span>}
                >
                  {learnData['腹部'] && Object.keys(learnData['腹部'].course).map(key => (
                    <Menu.Item
                      key={learnData['腹部'].course[key].courseId}
                      onClick={()=>(this.selectedItem(learnData['腹部'].course[key].video))}
                    >{key}</Menu.Item>
                  ))}
                </SubMenu>
                <SubMenu
                  className={styles.item}
                  key="sub4"
                  title={<span style={{ margin: '0px 15px' }}>下肢</span>}
                >
                  {learnData['下肢'] && Object.keys(learnData['下肢'].course).map(key => (
                    <Menu.Item
                      key={learnData['下肢'].course[key].courseId}
                      onClick={()=>(this.selectedItem(learnData['下肢'].course[key].video))}
                    >{key}</Menu.Item>
                  ))}
                </SubMenu>
              </Menu>
            ) : (
              <div className={styles.sider}>
                <div
                  className={`${styles.item} ${
                    partId == 1 ? styles.active : false
                  }`}
                  onClick={() => this.setPart(1)}
                >
                  上肢
                </div>
                <div
                  className={`${styles.item} ${
                    partId == 2 ? styles.active : false
                  }`}
                  onClick={() => this.setPart(2)}
                >
                  腹部
                </div>
                <div
                  className={`${styles.item} ${
                    partId == 3 ? styles.active : false
                  }`}
                  onClick={() => this.setPart(3)}
                >
                  下肢
                </div>
              </div>
            )}
          </Col>
          <Col span={22} style={{ textAlign: 'center' }}>
            {learn ? (
              <div className={styles.videoContent}>
                <div style={{ width: 640 }}>
                  <Player
                    poster="/assets/poster.png"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                  >
                    <BigPlayButton position="center" />
                  </Player>
                </div>
              </div>
            ) : (
              <div
                className={`${styles.content} ${
                  loading ? styles.loading : false
                }`}
              >
                <div className={styles.imgContent}>
                  <div className={styles.imgContainer}>
                    <img
                      className={styles.img}
                      src={require('@/static/images/body.png')}
                      alt=""
                    />
                    <div className={styles.note}></div>
                  </div>
                </div>
                <div className={styles.chartContent}>
                  {search && (
                    <div className={styles.searchDate}>起始日期：{search}</div>
                  )}
                  <div
                    id={'accountCharts'}
                    className={styles.chartContainer}
                  ></div>
                  {!chartFlag && (
                    <div className={styles.chartEmpty}>暂无数据</div>
                  )}
                </div>
                {loading && (
                  <div className={styles.loadingIcon}>
                    <Icon type="loading" />
                  </div>
                )}
              </div>
            )}
          </Col>
        </Row>
        <div className={styles.bottom}></div>
        <Search></Search>
      </div>
    );
  }
}
