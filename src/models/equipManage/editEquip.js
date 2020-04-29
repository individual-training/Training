import { addEquip, editEquip, delEquip } from '@/services';

export default {
  namespace: 'editEquip',

  state: {
    visible: false,
    btnLoading: false,
    data: {},
    dataStringify: '',
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *Create({ payload }, { call, put }) {
      yield put({ type: 'setVisible', payload: true });
      yield put({ type: 'setType', payload: 'create' });
    },
    *AddEquip({ payload }, { call, put }) {
      yield put({ type: 'setBtnLoading', payload: true });
      const result = yield call(addEquip, payload);
      yield put({ type: 'setBtnLoading', payload: false });
      if (result) {
        yield put({ type: 'setVisible', payload: false });
        yield put({ type: 'equipManageList/GetList' });
        yield put({ type: 'reset' });
      }
    },
    *Edit({ payload }, { call, put }) {
      yield put({ type: 'setEquip', payload: payload });
      yield put({ type: 'setEquipStr', payload: payload });
      yield put({ type: 'setType', payload: 'edit' });
      yield put({ type: 'setVisible', payload: true });
    },
    *EditEquip({ payload }, { call, put }) {
      yield put({ type: 'setBtnLoading', payload: true });
      const result = yield call(editEquip, { eq_id: payload.id, ...payload });
      yield put({ type: 'setBtnLoading', payload: false });
      if (result) {
        yield put({ type: 'setVisible', payload: false });
        yield put({ type: 'equipManageList/GetList' });
        yield put({ type: 'reset' });
      }
    },
    *DelEquip({ payload }, { call, put }) {
      const result = yield call(delEquip, { eq_id: payload.id });
      if (result) {
        yield put({ type: 'equipManageList/GetList' });
      }
    },
    *Close({ payload }, { call, put }) {
      yield put({ type: 'setVisible', payload: false });
      yield put({ type: 'reset', payload: false });
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
    setType(state, { payload }) {
      return {
        ...state,
        type: payload,
      };
    },
    setEquip(state, { payload }) {
      return {
        ...state,
        data: payload,
      };
    },
    setEquipStr(state, { payload }) {
      return {
        ...state,
        dataStringify: JSON.stringify(payload),
      };
    },
    reset(state) {
      return {
        ...state,
        data: {},
        dataStringify: '',
      };
    },
  },
};
