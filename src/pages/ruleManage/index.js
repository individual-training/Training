import React from 'react';
import { connect } from 'umi';
import { Form, Input, Row, Col, Button } from 'antd';
import { formItemLayout } from '@/config/form';
import styles from './index.less';



@connect(({ruleManager})=>({ruleManager}))
export default class RuleManage extends React.Component{
  getAgeRule = () => {
    return (
      <Form {...formItemLayout} name="ageRule">
        <Row>
          <Col span={12}>
            <Form.Item
              label="年龄"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input.Group compact>
                <Input style={{ width: 120, textAlign: 'center' }} placeholder="" />
                <span className={styles.inputSplit}> ~ </span>
                <Input
                  className="site-input-right"
                  style={{
                    width: 120,
                    textAlign: 'center',
                  }}
                  placeholder=""
                />
              </Input.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="优秀"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input style={{width:280}} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="及格"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input style={{width:280}} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="良好"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input style={{width:280}} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
  getHeightRule = () => {
    return(
      <Form {...formItemLayout} name="heightRule" >
        <Row>
          <Col span={12}>
            <Form.Item
              label="身高"
              name="username"
            >
              <Input.Group compact>
                <Input style={{ width: 120, textAlign: 'center' }} placeholder="Minimum" />
                <span className={styles.inputSplit}> ~ </span>
                <Input
                  className="site-input-right"
                  style={{
                    width: 120,
                    textAlign: 'center',
                  }}
                  placeholder="Maximum"
                />
              </Input.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="体重"
              name="username"
            >
              <Input style={{ width: 120, textAlign: 'center' }} placeholder="Minimum" />
              <span className={styles.inputSplit}> ~ </span>
              <Input
                className="site-input-right"
                style={{
                  width: 120,
                  textAlign: 'center',
                }}
                placeholder="Maximum"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="优秀"
              name="username"
            >
              <Input style={{width:280}} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="良好"
              name="username"
            >
              <Input style={{width:280}} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              label="及格"
              name="username"
            >
              <Input style={{width:280}}/>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
  render(){
    const rules = this.getAgeRule();
    return (
      <div className={styles.container}>
        <Row className={styles.btnRow}>
          <Col span={16} offset={4}>
            <div className={styles.flexAround}>
              <Button className={`${styles.width130} ${styles.greenBtn}`}>根据年龄设置</Button>
              <Button className={`${styles.width130} ${styles.greenBtn}`}>根据身高设置</Button>
              <Button className={`${styles.width130} ${styles.greenBtn}`}>删除规则</Button>
            </div>
          </Col>
        </Row>
        <div>
          { rules }
        </div>
        <div className={styles.bottomBtns}>
          <Button className={`${styles.formBtn} ${styles.greyBtn}`}>重置</Button>
          <Button className={`${styles.formBtn} ${styles.greenBtn}`}>提交</Button>
        </div>
      </div>
    );
  }
}
