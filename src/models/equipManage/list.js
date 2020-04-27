import { getEquipmentList } from '../../services';

export default  {
  namespace: 'equipManageList',

  state: {
    loading:false,
    listInfo:[],
    pagination:{
      pageSize:5
    }
  },

  effects: {
    *GetList({ payload, cbk }, { put, call }) {
      yield put({type:'setLoading',payload:true});
      const result = yield call(getEquipmentList);
      yield put({type:'setLoading',payload:false});
      if(result){
        yield put({type:'setList',payload:result})
      }
    },
    *SearchList({payload, cbk }, { call, put}){
      const { searchName,searchDept } = payload;
      yield put({type:'setLoading',payload:true});
      const data = {uname:'', departmentId:'1'};
      if(searchName) data.uname = searchName;
      if(searchDept) data.departmentId = searchDept;
      const result = yield call(searchUserManageList,data);
      yield put({type:'setLoading',payload:false});
      if(result){
        yield put({type:'setList',payload:result})
      }
    },
    *Logout({ payload,cbk }, { put, call }) {
      localStorage.removeItem('userInfo')
    },
  },
  reducers: {
    setLoading(state,{payload}){
      return {
        ...state,
        loading:payload
      }
    },
    setList(state,{payload}){
      return {
        ...state,
        listInfo:payload
      }
    }
  }
};
