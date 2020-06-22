import React from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
    };
  }
  componentDidMount() {
    if (this.props.fileList) {
      this.setState({
        fileList: [
          {
            url: this.props.fileList,
            uid: '-1',
            name: 'head_img',
            status: 'done',
          },
        ],
      });
    }
  }

  handleCancel = () => {
    this.setState({ previewVisible: false });
  };

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  beforeUpload = file => {
    const { imgType, dispatch, onChange } = this.props;
    var formData = new FormData();
    formData.append('image_name', file);
    formData.append('img_type', imgType);
    dispatch({
      type: 'global/UploadImg',
      payload: formData,
      success: result => {
        onChange(result.img_url);
      },
    });
    return false;
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };
  render() {
    const {
      previewVisible,
      previewImage,
      fileList,
      previewTitle,
      ...other
    } = this.state;
    const { action = '/api/pushimage' } = this.props;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          action={action}
          fileList={fileList}
          beforeUpload={this.beforeUpload}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          {...other}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
