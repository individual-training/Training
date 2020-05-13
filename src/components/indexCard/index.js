import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'umi';
import styles from './index.less';

const cx = classNames.bind(styles);
export default props => {
  const { position = 'left', image } = props;
  const maskCX = cx({
    mask: true,
    floatRight: position === 'right',
  });
  const imgUrl = image && require(`../../static/images/${image}`);
  return (
    <div className={styles.indexCard}>
      <div
        style={{
          height: '100%',
          backgroundImage: `url(${imgUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
        }}
      >
        <div className={maskCX}>
          <Link
            className={`${styles.cardMess} ${styles.floatRight}`}
            to={props.to}
          >
            {props.mess}
          </Link>
          <span className={styles.extra}>{props.extra}</span>
        </div>
      </div>
    </div>
  );
};
