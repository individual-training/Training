import { login } from '../../services';
export default  {
  namespace: 'login',

  state: {
    loading:false
  },

  effects: {
    *Login({ payload,cbk }, { put, call }) {
      const result = yield call(login,payload);
      if(result){
        yield put({type:'global/setUserInfo',payload:result});
        localStorage.setItem('userInfo',result);
        cbk && cbk();
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
    }
  }
};

