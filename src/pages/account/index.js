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
  player = null;
  state = {
    paused: false,
  };

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
    this.player &&
      this.player.subscribeToStateChange(this.handleStateChange.bind(this));

    const that = this;
    window.onresize = function() {
      that.accountChart && that.accountChart.resize();
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      account: { data },
    } = this.props;
    this.initChart(data.history || []);
    this.player &&
      this.player.subscribeToStateChange(this.handleStateChange.bind(this));
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

  onMenuChange = val => {
    this.props.dispatch({
      type: 'account/setCourseId',
      payload: val.key,
    });
  };
  selectedItem = (val, videoName, partId) => {
    this.props.dispatch({
      type: 'account/setVideoUrl',
      payload: {
        url: val[0].Url,
        videoName: videoName,
        partId,
      },
    });
  };

  handleStateChange = state => {
    const { paused } = this.state;
    if (state.paused !== paused) {
      this.setState({
        paused: state.paused,
      });
    }
  };

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
        courseId,
        videoUrl,
        videoName,
      },
    } = this.props;
    const { paused } = this.state;
    const chartFlag = Array.isArray(history) && history.length > 0;
    const partImage = [null, 'shangzhi.png', 'fubu.png', 'xiazhi.png'][partId];
    return (
      <div className={styles.container}>
        <Row gutter={35} style={{ margin: 0 }}>
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
                  className={`${styles.item} ${
                    partId == 1 ? styles.active : false
                  }`}
                  key="sub1"
                  title={<span style={{ margin: '0px 15px' }}>上肢</span>}
                >
                  {learnData['上肢'] &&
                    Object.keys(learnData['上肢'].course).map(key => (
                      <Menu.Item
                        className={`${learnData['上肢'].course[key].courseId ==
                          courseId && styles.active}`}
                        key={learnData['上肢'].course[key].courseId}
                        onClick={() =>
                          this.selectedItem(
                            learnData['上肢'].course[key].video,
                            key,
                            1,
                          )
                        }
                      >
                        {key}
                      </Menu.Item>
                    ))}
                </SubMenu>
                <SubMenu
                  className={`${styles.item}  ${
                    partId == 2 ? styles.active : false
                  }`}
                  key="sub2"
                  title={<span style={{ margin: '0px 15px' }}>腹部</span>}
                >
                  {learnData['腹部'] &&
                    Object.keys(learnData['腹部'].course).map(key => (
                      <Menu.Item
                        className={`${learnData['腹部'].course[key].courseId ==
                          courseId && styles.active}`}
                        key={learnData['腹部'].course[key].courseId}
                        onClick={() =>
                          this.selectedItem(
                            learnData['腹部'].course[key].video,
                            key,
                            2,
                          )
                        }
                      >
                        {key}
                      </Menu.Item>
                    ))}
                </SubMenu>
                <SubMenu
                  className={`${styles.item}  ${
                    partId == 3 ? styles.active : false
                  }`}
                  key="sub4"
                  title={<span style={{ margin: '0px 15px' }}>下肢</span>}
                >
                  {learnData['下肢'] &&
                    Object.keys(learnData['下肢'].course).map(key => (
                      <Menu.Item
                        className={`${learnData['下肢'].course[key].courseId ==
                          courseId && styles.active}`}
                        key={learnData['下肢'].course[key].courseId}
                        onClick={() =>
                          this.selectedItem(
                            learnData['下肢'].course[key].video,
                            key,
                            3,
                          )
                        }
                      >
                        {key}
                      </Menu.Item>
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
                {paused && (
                  <div className={styles.videoName}>
                    <span>{videoName}</span>
                  </div>
                )}
                <div style={{ width: 800 }}>
                  <Player
                    poster={require('../../static/images/video2.jpg')}
                    src={videoUrl}
                    // src={'http://media.w3.org/2010/05/bunny/movie.mp4'}
                    ref={player => {
                      this.player = player;
                    }}
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
                      src={require(`@/static/images/${partImage}`)}
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
