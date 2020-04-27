import { addNote } from '@/services'
export default  {
  namespace: 'deptNote',

  state: {
    visible:false,
    data:{},
    btnLoading:false,
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *AddNote({ payload }, { select, call, put }) {
      const { departmentId } = yield select((state) => (state.department))
      yield put({type:'setBtnLoading',payload:true});
      const result = yield call(addNote,payload);
      if(result){
        yield put({type:'department/GetDeptList',payload:{departmentId}})
        yield put({ type: 'setVisible', payload:false });
      }
      yield put({type:'setBtnLoading',payload:false})

    },
  },
  reducers: {
    setVisible(state,{payload}){
      return {
        ...state,
        visible: payload.visible,
        data: payload.data ||  {}
      }
    },
    setBtnLoading(state, { payload }) {
      return {
        ...state,
        btnLoading: payload,
      };
    },
  }
};

