import { addEquip, editEquip, delEquip, initEquip, addArea } from '@/services';
import { message } from 'antd';

export default {
  namespace: 'editEquip',

  state: {
    visible: false,
    areaVisible: false,
    btnLoading: false,
    data: {},
    dataStringify: '',
  },

  effects: {
    *Create(_, { put }) {
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
    *Edit({ payload }, { put }) {
      yield put({ type: 'setEquip', payload });
      yield put({ type: 'setEquipStr', payload });
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
    *SetArea({ payload }, { call, put }) {
      yield put({ type: 'setEquip', payload });
      yield put({ type: 'setAreaVisible', payload: true });
    },
    *AddArea({ payload }, { call, put }) {
      yield put({ type: 'setBtnLoading', payload: true });
      const result = yield call(addArea, {
        areaName: payload.areaName,
        areaComment: payload.areaDesc,
        DevId: payload.id,
      });
      yield put({ type: 'setBtnLoading', payload: false });
      yield put({ type: 'setAreaVisible', payload: false });
      yield put({ type: 'equipManageList/GetList' });
      yield put({ type: 'reset' });
    },
    *InitEquip({ payload }, { call, put }) {
      yield put({ type: 'setBtnLoading', payload: true });
      const result = yield call(initEquip, { DevId: payload.id });
      yield put({ type: 'setBtnLoading', payload: false });
      message.success('初始化成功');
      if (result) {
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
    *Close(_, { put }) {
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
    setAreaVisible(state, { payload }) {
      return {
        ...state,
        areaVisible: payload,
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
