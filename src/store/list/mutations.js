import Vue from 'vue';

const SAVE_ACTIVITY = (state, payload) => {
  const data = [
    ...state.list,
  ];
  data.push(payload);
  const alteredItems = data.map((item, index) => {
    const itm = { ...item };
    itm.id = index + 1;
    return itm;
  });
  Vue.set(state, 'list', alteredItems);
};

const CLEAR_LIST_ITEM = (state, payload) => {
  const data = state.list.filter((item) => item.id !== payload);
  Vue.set(state, 'list', data);
};

const CLEAR_LIST = (state) => {
  Vue.set(state, 'list', []);
};

export default {
  SAVE_ACTIVITY,
  CLEAR_LIST_ITEM,
  CLEAR_LIST,
};
