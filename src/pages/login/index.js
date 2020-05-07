import React from 'react';
import { connect, history } from 'umi';
import { Form, Input, Button, Select } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Option } = Select;

@connect()
@Form.create()
export default class Login extends React.Component {
  state = {
    errMess: '',
  };
  loginHandle = () => {
    const { form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/Login',
          payload: values,
          success: data => {
            this.setState({
              errMess: '',
            });
            this.props.dispatch({
              type: 'global/Init',
            });
            values.usertype == 0 ? history.push('/') : history.push('/account');
          },
          failed: () => {
            this.setState({
              errMess: '登录失败,请核对用户名或密码是否正确',
            });
          },
        });
      }
    });
  };
  render() {
    const { errMess } = this.state;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.login}>
        <div className={styles.header}>
          <img
            className={styles.headerImg}
            src={require('../../static/images/junHui.png')}
            alt=""
          />
          <span>单兵综合体能训练系统</span>
        </div>
        <div className={styles.modal}>
          <div className={styles.modalImg}></div>
          <div className={styles.modalForm}>
            <div className={styles.title}>用户登录</div>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
            >
              <Form.Item
                key="usertype"
                rules={[
                  { required: true, message: 'Please input your Username!' },
                ]}
              >
                {getFieldDecorator('usertype', {
                  rules: [],
                  initialValue: '1',
                })(
                  <Select placeholder="账户类型" allowClear>
                    <Option value="0">单位</Option>
                    <Option value="1">个人</Option>
                  </Select>,
                )}
              </Form.Item>
              <Form.Item
                key="uname"
                rules={[{ required: true, message: '请输入账号' }]}
              >
                {getFieldDecorator('uname', {
                  rules: [],
                })(
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="请输入账号"
                  />,
                )}
              </Form.Item>
              <Form.Item
                key="password"
                rules={[{ required: true, message: '请输入密码' }]}
              >
                {getFieldDecorator('password', {
                  rules: [],
                })(
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="请输入密码"
                  />,
                )}
              </Form.Item>
            </Form>
            {errMess && <p style={{ color: 'red', fontSize: 12 }}>{errMess}</p>}
            <Button className={styles.loginBtn} onClick={this.loginHandle}>
              登录
            </Button>
            {/*<p className={styles.forgot}>忘记密码？</p>*/}
            <span className={styles.selectIcon}></span>
          </div>
        </div>
      </div>
    );
  }
}
