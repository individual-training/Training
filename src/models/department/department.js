import { getDeptList } from '@/services'

export default {
  namespace: 'department',

  state: {
    name: '',
    loading:false,
    departmentId:'',
    partId:'1',
    data:{},
    pagination:{
      pageSize:8
    }
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *GetDeptList({ payload }, { select, call, put }) {
        yield put({type:'setLoading',payload:true});
        const { departmentId, partId } = yield select(state=>(state.department));
        const result = yield call(getDeptList,{departmentId:departmentId,part_id:partId});
        yield put({type:'setData',payload:result});
        yield put({type:'setLoading',payload:false});
      },
    *SetPart({ payload }, { put }) {
      yield put({type:'setPartId',payload:payload.partId});
      yield put({type:'GetDeptList',payload})
    },
    *SetDeptId({ payload }, { put }) {
      yield put({type:'setDeptId',payload:payload});
      yield put({type:'GetDeptList',payload})
    },
  },

  reducers: {
    setLoading(state,{payload}){
      return {
        ...state,
        loading:payload
      }
    },
    setDeptId(state,{payload}){
      return{
        ...state,
        departmentId:payload
      }
    },
    setPartId(state,{payload}){
      return{
        ...state,
        partId:payload
      }
    },
    setData(state,{payload}){
      return {
        ...state,
        data:payload || {}
      }
    }
  }
};

