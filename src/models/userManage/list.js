import { getUserManageList, searchUserManageList } from '../../services';

export default  {
  namespace: 'userManageList',

  state: {
    loading:false,
    listInfo:{},
    searchName:'',
    searchDept:'',
    pagination:{
      pageSize:6
    }
  },

  effects: {
    *GetList({ payload, cbk }, { put, call }) {
      yield put({type:'setLoading',payload:true});
      const result = yield call(getUserManageList);
      yield put({type:'setLoading',payload:false});
      if(result){
        yield put({type:'setList',payload:result})
      }
    },
    *SearchList({payload, cbk }, { select, call, put}){
      yield put({type:'setLoading',payload:true});
      const { searchName,searchDept } = yield select((state)=>{
        return state.userManageList
      })
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
    },
    setSearchName(state,{payload}){
      return {
        ...state,
        searchName:payload
      }
    },
    setSearchDept(state, { payload }) {
      return {
        ...state,
        searchDept:payload
      }
    }
  }
};
