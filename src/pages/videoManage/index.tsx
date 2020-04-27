import React from 'react';
import { Button, Form, Input } from 'antd';
import { formItemLayout } from '@/config/form';
import styles from '@/pages/users/index.less';

export default class VideoManage extends React.Component{
  public render(){
    return(
      <div>
        <Form {...formItemLayout} name={'videoManage'}>
          <Form.Item
            label="视频名称"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            >
            <Input style={{width:280}}/>
          </Form.Item>
          <Form.Item
            label="训练部位"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input style={{width:280}}/>
          </Form.Item>
          <Form.Item
            label="上传视频文件"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input style={{width:280}}/>
          </Form.Item>
        </Form>
        <div className={styles.bottomBtns}>
          <Button className={`${styles.formBtn} ${styles.greyBtn}`}>重置</Button>
          <Button className={`${styles.formBtn} ${styles.greenBtn}`}>提交</Button>
        </div>
      </div>
    )
  }
}
