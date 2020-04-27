import React from 'react';
import { connect } from 'umi';
import moment from 'moment';
import { Modal, Button, Form, Input, DatePicker } from 'antd';
import { formItemLayoutSmall, formRules } from '@/config/form';
import { Uploader } from '@/components';
import styles from '../index.less';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

@connect(({ deptNote, department }) => ({
  deptNote,
  departmentId:department.departmentId
}))
@Form.create()
export default class NoteComp extends React.Component {
  state = {};

  handleCancel = () => {
    this.props.form.resetFields();
    this.props.dispatch({
      type: 'deptNote/setVisible',
      payload: {
        visible:false,
        data:{}
      },
    });
  };

  addNote = () => {
    const {form ,dispatch} = this.props;
    form.validateFields((err,values) => {
      if(!err){
        values.date = values.date.format('YYYY-MM-DD');
        dispatch({
          type:'deptNote/AddNote',
          payload:values
        })
      }
    })
  }

  render() {
    const {
      departmentId,
      deptNote: { visible, data },
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Modal
        destroyOnClose={true}
        width={600}
        title="备注"
        visible={visible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div style={{ height: '100%', padding: '20px 0px' }}>
          <Form {...formItemLayoutSmall}>
            <Form.Item
              key="id"
              style={{display:'none'}}
            >
              {getFieldDecorator('id', {initialValue: data.id})(<Input/>)}
            </Form.Item>
            <Form.Item
              key="id"
              style={{display:'none'}}
            >
              {getFieldDecorator('departmentId', {initialValue: departmentId})(<Input/>)}
            </Form.Item>
            <Form.Item
              key="username"
              label="人员姓名"
            >
              <Input style={{ width: 260 }} value={data.uname} disabled={true}/>
            </Form.Item>
            <Form.Item
              key="date"
              label="日期"
            >
              {getFieldDecorator('date', {
                rules: [formRules.required()],
                initialValue:moment()
              })(<DatePicker style={{ width: 260 }}/>)}
            </Form.Item>
            <Form.Item key={'content'} label="缺勤原因">
              {getFieldDecorator('content', {
                rules: [formRules.required()],
              })(<Input style={{ width: 260 }} />)}
            </Form.Item>
            <Form.Item key="upload" label="上传图片">
              {getFieldDecorator('imgUrl', {
                rules: [formRules.required()],
              })(<Uploader imgType={'note'}></Uploader>)}
            </Form.Item>
          </Form>
        </div>
        <div style={{ padding: '10px 60px' }} className={styles.flexAround}>
 {/*         <Button className={`${styles.width110} ${styles.greyBtn}`}>
            重置
          </Button>*/}
          <Button className={`${styles.width110} ${styles.greenBtn}`} onClick={this.addNote}>
            确定
          </Button>
        </div>
      </Modal>
    );
  }
}
