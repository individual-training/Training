import { createDept } from '@/services';

export default {
  namespace: 'deptEdit',

  state: {
    visible: false,
    btnLoading: false,
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *Create({ payload }, { select, call, put }) {
      const { departmentId } = yield select((state) => (state.department))
      yield put({ type: 'setBtnLoading', payload:true });
      const result = yield call(createDept,payload);
      if(result){
        yield put({type:'department/GetDeptList',payload:{departmentId}})
        yield put({ type: 'setVisible', payload:false });
        yield put({type:'global/GetUserDeptDic'});
      }
      yield put({ type: 'setBtnLoading', payload:false });

    },
  },
  reducers: {
    setVisible(state, { payload }) {
      return {
        ...state,
        visible: payload,
      };
    },
    setBtnLoading(state, { payload }) {
      return {
        ...state,
        btnLoading: payload,
      };
    },
  },
};
