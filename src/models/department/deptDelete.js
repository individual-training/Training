import { delDept } from '@/services';

export default {
  namespace: 'deptDelete',

  state: {
    visible: false,
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *Delete({ payload }, { select, call, put }) {
      const { departmentId } = yield select((state) => (state.department))
      const result = yield call(delDept,payload);
      if(result){
        yield put({type:'department/GetDeptList',payload:{departmentId}})
        yield put({ type: 'setVisible', payload:false });
        yield put({type:'global/GetUserDeptDic'});
      }
    },
  },
  reducers: {
    setVisible(state, { payload }) {
      return {
        ...state,
        visible: payload,
      };
    },
  },
};
