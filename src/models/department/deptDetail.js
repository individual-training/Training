import { getDeptDetail } from '@/services';

export default {
  namespace: 'deptDetail',

  state: {
    visible: false,
    playerVisible: false,
    playerUrl: '',
    loading: false,
    score: [],
    detailData: {
      date: '',
      record: {},
    },
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *ShowDetail({ payload }, { put }) {
      yield put({ type: 'setVisible', payload: true });
      yield put({ type: 'setDetailData', payload: payload });
      yield put({ type: 'GetScores', payload: payload });
    },
    *GetScores({ payload }, { select, call, put }) {
      yield put({ type: 'setLoading', payload: true });
      const {
        partId,
        detailData: { date, record },
      } = yield select(state => {
        return {
          partId: state.department.partId,
          detailData: state.deptDetail.detailData,
        };
      });
      const pid = payload.partId || partId;
      const result = yield call(getDeptDetail, {
        date: date,
        userid: record.id,
        part_id: pid,
      });
      if (result) {
        yield put({ type: 'setScore', payload: result.score });
      }
      yield put({ type: 'setLoading', payload: false });
    },
  },
  reducers: {
    setVisible(state, { payload }) {
      return {
        ...state,
        visible: payload,
      };
    },
    setPlayerVisible(state, { payload }) {
      return {
        ...state,
        playerVisible: payload.visible,
        playerUrl: payload.url,
      };
    },
    setScore(state, { payload }) {
      return {
        ...state,
        score: payload || [],
      };
    },
    setLoading(state, { payload }) {
      return {
        ...state,
        loading: payload,
      };
    },
    setDetailData(state, { payload }) {
      return {
        ...state,
        detailData: payload || {},
      };
    },
  },
};
