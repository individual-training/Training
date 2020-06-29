import React from 'react';
import { connect } from 'umi';
import { Modal } from 'antd';
import { Player, BigPlayButton } from 'video-react';

@connect(({ deptDetail }) => ({ deptDetail }))
export default class PlayerModal extends React.Component {
  state = {};
  player = null;

  handleCancel = () => {
    this.props.dispatch({
      type: 'deptDetail/setPlayerVisible',
      payload: false,
    });
  };

  render() {
    const { deptDetail } = this.props;
    console.log('[ playerModal.js/PlayerModal/20 ] de >>', deptDetail);
    return (
      <Modal
        destroyOnClose={true}
        width={860}
        title="查看视频"
        visible={deptDetail.playerVisible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div style={{ height: '100%' }}>
          <Player
            poster={require('../../../static/images/video2.jpg')}
            src={`${deptDetail.playerUrl}`}
            //src={'http://media.w3.org/2010/05/bunny/movie.mp4'}
            ref={player => {
              this.player = player;
            }}
          >
            <BigPlayButton position="center" />
          </Player>
        </div>
      </Modal>
    );
  }
}
