import { deptExport } from '@/services'
export default  {
  namespace: 'deptExport',

  state: {
    visible:false
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *Export({ payload }, { select, call, put }) {
      const { departmentId } = yield select((state) => (state.department))
      const result = yield call(deptExport,{departmentId,date:payload.date})
      console.log('[ deptExport.js/effects/14 ] re >>', result);
    },
  },
  reducers: {
    setVisible(state,{payload}){
      return {
        ...state,
        visible:payload
      }
    }
  }
};

