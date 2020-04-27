import { getUserTraining, postUserTraining, getLearn } from '@/services';
export default {
  namespace: 'account',

  state: {
    cardId: '',
    partId: '1',
    day: 7,
    loading: false,
    learn: false,
    learnData: {},
    courseId: 1,
    videoUrl: '',
    videoName: '',
    data: {
      history: [],
    },
    searchVisible: false,
    search: '',
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *InAccount({ payload }, { put }) {
      const { cardId } = payload;
      yield put({ type: 'setUserId', payload: cardId });
      yield put({ type: 'GetUserTraining' });
    },
    *GetUserTraining({ payload, success }, { select, call, put }) {
      yield put({ type: 'setLoading', payload: true });
      const { partId, day, cardId } = yield select(state => state.account);
      const result = yield call(getUserTraining, {
        part_id: partId,
        carid: cardId,
        day: day,
      });
      if (result) {
        yield put({ type: 'setData', payload: result });
        success && success(result);
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *PostUserTraining({ payload, success }, { select, call, put }) {
      yield put({ type: 'setLoading', payload: true });
      const { partId, search, cardId } = yield select(state => state.account);
      yield put({ type: 'setVisible', payload: false });
      const result = yield call(postUserTraining, {
        part_id: partId,
        carid: cardId,
        date: search,
      });
      if (result) {
        yield put({ type: 'setData', payload: result });
      }
      yield put({ type: 'setLoading', payload: false });
    },
    *GetLearn({ payload }, { call, put }) {
      const result = yield call(getLearn);
      if (result) {
        yield put({ type: 'setLeanData', payload: result });
        yield put({ type: 'setCourseId', payload: result.default.courseId });
        yield put({
          type: 'setVideoUrl',
          payload: {
            url: result.default.url,
            videoName: result.default.meidaName,
            partId: '1',
          },
        });
      }
    },
    *SetPart({ payload }, { put }) {
      yield put({ type: 'setPart', payload });
      yield put({ type: 'GetUserTraining' });
    },
    *SetDay({ payload }, { put }) {
      yield put({ type: 'setSearch', payload: '' });
      yield put({ type: 'setLearn', payload: false });
      yield put({ type: 'setDay', payload });
      yield put({ type: 'GetUserTraining' });
    },
    *SetSearch({ payload }, { call, put }) {
      yield put({ type: 'setSearch', payload: payload });
      yield put({ type: 'setLearn', payload: false });
      yield put({ type: 'setDay', payload: '' });
      yield put({ type: 'PostUserTraining' });
    },
    *SetLearn({ payload }, { put, call }) {
      yield put({ type: 'setLearn', payload: true });
      yield put({ type: 'setDay', payload: '' });
      yield put({ type: 'setSearch', payload: '' });
      yield put({ type: 'GetLearn' });
    },
  },
  reducers: {
    setLoading(state, { payload }) {
      return {
        ...state,
        loading: payload,
      };
    },
    setUserId(state, { payload }) {
      return {
        ...state,
        cardId: payload,
      };
    },
    setData(state, { payload }) {
      return {
        ...state,
        data: payload || {},
      };
    },
    setDay(state, { payload }) {
      return {
        ...state,
        day: payload,
      };
    },
    setPart(state, { payload }) {
      return {
        ...state,
        partId: payload,
      };
    },
    setVisible(state, { payload }) {
      return {
        ...state,
        searchVisible: payload,
      };
    },
    setSearch(state, { payload }) {
      return {
        ...state,
        search: payload,
      };
    },
    setLearn(state, { payload }) {
      return {
        ...state,
        learn: payload,
      };
    },
    setLeanData(state, { payload }) {
      return {
        ...state,
        learnData: payload,
      };
    },
    setCourseId(state, { payload }) {
      return {
        ...state,
        courseId: payload,
      };
    },
    setVideoUrl(state, { payload }) {
      return {
        ...state,
        videoUrl: payload.url,
        partId: payload.partId,
        videoName: payload.videoName,
      };
    },
  },
};
