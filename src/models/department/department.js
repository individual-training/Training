import { getDeptList } from '@/services';

export default {
  namespace: 'department',

  state: {
    name: '',
    loading: false,
    departmentId: '',
    partId: '1',
    data: {},
    pagination: {
      pageSize: 8,
      current: 1,
    },
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *GetDeptList({ payload }, { select, call, put }) {
      yield put({ type: 'setLoading', payload: true });
      const { departmentId, partId, pagination } = yield select(
        state => state.department,
      );
      const result = yield call(getDeptList, {
        departmentId: departmentId,
        part_id: partId,
        pageSize: pagination.pageSize,
        pageNum: pagination.current,
      });
      yield put({ type: 'setData', payload: result });
      yield put({ type: 'setLoading', payload: false });
    },
    *SetPart({ payload }, { put }) {
      yield put({ type: 'setPartId', payload: payload.partId });
      yield put({ type: 'GetDeptList', payload });
    },
    *SetDeptId({ payload }, { put }) {
      yield put({ type: 'setDeptId', payload: payload });
      yield put({ type: 'GetDeptList', payload });
    },
    *SetPagination({ payload }, { put }) {
      yield put({ type: 'setPagination', payload });
      yield put({ type: 'GetDeptList' });
    },
  },

  reducers: {
    setLoading(state, { payload }) {
      return {
        ...state,
        loading: payload,
      };
    },
    setDeptId(state, { payload }) {
      return {
        ...state,
        departmentId: payload,
        pagination: { ...state.pagination, current: 1 },
      };
    },
    setPartId(state, { payload }) {
      return {
        ...state,
        partId: payload,
        pagination: { ...state.pagination, current: 1 },
      };
    },
    setData(state, { payload }) {
      return {
        ...state,
        data: payload || {},
        pagination: { ...state.pagination, total: payload.total },
      };
    },
    setPagination(state, { payload }) {
      return {
        ...state,
        pagination: { ...payload },
      };
    },
  },
};
