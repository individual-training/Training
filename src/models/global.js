import { uploadImg,getUserDeptDic, getUserInfo  } from '../services';
import { objToArr } from '@/utils/util'

export default  {
  namespace: 'global',

  state: {
    userInfo:{},
    childDept:[],
  },

  effects: {
    *Init({payload},{ call, put }){
      yield put({type:'GetUserDeptDic',payload});
      yield put({type:'GetUserInfo',payload})
    },
    *GetUserDeptDic({payload},{call,put}){
      const deptDics = yield call(getUserDeptDic);
      if(deptDics){
        yield put({type:'setChildDept',payload:objToArr(deptDics)})
      }
    },
    *GetUserInfo({payload},{call,put}){
      const result = yield call(getUserInfo);
      if(result){
        yield put({type:'setUserInfo',payload:{username:result.user,userId:result.userId}})
      }
    },
    *UploadImg({payload, success},{ call }){
      const result = yield call(uploadImg,payload);
      if(result){
        success && success(result);
      }
    },

  },
  reducers: {
    setUserInfo(state,{payload}){
      return {
        ...state,
        userInfo:payload || {}
      }
    },
    setChildDept(state,{payload}){
      return {
        ...state,
        childDept:payload
      }
    }
  }
};

