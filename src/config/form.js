export const formItemLayout = {
  labelCol: {
    sm: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};

export const formItemLayoutSmall = {
  labelCol: {
    sm: { span: 7 },
  },
  wrapperCol: {
    sm: { span: 17 },
  },
};

export const userLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
};

export const formRules = {
  required: mess => ({
    required: true,
    message: mess || '不能为空',
  }),
  minLength: (len, mess) => ({
    min: len,
    message: mess || `输入长度不能少于${len}位`,
  }),
  maxLength: (len, mess) => ({
    min: len,
    message: mess || `输入长度不能多于${len}位`,
  }),

  range(min, max, mess) {
    return {
      validator: (rule, value, callback) => {
        if (Number(value) > max || Number(value) < min) {
          callback(mess || `输入值超出范围[${min},${max}]`);
        } else {
          callback();
        }
      },
    };
  },
};
export default {};
