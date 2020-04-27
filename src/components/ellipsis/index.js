import React, { Component } from 'react';
import { Tooltip } from 'antd';
import Pt from 'prop-types';

export default class Ellipsis extends Component {
  static propTypes = {
    /** 全信息内容 */
    value: Pt.string,

    /** 最长字节数 */
    max: Pt.number,
    tooltip: Pt.bool,
  }

  static defaultProps = {
    value: '',
    max: 16,
    tooltip:true
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  computeLine = (str) => {
    return str.replace(/[^\x00-\xff]/g, '01').length;
  };

  formatStr = (str, max) => {
    const valueLength = this.computeLine(str);
    const _max = Number.isInteger(max) ? max : 16;
    const showEllipsis = valueLength > _max;
    if (showEllipsis) {
      let i = 0;
      let subStr = '';
      str.split('').forEach(item => {
        if (i === _max || i > _max) return;
        if (item.match(/[^\x00-\xff]/ig)) {
          i += 2;
        } else {
          i += 1;
        }
        subStr += item;
      });
      return `${subStr}...`;
    }
    return str;
  }

  render() {
    const { value = '', max = 16, tooltip=true } = this.props;
    return (
      <React.Fragment>
        {
          tooltip ? (
            <Tooltip title={value}>
              <span>{this.formatStr(value, max)}</span>
            </Tooltip>
          ) : <span>{this.formatStr(value, max)}</span>
        }

      </React.Fragment>
    );
  }
}
