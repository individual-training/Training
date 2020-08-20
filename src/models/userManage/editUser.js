import { editUser, createUser, deleteUser } from '../../services';
export default {
  namespace: 'editUser',

  state: {
    visible: false,
    btnLoading: false,
    data: {},
    dataStringify: '',
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *SetEditUser({ payload }, { put }) {
      yield put({ type: 'setEditUser', payload });
      yield put({ type: 'setUserStr', payload });
      yield put({ type: 'setVisible', payload: true });
    },
    *Edit({ payload, cbk }, { select, call, put }) {
      yield put({ type: 'setBtnLoading', payload: true });
      const result = yield call(editUser, {
        personId: payload.id,
        ...payload,
        departmentId: payload.department,
      });
      yield put({ type: 'setBtnLoading', payload: false });
      if (result) {
        yield put({ type: 'setVisible', payload: false });
        yield put({ type: 'userManageList/GetList' });
      }
    },
    *Create({ payload, success }, { select, call, put }) {
      yield put({ type: 'setBtnLoading', payload: true });
      const result = yield call(createUser, payload);
      yield put({ type: 'setBtnLoading', payload: false });
      if (result) {
        success && success(result);
      }
    },
    *Delete({ payload, success }, { call, put }) {
      const result = yield call(deleteUser, { personId: payload.id });
      yield put({ type: 'userManageList/GetList' });
    },
  },
  reducers: {
    setVisible(state, { payload }) {
      return {
        ...state,
        visible: payload,
      };
    },
    setEditUser(state, { payload }) {
      return {
        ...state,
        data: { ...payload },
      };
    },
    setUserStr(state, { payload }) {
      return {
        ...state,
        dataStringify: JSON.stringify(payload),
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
